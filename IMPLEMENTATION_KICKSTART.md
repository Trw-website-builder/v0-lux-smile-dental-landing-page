# LuxSmile Dental - Implementation Kickstart Plan

## 1. Project Overview

**Project:** LuxSmile Dental - Multilingual landing page for a modern dental clinic in Luxembourg.
**Primary Goal:** Convert visitors into patients via phone calls or appointment request form submissions.
**Languages:** French (default), English, German. Luxembourgish to be added later.

---

## 2. Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (Dialog, Accordion, Sheet, Select, Calendar, Button, Input, Textarea, Label, Form) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod validation |
| Email | Nodemailer (via Next.js API Route) |
| i18n | Next.js middleware-based routing with `/fr`, `/en`, `/de` path prefixes |
| Font | Inter (Google Fonts via `next/font/google`) |

---

## 3. Design Tokens & Color Palette

| Token | Role | Value |
|-------|------|-------|
| `--primary` | Calming sage green (buttons, accents) | Sage green ~oklch(0.55 0.1 160) |
| `--primary-foreground` | Text on primary buttons | White |
| `--foreground` | Body text, headings | Dark navy ~oklch(0.22 0.03 260) |
| `--background` | Page background | White |
| `--muted` | Subtle backgrounds (sections, cards) | Light gray/off-white |
| `--accent` | Secondary highlights (CTA banner bg) | Soft blue ~oklch(0.55 0.08 240) |
| `--accent-foreground` | Text on accent backgrounds | White |

Font: Inter for all text (headings + body), applied via `font-sans`.

---

## 4. Internationalization (i18n) Architecture

### Routing Strategy
- Path-prefix routing: `/fr/...`, `/en/...`, `/de/...`
- Default locale: `fr` (French)
- Root `/` redirects to `/fr`

### File Structure
```
app/
  [lang]/
    layout.tsx         # Per-locale layout (html lang, metadata)
    page.tsx           # Landing page (composes all sections)
lib/
  dictionaries/
    fr.json            # French translations
    en.json            # English translations
    de.json            # German translations
  i18n.ts              # getDictionary() helper, locale types
middleware.ts          # Locale detection & redirect
```

### Dictionary Structure (per locale)
Each JSON file contains keys for every text string on the page, organized by section:
- `header` (nav items, CTA button label)
- `hero` (headline, subheadline, CTA labels)
- `socialProof` (trust text)
- `features` (titles, descriptions)
- `services` (card titles, descriptions)
- `testimonials` (quotes, names)
- `faq` (questions, answers)
- `ctaBanner` (headline, button label)
- `footer` (columns, copyright)
- `form` (field labels, placeholders, validation messages, success message)
- `languageSwitcher` (language names)

---

## 5. Page Sections & Component Map

### 5.1 Sticky Header
- **Component:** `components/header.tsx`
- **Left:** Lucide `Smile` icon + "LuxSmile Dental" text
- **Right (desktop):** Phone icon + "+352 12 34 56" | "Request Appointment" button | Language switcher (Select dropdown)
- **Right (mobile):** Hamburger menu icon (Sheet component for slide-out nav)
- **Behavior:** Sticky top, white background, subtle bottom border on scroll

### 5.2 Hero Section
- **Component:** `components/hero.tsx`
- **Background:** Generated image of a modern, clean dental office (via GenerateImage tool, saved to `public/images/hero.jpg`)
- **Content:** Headline, subheadline, two CTA buttons
- **CTA 1 (primary solid):** "Call Now: +352 12 34 56" with Phone icon -- `tel:+35212345` link on all devices
- **CTA 2 (outlined):** "Request a Callback" -- opens appointment Dialog

### 5.3 Social Proof Banner
- **Component:** `components/social-proof.tsx`
- **Content:** "Trusted by over 2,000 smiling patients in Luxembourg."
- **Visual:** 5 gold Star icons (Lucide `Star` with fill)

### 5.4 Trust & Features Section
- **Component:** `components/features.tsx`
- **Layout:** 3-column grid (1-col mobile, 2-col tablet, 3-col desktop)
- **Items:**
  1. HeartPulse icon -- "Pain-Free & Gentle"
  2. Stethoscope icon -- "Comprehensive Care"
  3. PhoneCall icon -- "Easy Scheduling"

