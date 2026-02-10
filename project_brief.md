# Project Specification: Proinn Website Rebuild

## 1. Project Overview
We are rebuilding the existing Lightspeed webshop (www.proinn.nl) into a modern, custom lead-generation website.
**Target Domain:** `proinn.youztech.nl`

## 2. Core Objective
Transform the site from a "shop" to a "showroom". Instead of a shopping cart, users will use a **Product Configurator** to request a formal quote.

## 3. Tech Stack (Strict)
- **Framework:** Next.js 14+ (App Router, TypeScript).
- **Styling:** Tailwind CSS.
- **Components:** Shadcn/UI (Base color: Slate/Neutral).
- **Icons:** Lucide-React.
- **Forms:** React Hook Form + Zod (Validation).
- **Email/Backend:** Resend (via Server Actions).
- **Deployment:** Vercel.

## 4. Design Guidelines
- **Style:** Industrial, clean, heavy. "Form follows function."
- **Colors:**
  - Primary: Dark Grey / Black (Industrial feel).
  - Accent: Orange & Blue (Derived from Proinn logo).
  - Background: White / Off-white.
- **Typography:** Sans-serif, bold headers (Inter or Roboto).

## 5. Architecture (PAL Workflow)
- **Performer:** Writes the code, runs terminal commands.
- **Architect:** Plans the folder structure and component hierarchy.
- **Lead:** Ensures alignment with business goals (Quote generation).

## 6. Functional Requirements
### A. Homepage
- Hero section with industrial imagery.
- USP Grid (Fast delivery, Custom work, Quality).
- Short "About Us" teaser.

### B. The Configurator (/offerte)
A multi-step client-side wizard:
1. **Select Product:** Grid of clickable cards (e.g., "Industrial Table", "Custom Frame").
2. **Dimensions:** Input fields for Height, Width, Depth (mm).
3. **Options:** Checkboxes for extras (Coating, Wheels, Material type).
4. **Contact:** Form for Name, Company, Email, Phone.
5. **Summary:** Review page with "Request Quote" button.

### C. Backend Logic
- On submit, validate data with Zod.
- Send email via Resend to `info@proinn.nl`.
- Send confirmation email to the user.
- Store nothing in a database (stateless).

## 7. Implementation Phases
1. **Setup:** Initialize Next.js, Install Tailwind/Shadcn.
2. **Design System:** Set up fonts, colors, and global CSS.
3. **Layout:** Create Navbar (Logo + CTA) and Footer.
4. **Pages:** Build Home and Text pages.
5. **Configurator:** Build the logic and UI for the wizard.
6. **Integration:** Connect Resend API.
