import { z } from "zod";

export function createAppointmentSchema(v: {
  reasonRequired: string;
  lastNameMin: string;
  firstNameMin: string;
  phoneRequired: string;
  emailInvalid: string;
  dateRequired: string;
  dateFuture: string;
  timeRequired: string;
  messageMax: string;
}) {
  return z.object({
    reason: z.string().min(1, v.reasonRequired),
    lastName: z.string().min(2, v.lastNameMin),
    firstName: z.string().min(2, v.firstNameMin),
    phone: z.string().min(1, v.phoneRequired),
    email: z.string().email(v.emailInvalid),
    date: z.string().min(1, v.dateRequired),
    time: z.string().min(1, v.timeRequired),
    message: z.string().max(500, v.messageMax).optional().default(""),
  });
}

export type AppointmentFormValues = z.infer<
  ReturnType<typeof createAppointmentSchema>
>;