### 5.5 Services Grid
- **Component:** `components/services.tsx`
- **Layout:** 4-card grid (1-col mobile, 2-col tablet, 4-col desktop)
- **Cards:** General Dentistry, Cosmetic Dentistry, Implants & Crowns, Emergency Care
- **Each card:** Lucide icon, title, short description

### 5.6 Testimonials
- **Component:** `components/testimonials.tsx`
- **Layout:** 2-column (stacked on mobile)
- **Quotes:** Marie T. and Thomas L. testimonials with quote styling

### 5.7 FAQ Section
- **Component:** `components/faq.tsx`
- **Uses:** shadcn/ui `Accordion` component
- **Items:** 3 FAQ items (booking, CNS coverage, emergencies)

### 5.8 Pre-Footer CTA Banner
- **Component:** `components/cta-banner.tsx`
- **Design:** Accent-colored background with contrasting text
- **CTA:** Large "Call Now: +352 12 34 56" button

### 5.9 Footer
- **Component:** `components/footer.tsx`
- **3-column layout** (stacked on mobile):
  - Column 1: Logo + tagline
  - Column 2: Contact info (phone, email: hello@luxsmile.lu, address placeholder)
  - Column 3: Business hours (Mon-Fri: 8:00 AM - 6:00 PM)
- **Bottom row:** Copyright 2026

---

## 6. Appointment Request Form (Dialog)

### Component: `components/appointment-dialog.tsx`

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| Reason | Select dropdown (General Checkup, Cleaning, Cosmetic, Emergency, Other) | Yes | Must select one |
| Last Name (Name) | Text input | Yes | Min 2 chars |
| First Name | Text input | Yes | Min 2 chars |
| Phone Number | Text input (tel) | Yes | Non-empty, basic format |
| Email | Text input (email) | Yes | Valid email format (Zod `.email()`) |
| Preferred Date | Calendar date picker (shadcn Calendar/Popover) | Yes | Must be a future date |
| Preferred Time | Select dropdown (time slots: 08:00, 08:30, ..., 17:30) | Yes | Must select one |
| Message | Textarea | No | Max 500 chars |

### Validation
- Zod schema with React Hook Form resolver
- Real-time field-level validation
- All error messages translated per locale

### On Submit
1. Client-side Zod validation
2. POST to `/api/send-email` API route
3. Loading state on submit button
4. **Success:** Show success message within the dialog: "Your request has been submitted. We will contact you by phone or email within 3 business days."
5. **Error:** Show error toast notification

---

## 7. Backend: Email API Route

### Endpoint: `app/api/send-email/route.ts`

### Method: POST

### Request Body
```json
{
  "reason": "string",
  "lastName": "string",
  "firstName": "string",
  "phone": "string",
  "email": "string",
  "preferredDate": "string",
  "preferredTime": "string",
  "message": "string (optional)",
  "locale": "fr | en | de"
}
```

### Implementation
- Uses **Nodemailer** with SMTP transport
- Sends formatted HTML email to: `juozas.m49@gmail.com` (configurable via `CONTACT_EMAIL` env var)
- Email subject: "New Appointment Request - LuxSmile Dental"
- Email body: Formatted HTML table with all form fields
- Reply-To set to the patient's submitted email
- Server-side Zod validation (same schema as client)

### Environment Variables Required
| Variable | Description | Value |
|----------|-------------|-------|
| `SMTP_HOST` | SMTP server host | User to configure |
| `SMTP_PORT` | SMTP server port | User to configure |
| `SMTP_USER` | SMTP username | User to configure |
| `SMTP_PASS` | SMTP password | User to configure |
| `CONTACT_EMAIL` | Recipient email for form submissions | `juozas.m49@gmail.com` |

---

## 8. Responsive Design Strategy

### Breakpoints
| Breakpoint | Screen | Behavior |
|-----------|--------|----------|
| Default | Mobile (< 640px) | Single column, hamburger menu, stacked CTAs |
| `sm:` | Small (640px+) | Minor spacing adjustments |
| `md:` | Tablet (768px+) | 2-column grids, side-by-side CTAs |
| `lg:` | Desktop (1024px+) | Full 3-4 column grids, sticky header with all nav items visible |

### Mobile Navigation
- **Component:** `components/mobile-nav.tsx`
- Uses shadcn/ui `Sheet` component (slide-in from right)
- Trigger: Hamburger `Menu` icon (visible on `lg:hidden`)
- Contents: Phone link, Request Appointment button, Language switcher, close button
- Desktop nav hidden on mobile (`hidden lg:flex`)

