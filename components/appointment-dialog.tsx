"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  createAppointmentSchema,
  type AppointmentFormValues,
} from "@/lib/validations";
import type { Locale } from "@/lib/i18n";

// Generate time slots 08:00 - 17:30 in 30-min intervals
const TIME_SLOTS: string[] = [];
for (let h = 8; h < 18; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 17 || (h === 17 && true)) {
    TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
  }
}
// Remove 17:30 is fine, but let's keep it up to 17:30
// Actually we want 08:00 to 17:30 inclusive
const timeSlots = TIME_SLOTS.filter((t) => t <= "17:30");

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: {
    form: {
      title: string;
      description: string;
      reason: string;
      reasonPlaceholder: string;
      reasons: Record<string, string>;
      lastName: string;
      lastNamePlaceholder: string;
      firstName: string;
      firstNamePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      date: string;
      datePlaceholder: string;
      time: string;
      timePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
      validation: Record<string, string>;
    };
  };
  lang: Locale;
}

export function AppointmentDialog({
  open,
  onOpenChange,
  dict,
  lang,
}: AppointmentDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const schema = createAppointmentSchema(dict.form.validation as {
    reasonRequired: string;
    lastNameMin: string;
    firstNameMin: string;
    phoneRequired: string;
    emailInvalid: string;
    dateRequired: string;
    dateFuture: string;
    timeRequired: string;
    messageMax: string;
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      reason: "",
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      message: "",
    },
  });

  const selectedDate = watch("date");
  const selectedReason = watch("reason");
  const selectedTime = watch("time");

  async function onSubmit(data: AppointmentFormValues) {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale: lang }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitted(true);
    } catch {
      toast.error(dict.form.error);
    }
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) {
      setSubmitted(false);
      reset();
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">{dict.form.title}</DialogTitle>
          <DialogDescription>{dict.form.description}</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="size-12 text-primary" />
            <p className="leading-relaxed text-foreground">
              {dict.form.success}
            </p>
            <Button onClick={() => handleClose(false)} variant="outline">
              OK
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Reason */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reason">{dict.form.reason} *</Label>
              <Select
                value={selectedReason}
                onValueChange={(val) => setValue("reason", val, { shouldValidate: true })}
              >
                <SelectTrigger id="reason" className="w-full">
                  <SelectValue placeholder={dict.form.reasonPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(dict.form.reasons).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reason && (
                <p className="text-sm text-destructive">{errors.reason.message}</p>
              )}
            </div>

            {/* Name row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">{dict.form.lastName} *</Label>
                <Input
                  id="lastName"
                  placeholder={dict.form.lastNamePlaceholder}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">{dict.form.firstName} *</Label>
                <Input
                  id="firstName"
                  placeholder={dict.form.firstNamePlaceholder}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            {/* Phone & Email row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">{dict.form.phone} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={dict.form.phonePlaceholder}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">{dict.form.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={dict.form.emailPlaceholder}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Date & Time row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>{dict.form.date} *</Label>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="size-4" />
                      {selectedDate
                        ? format(new Date(selectedDate), "PPP")
                        : dict.form.datePlaceholder}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate ? new Date(selectedDate) : undefined}
                      onSelect={(day) => {
                        if (day) {
                          setValue("date", day.toISOString(), { shouldValidate: true });
                          setDateOpen(false);
                        }
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="time">{dict.form.time} *</Label>
                <Select
                  value={selectedTime}
                  onValueChange={(val) => setValue("time", val, { shouldValidate: true })}
                >
                  <SelectTrigger id="time" className="w-full">
                    <SelectValue placeholder={dict.form.timePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-sm text-destructive">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">{dict.form.message}</Label>
              <Textarea
                id="message"
                placeholder={dict.form.messagePlaceholder}
                rows={3}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {dict.form.submitting}
                </>
              ) : (
                dict.form.submit
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
