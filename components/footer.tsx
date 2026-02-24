import { Smile, Phone, Mail, MapPin, Clock } from "lucide-react";

interface FooterProps {
  dict: {
    footer: {
      tagline: string;
      contact: string;
      callLabel: string;
      emailLabel: string;
      addressLabel: string;
      address: string;
      hoursTitle: string;
      hours: string;
      copyright: string;
    };
    header: { phone: string };
  };
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Logo + tagline */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Smile className="size-6 text-primary" />
              <span className="text-lg font-bold text-background">
                LuxSmile Dental
              </span>
            </div>
            <p className="text-sm leading-relaxed text-background/70">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              {dict.footer.contact}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a
                  href="tel:+35212345"
                  className="transition-colors hover:text-primary"
                >
                  {dict.footer.callLabel} {dict.header.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a
                  href="mailto:hello@luxsmile.lu"
                  className="transition-colors hover:text-primary"
                >
                  {dict.footer.emailLabel} hello@luxsmile.lu
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span>
                  {dict.footer.addressLabel} {dict.footer.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              {dict.footer.hoursTitle}
            </h3>
            <div className="flex items-start gap-2 text-sm text-background/70">
              <Clock className="size-4 shrink-0 mt-0.5" />
              <span>{dict.footer.hours}</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 border-t border-background/10 pt-8 text-center text-sm text-background/50">
          &copy; {dict.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
