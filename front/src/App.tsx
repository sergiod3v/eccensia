import { useState } from "react";
import { motion } from "motion/react";
import {
  Zap, ArrowRight, CheckCircle, MapPin, Server, Cpu, BarChart3,
  Bot, Shield, TrendingUp, Code2, Globe, Terminal,
  ShoppingCart, Pill, Heart, Wallet, UtensilsCrossed, Package,
} from "lucide-react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import ContactModal from "./components/ContactModal";
import EfficiencyCalculator from "./components/EfficiencyCalculator";
import TemplatePrototypeModal from "./components/prototypes/TemplatePrototypeModal";
import type { PrototypeId } from "./components/prototypes/TemplatePrototypeModal";
import { translations } from "./translations";
import type { Lang } from "./translations";

export type Currency = "usd" | "eur" | "cop" | "cny";

const EXCHANGE_RATES: Record<Currency, number> = { usd: 1, eur: 0.92, cop: 4100, cny: 7.26 };
const CURRENCY_SYMBOLS: Record<Currency, string> = { usd: "$", eur: "€", cop: "COP ", cny: "¥" };
const SERVICE_PRICE_BASE: (number | null)[] = [299, null, null];

function formatPrice(usdBase: number, currency: Currency): string {
  const amount = Math.round(usdBase * EXCHANGE_RATES[currency]);
  const sym = CURRENCY_SYMBOLS[currency];
  return currency === "cop"
    ? `${sym}${amount.toLocaleString("es-CO")}`
    : `${sym}${amount.toLocaleString()}`;
}

const stackItems = [
  { name: "Gemini Pro 1.5", icon: Bot, color: "#FBBF24" },
  { name: "Python / FastAPI", icon: Code2, color: "#A78BFA" },
  { name: "Docker / K8s", icon: Server, color: "#FBBF24" },
  { name: "N8N / Make", icon: Zap, color: "#A78BFA" },
];

