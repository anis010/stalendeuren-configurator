import Link from "next/link";
import { Mail, Phone, Star, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const contactInfo = [
  { icon: Mail, text: "info@proinn.nl", href: "mailto:info@proinn.nl" },
  { icon: Phone, text: "085 - 1234 567", href: "tel:0851234567" },
];

const companyInfo = [
  { label: "KVK", value: "12345678" },
  { label: "BTW", value: "NL123456789B01" },
  { label: "IBAN", value: "NL00 INGB 0000 0000 00" },
];

const locations = [
  "Nunspeet",
  "Veghel",
  "Amsterdam",
  "Rotterdam",
  "Utrecht",
];

const proinnLinks = [
  { label: "Projecten", href: "/projecten" },
  { label: "Configurator", href: "/offerte" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Vacatures", href: "/vacatures" },
  { label: "Showrooms", href: "/showrooms" },
];

const serviceLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Kennisbank", href: "/kennisbank" },
  { label: "Veelgestelde vragen", href: "/faq" },
  { label: "Garantie", href: "/garantie" },
  { label: "Onderhoud", href: "/onderhoud" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[#1A2E2E]">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Col 1 - Logo & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
              PROINN
            </Link>
            <div className="mt-6 space-y-3">
              {contactInfo.map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.text}
                </a>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              {companyInfo.map((item) => (
                <p key={item.label} className="text-xs text-gray-500">
                  <span className="text-gray-400">{item.label}:</span> {item.value}
                </p>
              ))}
            </div>
          </div>

          {/* Col 2 - Locaties */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Locaties</h4>
            <ul className="space-y-2.5">
              {locations.map((city) => (
                <li key={city}>
                  <Link
                    href={`/showrooms/${city.toLowerCase()}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Proinn */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Proinn</h4>
            <ul className="space-y-2.5">
              {proinnLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Service */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Service</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 - Trustpilot */}
          <div>
            <div className="rounded-2xl bg-[#243636] p-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Klantwaardering
              </p>
              <div className="mb-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-white">
                4.8<span className="text-sm font-normal text-gray-400">/5</span>
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <Star className="size-4 fill-green-500 text-green-500" />
                <span className="text-sm text-gray-400">Trustpilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-white/20 hover:text-white"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>&copy; {new Date().getFullYear()} Proinn</span>
            <Link href="/privacy" className="transition-colors hover:text-gray-300">
              Privacybeleid
            </Link>
            <Link href="/voorwaarden" className="transition-colors hover:text-gray-300">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
