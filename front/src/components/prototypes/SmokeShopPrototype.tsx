import { useState } from "react";
import { Lock, Unlock, CheckCircle, AlertTriangle, ShoppingCart } from "lucide-react";

const ACCENT = "#818cf8";
const BG = "#05040f";
const CARD = "#0d0b1e";
const MUTED = "#4338ca";

const products = [
  { name: "Marlboro Red 20u", category: "Cigarrillos", price: 12500, stock: 48, tax: "IVA 19% + Impuesto Tabaco" },
  { name: "VUSE Alto Pod Kit", category: "Vaping", price: 89000, stock: 15, tax: "IVA 19% + Impuesto Tabaco" },
  { name: "Cohiba Siglo IV", category: "Puros", price: 145000, stock: 8, tax: "IVA 19% + Impuesto Tabaco" },
  { name: "Tabaco Cavendish 50g", category: "Tabaco", price: 38000, stock: 22, tax: "IVA 19% + Impuesto Tabaco" },
  { name: "Zippo Classic Chrome", category: "Accesorios", price: 75000, stock: 11, tax: "IVA 19%" },
];

const compliance = [
  { entity: "DIAN", item: "Facturación electrónica activa", status: true },
  { entity: "DIAN", item: "Impuesto al consumo tabaco declarado", status: true },
  { entity: "INVIMA", item: "Registro sanitario productos vigente", status: true },
  { entity: "Min. Salud", item: "Aviso restricción menores exhibido", status: true },
  { entity: "Min. Salud", item: "Zona libre de humo señalizada", status: false },
  { entity: "ICA", item: "Productos importados con aval ICA", status: true },
];

const tabs = ["Punto de Venta", "Inventario", "Cumplimiento"] as const;
type Tab = (typeof tabs)[number];

export default function SmokeShopPrototype() {
  const [tab, setTab] = useState<Tab>("Punto de Venta");
  const [verified, setVerified] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
  const cartTotal = Object.entries(cart).reduce((sum, [name, qty]) => {
    const p = products.find((pr) => pr.name === name);
    return sum + (p?.price ?? 0) * qty;
  }, 0);

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: BG, color: "#e0e7ff", fontFamily: "Inter, sans-serif" }}>
      <div className="px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: `1px solid rgba(129,140,248,0.12)` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-black" style={{ color: ACCENT }}>Smoke Shop Smart</h1>
            <p className="text-xs" style={{ color: MUTED }}>NIT 900.987.654-2 · Bogotá, Colombia</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(129,140,248,0.15)", color: ACCENT }}>
            DIAN + INVIMA ✓
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Productos", value: products.length },
            { label: "Cumplimiento", value: `${compliance.filter((c) => c.status).length}/${compliance.length}` },
            { label: "Carrito", value: Object.values(cart).reduce((s, v) => s + v, 0) },
            { label: "Total", value: `$${(cartTotal / 1000).toFixed(0)}k` },
          ].map((k) => (
            <div key={k.label} className="rounded-lg p-2 text-center" style={{ background: CARD }}>
              <div className="text-sm font-black" style={{ color: ACCENT }}>{k.value}</div>
              <div className="text-[10px]" style={{ color: MUTED }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 px-4 pt-3 gap-3" style={{ borderBottom: `1px solid rgba(129,140,248,0.08)` }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="pb-2 text-xs font-bold transition-colors"
            style={{ color: tab === t ? ACCENT : MUTED, borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "Punto de Venta" && (
          <div>
            {/* Age gate */}
            <div className="rounded-xl p-4 mb-4 flex items-center justify-between"
              style={{ background: verified ? "rgba(129,140,248,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${verified ? "rgba(129,140,248,0.2)" : "rgba(239,68,68,0.3)"}` }}>
              <div className="flex items-center gap-2">
                {verified ? <Unlock className="w-4 h-4" style={{ color: ACCENT }} /> : <Lock className="w-4 h-4" style={{ color: "#ef4444" }} />}
                <div>
                  <p className="text-xs font-bold" style={{ color: verified ? ACCENT : "#ef4444" }}>
                    {verified ? "Edad verificada — POS desbloqueado" : "Verificación de edad requerida (18+)"}
                  </p>
                  <p className="text-[10px]" style={{ color: MUTED }}>Ley 1335/2009 · Min. Salud Colombia</p>
                </div>
              </div>
              <button onClick={() => setVerified((v) => !v)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: verified ? "rgba(129,140,248,0.2)" : "rgba(239,68,68,0.2)", color: verified ? ACCENT : "#ef4444" }}>
                {verified ? "Resetear" : "Verificar ID"}
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {products.map((p) => (
                <div key={p.name} className="rounded-xl p-3 flex items-center gap-3"
                  style={{ background: CARD, border: `1px solid rgba(129,140,248,0.08)`, opacity: verified ? 1 : 0.35 }}>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>{p.category} · {p.tax}</p>
                  </div>
                  <p className="text-sm font-bold shrink-0" style={{ color: ACCENT }}>${p.price.toLocaleString("es-CO")}</p>
                  <button onClick={() => verified && addToCart(p.name)} disabled={!verified}
                    className="shrink-0 p-1.5 rounded-lg transition-colors"
                    style={{ background: "rgba(129,140,248,0.15)", color: ACCENT }}>
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  {cart[p.name] > 0 && (
                    <span className="text-xs font-black w-5 text-center" style={{ color: ACCENT }}>×{cart[p.name]}</span>
                  )}
                </div>
              ))}
            </div>

            {cartTotal > 0 && (
              <div className="mt-3 rounded-xl p-3 flex items-center justify-between"
                style={{ background: "rgba(129,140,248,0.1)", border: `1px solid rgba(129,140,248,0.2)` }}>
                <span className="text-xs font-semibold text-white">Total + IVA 19%</span>
                <span className="text-base font-black" style={{ color: ACCENT }}>${Math.round(cartTotal * 1.19).toLocaleString("es-CO")}</span>
              </div>
            )}
          </div>
        )}

        {tab === "Inventario" && (
          <div className="flex flex-col gap-2">
            {products.map((p) => (
              <div key={p.name} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(129,140,248,0.08)` }}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>{p.category} · {p.tax}</p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: ACCENT }}>${p.price.toLocaleString("es-CO")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(129,140,248,0.1)" }}>
                    <div className="h-full rounded-full" style={{ width: `${(p.stock / 50) * 100}%`, background: ACCENT }} />
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: MUTED }}>{p.stock} uds.</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Cumplimiento" && (
          <div className="flex flex-col gap-2">
            <div className="rounded-xl p-3 mb-2" style={{ background: "rgba(129,140,248,0.06)", border: `1px solid rgba(129,140,248,0.15)` }}>
              <p className="text-xs font-bold" style={{ color: ACCENT }}>Estado de Cumplimiento Regulatorio</p>
              <p className="text-xs mt-1" style={{ color: "#c7d2fe" }}>
                {compliance.filter((c) => c.status).length} de {compliance.length} requisitos cumplidos
              </p>
            </div>
            {compliance.map((c, i) => (
              <div key={i} className="rounded-xl p-3 flex items-center gap-3" style={{ background: CARD, border: `1px solid rgba(129,140,248,0.08)` }}>
                {c.status ? (
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#84cc16" }} />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: "#ef4444" }} />
                )}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">{c.item}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>{c.entity}</p>
                </div>
                <span className="text-[10px] font-bold" style={{ color: c.status ? "#84cc16" : "#ef4444" }}>
                  {c.status ? "OK" : "Acción"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