const serviceIcons = [Zap, Shield, Cpu];
const templateIcons = [BarChart3, ShoppingCart, Pill, TrendingUp, Heart, Bot, Wallet, UtensilsCrossed, Package, Shield];
const templateProtoIds: PrototypeId[] = ["finance", "supermarket", "farmacia", "sales", "petshop", "copilot", "personalfinance", "restaurant", "smoke", "infra"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [currency, setCurrency] = useState<Currency>("usd");
  const [contactOpen, setContactOpen] = useState(false);
  const [protoOpen, setProtoOpen] = useState<PrototypeId | null>(null);
  const t = translations[lang];

  return (
    <div className="min-h-screen" style={{ background: "#09080f" }}>
      <CustomCursor />
      <Navbar t={t} lang={lang} setLang={setLang} currency={currency} setCurrency={setCurrency} onContact={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} t={t} />
      <TemplatePrototypeModal open={protoOpen} onClose={() => setProtoOpen(null)} />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, #FBBF24 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8"
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.25)",
              color: "#FBBF24",
            }}
          >
            <MapPin className="w-3 h-3" />
            {t.hero.badge}
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FBBF24" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none mb-6"
          >
            <span className="block">{t.hero.headline1}</span>
            <span className="block text-gradient">{t.hero.headline2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#A78BFA" }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#templates" className="btn-primary text-base">
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={() => setContactOpen(true)} className="btn-secondary text-base">
              {t.hero.cta2}
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#FBBF24] to-transparent" />
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────────── */}
      <section id="services" className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} className="mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{t.services.title}</h2>
              <p className="text-lg" style={{ color: "#A78BFA" }}>{t.services.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.services.cards.map((card, i) => {
                const Icon = serviceIcons[i];
                const priceBase = SERVICE_PRICE_BASE[i];
                const priceLabel = priceBase !== null
                  ? `${t.services.fromLabel} ${formatPrice(priceBase, currency)}`
                  : card.price;
                return (
                  <motion.div key={i} variants={fadeUp} className="card-glow rounded-2xl p-6"
                    style={{ background: "#13111f", border: "1px solid rgba(167,139,250,0.12)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(251,191,36,0.1)" }}>
                        <Icon className="w-5 h-5" style={{ color: "#FBBF24" }} />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: "rgba(251,191,36,0.12)", color: "#FBBF24" }}>
                        {priceLabel}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#A78BFA" }}>{card.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md font-mono"
                          style={{ background: "rgba(9,8,15,0.6)", color: "#5B5490", border: "1px solid rgba(91,84,144,0.3)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STACK STRIP ─────────────────────────────────────────────── */}
      <section className="py-12" style={{ background: "#13111f", borderTop: "1px solid rgba(167,139,250,0.08)", borderBottom: "1px solid rgba(167,139,250,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5B5490" }}>{t.stack.title}</p>
            <p className="text-sm mt-1" style={{ color: "#A78BFA" }}>{t.stack.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stackItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(9,8,15,0.5)", border: "1px solid rgba(167,139,250,0.08)" }}>
                  <Icon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                  <span className="text-sm font-semibold font-mono text-white">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEMPLATES ───────────────────────────────────────────────── */}
      <section id="templates" className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} className="mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{t.templates.title}</h2>
              <p className="text-lg" style={{ color: "#A78BFA" }}>{t.templates.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.templates.cards.map((card, i) => {
                const Icon = templateIcons[i];
                return (
                  <motion.div key={i} variants={fadeUp} className="card-glow rounded-2xl p-6 cursor-pointer"
                    style={{ background: "#13111f", border: "1px solid rgba(167,139,250,0.12)" }}
                    onClick={() => setProtoOpen(templateProtoIds[i])}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}>
                        <Icon className="w-6 h-6" style={{ color: "#FBBF24" }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: "#A78BFA" }}>{card.description}</p>
                      </div>
                    </div>

                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                      style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: "#FBBF24" }} />
                      <span className="text-xs font-bold" style={{ color: "#FBBF24" }}>{t.templates.impact}: {card.impact}</span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#5B5490" }}>{t.templates.deliverables}</p>
                      <ul className="flex flex-col gap-1.5">
                        {card.deliverables.map((d, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "#FBBF24" }} />
                            <span className="text-sm" style={{ color: "#c4b8f0" }}>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(167,139,250,0.08)" }}>
                      <span className="text-xs" style={{ color: "#5B5490" }}>{t.templates.previewHint}</span>
                      <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "#FBBF24" }}>
                        <ArrowRight className="w-3.5 h-3.5" />
                        {t.templates.previewCta}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ONBOARDING ──────────────────────────────────────────────── */}
      <section id="onboarding" className="section-pad" style={{ background: "#13111f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{t.onboarding.title}</h2>
              <p className="text-lg" style={{ color: "#A78BFA" }}>{t.onboarding.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.onboarding.steps.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="relative">
                  <div className="absolute -top-4 -left-2 text-8xl font-black select-none pointer-events-none"
                    style={{ color: "rgba(251,191,36,0.06)", fontFamily: "'JetBrains Mono', monospace" }}>
                    {step.number}
                  </div>
                  <div className="relative pt-8">
                    <div className="text-xs font-bold font-mono mb-3" style={{ color: "#FBBF24" }}>{step.number}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#A78BFA" }}>{step.description}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-px"
                      style={{ background: "linear-gradient(to right, rgba(251,191,36,0.3), transparent)", transform: "translateX(-50%)" }} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CALCULATOR ──────────────────────────────────────────────── */}
      <EfficiencyCalculator t={t} />

      {/* ─── WHY US ──────────────────────────────────────────────────── */}
      <section id="why-us" className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div variants={fadeUp}>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{t.whyUs.title}</h2>
                <p className="text-lg mb-10" style={{ color: "#A78BFA" }}>{t.whyUs.subtitle}</p>
              </motion.div>
              <div className="flex flex-col gap-6">
                {t.whyUs.features.map((f, i) => {
                  const icons = [Globe, BarChart3, Code2];
                  const Icon = icons[i];
                  return (
                    <motion.div key={i} variants={fadeUp} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}>
                        <Icon className="w-5 h-5" style={{ color: "#A78BFA" }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{f.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: "#A78BFA" }}>{f.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden"
              style={{
                background: "#09080f",
                border: "1px solid rgba(167,139,250,0.15)",
                boxShadow: "0 0 60px rgba(251,191,36,0.06)",
              }}>
              <div className="flex items-center gap-2 px-4 py-3"
                style={{ background: "#13111f", borderBottom: "1px solid rgba(167,139,250,0.1)" }}>
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs font-mono" style={{ color: "#5B5490" }}>eccensia-api.ts</span>
              </div>

              <div className="p-6">
                <Terminal className="w-4 h-4 mb-4" style={{ color: "#5B5490" }} />
                <pre className="text-xs leading-relaxed font-mono overflow-x-auto">
                  <code>
                    <span style={{ color: "#5B5490" }}>// Eccensia automation pipeline</span>{"\n"}
                    <span style={{ color: "#A78BFA" }}>const</span>{" "}
                    <span className="text-white">pipeline</span>{" "}
                    <span style={{ color: "#A78BFA" }}>=</span>{" "}
                    <span style={{ color: "#FBBF24" }}>await</span>{" "}
                    <span className="text-white">eccensia</span>
                    <span style={{ color: "#A78BFA" }}>.</span>
                    <span style={{ color: "#FBBF24" }}>fetch</span>
                    <span className="text-white">(&#123;</span>{"\n"}
                    {"  "}<span style={{ color: "#A78BFA" }}>target</span>
                    <span className="text-white">:</span>{" "}
                    <span style={{ color: "#FBBF24" }}>"invoice-reconciliation"</span>
                    <span className="text-white">,</span>{"\n"}
                    {"  "}<span style={{ color: "#A78BFA" }}>env</span>
                    <span className="text-white">:</span>{" "}
                    <span style={{ color: "#FBBF24" }}>"bogota-edge-01"</span>
                    <span className="text-white">,</span>{"\n"}
                    <span className="text-white">&#125;);</span>{"\n\n"}
                    <span style={{ color: "#5B5490" }}>// Analyze bottlenecks</span>{"\n"}
                    <span style={{ color: "#A78BFA" }}>const</span>{" "}
                    <span className="text-white">report</span>{" "}
                    <span style={{ color: "#A78BFA" }}>=</span>{" "}
                    <span style={{ color: "#FBBF24" }}>await</span>{" "}
                    <span className="text-white">pipeline</span>
                    <span style={{ color: "#A78BFA" }}>.</span>
                    <span style={{ color: "#FBBF24" }}>analyze</span>
                    <span className="text-white">();</span>{"\n\n"}
                    <span style={{ color: "#5B5490" }}>{"// → {savings: '40%', roi: '6 weeks'}"}</span>{"\n\n"}
                    <span style={{ color: "#FBBF24" }}>await</span>{" "}
                    <span className="text-white">pipeline</span>
                    <span style={{ color: "#A78BFA" }}>.</span>
                    <span style={{ color: "#FBBF24" }}>automate</span>
                    <span className="text-white">();</span>{"\n"}
                    <span style={{ color: "#5B5490" }}>{"// ✓ Deployed to local infra"}</span>{"\n"}
                  </code>
                </pre>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-4"
                  style={{ borderTop: "1px solid rgba(167,139,250,0.1)" }}>
                  {[
                    { label: "Time Saved", value: "40%" },
                    { label: "ROI", value: "6wks" },
                    { label: "Latency", value: "<5ms" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-lg font-black font-mono text-gradient">{m.value}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: "#5B5490" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{ background: "#13111f", borderTop: "1px solid rgba(167,139,250,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FBBF24, #8B5CF6)" }}>
                <Zap className="w-3.5 h-3.5" style={{ color: "#09080f" }} />
              </div>
              <span className="font-black text-white">Eccensia</span>
            </div>

            <p className="text-sm text-center" style={{ color: "#5B5490" }}>{t.footer.tagline}</p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              {t.footer.links.map((link, i) => (
                <a key={i} href="#" className="text-sm transition-colors" style={{ color: "#5B5490" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#A78BFA")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#5B5490")}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(167,139,250,0.06)" }}>
            <p className="text-xs font-mono" style={{ color: "#5B5490" }}>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