---

## 9. Image Assets

All images generated via AI and saved to `public/images/`:

| Image | Path | Description |
|-------|------|-------------|
| Hero | `public/images/hero.jpg` | Modern, bright dental clinic interior with clean lines, natural light, contemporary dental chair |

These are placeholder images that will be replaced later by the client.

---

## 10. File Structure (Final)

```
app/
  api/
    send-email/
      route.ts                # Email sending API
  [lang]/
    layout.tsx                # Locale-aware layout (html lang, fonts, metadata)
    page.tsx                  # Main landing page (composes sections)
  globals.css                 # Design tokens, Tailwind config
  layout.tsx                  # Root layout (fonts only, no html/body -- delegated to [lang])

components/
  header.tsx                  # Sticky header with nav
  mobile-nav.tsx              # Mobile hamburger Sheet menu
  hero.tsx                    # Hero section
  social-proof.tsx            # Trust banner
  features.tsx                # 3-column features grid
  services.tsx                # Services cards grid
  testimonials.tsx            # Testimonial quotes
  faq.tsx                     # Accordion FAQ
  cta-banner.tsx              # Pre-footer CTA
  footer.tsx                  # Site footer
  appointment-dialog.tsx      # Form dialog (reusable, opened from multiple places)
  language-switcher.tsx       # Locale selector dropdown
  ui/                         # shadcn/ui primitives (existing)

lib/
  dictionaries/
    fr.json                   # French strings
    en.json                   # English strings
    de.json                   # German strings
  i18n.ts                     # getDictionary(), Locale type, locales array
  validations.ts              # Shared Zod schemas for form

middleware.ts                 # Locale detection, redirect logic

public/
  images/
    hero.jpg                  # Generated hero image
```

---

## 11. Implementation Order (Task Sequence)

| Step | Task | Description |
|------|------|-------------|
| 1 | **Foundation & i18n Setup** | Set up middleware, i18n utilities, dictionary files (fr/en/de), `[lang]` route structure, design tokens in globals.css, Inter font |
| 2 | **Generate Image Assets** | Generate the hero image using AI |
| 3 | **Build Landing Page Sections** | Build all 9 sections as individual components, compose in `[lang]/page.tsx`, fully responsive with mobile nav |
| 4 | **Appointment Form & Email API** | Build the Dialog form with Zod validation, create the `/api/send-email` route with Nodemailer, wire up success/error states |
| 5 | **SEO & Metadata** | Per-locale metadata (title, description, Open Graph), semantic HTML, accessibility audit |

---

## 12. SEO & Metadata (Per Locale)

```
FR: "LuxSmile Dental - Dentisterie Moderne au Luxembourg"
EN: "LuxSmile Dental - Modern Dentistry in Luxembourg"
DE: "LuxSmile Dental - Moderne Zahnmedizin in Luxemburg"
```

- `<html lang="fr|en|de">` set dynamically per route
- Open Graph tags with locale-specific title and description
- `hreflang` alternate links for all three locales
- Semantic HTML throughout (main, header, nav, section, footer)

---

## 13. Accessibility Requirements

- WCAG AA compliance target
- All interactive elements keyboard-navigable
- Proper ARIA labels on icons, buttons, form fields
- `sr-only` text for icon-only buttons
- Focus management in Dialog (auto-focus first field, trap focus)
- Color contrast ratios meeting 4.5:1 for text, 3:1 for large text
- Alt text on all images
- Skip-to-content link

---

## 14. Environment Variables Summary

| Variable | Required For | Notes |
|----------|-------------|-------|
| `SMTP_HOST` | Email sending | SMTP provider host |
| `SMTP_PORT` | Email sending | Usually 587 or 465 |
| `SMTP_USER` | Email sending | SMTP auth username |
| `SMTP_PASS` | Email sending | SMTP auth password |
| `CONTACT_EMAIL` | Email recipient | Default: juozas.m49@gmail.com |

---

## 15. Future Considerations (Out of Scope for Now)

- Luxembourgish language support (4th locale)
- Calendar/scheduling system integration
- Patient portal
- Online booking with real-time availability
- Analytics/conversion tracking
- Blog/content section
- Replacing generated placeholder images with professional photography
