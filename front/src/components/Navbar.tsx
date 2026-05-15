import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Lang, Translations } from "../translations";
import type { Currency } from "../App";

interface NavbarProps {
  t: Translations;
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onContact: () => void;
}

const langs: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "zh", label: "中" },
];

const currencies: { code: Currency; label: string }[] = [
  { code: "usd", label: "$" },
  { code: "eur", label: "€" },
  { code: "cop", label: "COP" },
  { code: "cny", label: "¥" },
];

const navLinks = [
  { key: "services" as const, href: "#services" },
  { key: "templates" as const, href: "#templates" },
  { key: "onboarding" as const, href: "#onboarding" },
  { key: "calculator" as const, href: "#calculator" },
  { key: "whyUs" as const, href: "#why-us" },
];

export default function Navbar({ t, lang, setLang, currency, setCurrency, onContact }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FBBF24, #8B5CF6)" }}>
              <Zap className="w-4 h-4" style={{ color: "#09080f" }} />
            </div>
            <span className="font-black text-lg text-white tracking-tight">Eccensia</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ key, href }) => (
              <a key={key} href={href}
                className="text-sm font-medium transition-colors"
                style={{ color: "#A78BFA" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FBBF24")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A78BFA")}
              >
                {t.nav[key]}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Currency switcher */}
            <div className="flex items-center gap-0.5 rounded-lg p-1" style={{ background: "rgba(19,17,31,0.8)" }}>
              {currencies.map((c) => (
                <button key={c.code} onClick={() => setCurrency(c.code)}
                  className="px-2 py-1 text-xs font-bold rounded-md transition-all"
                  style={{
                    background: currency === c.code ? "#FBBF24" : "transparent",
                    color: currency === c.code ? "#09080f" : "#A78BFA",
                  }}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Lang switcher */}
            <div className="flex items-center gap-0.5 rounded-lg p-1" style={{ background: "rgba(19,17,31,0.8)" }}>
              {langs.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  className="px-2 py-1 text-xs font-bold rounded-md transition-all"
                  style={{
                    background: lang === l.code ? "#A78BFA" : "transparent",
                    color: lang === l.code ? "#09080f" : "#A78BFA",
                  }}>
                  {l.label}
                </button>
              ))}
            </div>

            <button onClick={onContact} className="btn-primary text-sm py-2 px-4">
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" style={{ color: "#A78BFA" }}
            onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{ background: "#09080f", borderTop: "1px solid rgba(167,139,250,0.15)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(({ key, href }) => (
                <a key={key} href={href} onClick={() => setOpen(false)}
                  className="text-sm font-medium py-1" style={{ color: "#A78BFA" }}>
                  {t.nav[key]}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2 flex-wrap" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
                {currencies.map((c) => (
                  <button key={c.code} onClick={() => setCurrency(c.code)}
                    className="px-2.5 py-1 text-xs font-bold rounded-md transition-all"
                    style={{
                      background: currency === c.code ? "#FBBF24" : "transparent",
                      color: currency === c.code ? "#09080f" : "#A78BFA",
                      border: currency === c.code ? "none" : "1px solid rgba(167,139,250,0.3)",
                    }}>
                    {c.label}
                  </button>
                ))}
                {langs.map((l) => (
                  <button key={l.code} onClick={() => setLang(l.code)}
                    className="px-2.5 py-1 text-xs font-bold rounded-md transition-all"
                    style={{
                      background: lang === l.code ? "#A78BFA" : "transparent",
                      color: lang === l.code ? "#09080f" : "#A78BFA",
                      border: lang === l.code ? "none" : "1px solid rgba(167,139,250,0.3)",
                    }}>
                    {l.label}
                  </button>
                ))}
                <button onClick={() => { onContact(); setOpen(false); }}
                  className="btn-primary text-sm py-1.5 px-4 ml-auto">
                  {t.nav.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
