import { useState } from "react";
import { AlertTriangle, CheckCircle, FileText, TrendingUp } from "lucide-react";

const ACCENT = "#84cc16";
const BG = "#050d00";
const CARD = "#0a1400";
const MUTED = "#4d7c0f";

const products = [
  { name: "Arroz Diana 500g", sku: "ARR-001", stock: 85, max: 100, price: 3200, category: "Granos" },
  { name: "Aceite Gourmet 1L", sku: "ACE-045", stock: 12, max: 60, price: 18500, category: "Aceites" },
  { name: "Leche Alquería 1L", sku: "LEC-012", stock: 34, max: 80, price: 4800, category: "Lácteos" },
  { name: "Azúcar Riopaila 1kg", sku: "AZU-003", stock: 6, max: 50, price: 4200, category: "Granos" },
  { name: "Café Tostao 500g", sku: "CAF-018", stock: 29, max: 40, price: 22000, category: "Bebidas" },
];

const facturas = [
  { num: "FE-2025-001847", nit: "900.123.456-1", cliente: "Distribuidora Los Andes", valor: 2840000, cufe: "3f9a2b...e14c", estado: "Aprobada", fecha: "2025-05-14" },
  { num: "FE-2025-001846", nit: "800.987.654-3", cliente: "Tienda La Esperanza", valor: 420000, cufe: "7c1d5e...a92f", estado: "Aprobada", fecha: "2025-05-14" },
  { num: "FE-2025-001845", nit: "901.234.567-8", cliente: "Supermercado El Rey", valor: 1350000, cufe: "2a8f1c...b73d", estado: "Pendiente", fecha: "2025-05-13" },
  { num: "FE-2025-001844", nit: "700.456.789-2", cliente: "Comercial Norte", valor: 980000, cufe: "9e4b7a...f28c", estado: "Aprobada", fecha: "2025-05-13" },
];

const insights = [
  { icon: AlertTriangle, text: "Azúcar Riopaila al 12% — pedido recomendado: 44 uds. a Proveedor Riopaila S.A.", urgency: "alta" },
  { icon: AlertTriangle, text: "Aceite Gourmet al 20% — sincronizar pedido con Alianza (próx. martes).", urgency: "media" },
  { icon: FileText, text: "IVA periodo: COP $539.600 vence el 15 de mayo. Declaración DIAN lista.", urgency: "alta" },
  { icon: TrendingUp, text: "Café Tostao +34% ventas vs. semana anterior. Aumentar stock de seguridad.", urgency: "info" },
];

const tabs = ["Inventario", "Facturas DIAN", "Insights IA"] as const;
type Tab = (typeof tabs)[number];

export default function SupermarketPrototype() {
  const [tab, setTab] = useState<Tab>("Inventario");
  const totalVentas = 3260000;
  const aprobadas = facturas.filter((f) => f.estado === "Aprobada").length;

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: BG, color: "#e8f5d0", fontFamily: "Inter, sans-serif" }}>
      <div className="px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: `1px solid rgba(132,204,22,0.12)` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-black" style={{ color: ACCENT }}>Supermercado IA</h1>
            <p className="text-xs" style={{ color: MUTED }}>NIT 900.123.456-1 · Bogotá, Colombia</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(132,204,22,0.15)", color: ACCENT }}>
            DIAN Conectado ✓
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Ventas Hoy", value: "$3.26M" },
            { label: "Facturas DIAN", value: `${aprobadas}/${facturas.length}` },
            { label: "IVA 19%", value: "$540k" },
            { label: "Productos", value: products.length },
          ].map((k) => (
            <div key={k.label} className="rounded-lg p-2 text-center" style={{ background: CARD }}>
              <div className="text-sm font-black" style={{ color: ACCENT }}>{k.value}</div>
              <div className="text-[10px]" style={{ color: MUTED }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 px-4 pt-3 gap-3" style={{ borderBottom: `1px solid rgba(132,204,22,0.08)` }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="pb-2 text-xs font-bold transition-colors"
            style={{ color: tab === t ? ACCENT : MUTED, borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "Inventario" && (
          <div className="flex flex-col gap-2">
            {products.map((p) => {
              const pct = Math.round((p.stock / p.max) * 100);
              const low = pct < 25;
              return (
                <div key={p.sku} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(132,204,22,0.08)` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-[10px] font-mono" style={{ color: MUTED }}>{p.sku} · {p.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: ACCENT }}>${p.price.toLocaleString("es-CO")}</p>
                      {low && <span className="text-[10px] font-bold" style={{ color: "#ef4444" }}>⚠ Stock bajo</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(132,204,22,0.1)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: low ? "#ef4444" : ACCENT }} />
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: low ? "#ef4444" : MUTED }}>{p.stock}/{p.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "Facturas DIAN" && (
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono mb-1" style={{ color: MUTED }}>Resolución DIAN No. 18760000001 · Factura Electrónica</p>
            {facturas.map((f) => (
              <div key={f.num} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(132,204,22,0.08)` }}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs font-bold font-mono text-white">{f.num}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>{f.cliente} · NIT {f.nit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black" style={{ color: ACCENT }}>${f.valor.toLocaleString("es-CO")}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: f.estado === "Aprobada" ? "rgba(132,204,22,0.15)" : "rgba(251,191,36,0.15)", color: f.estado === "Aprobada" ? ACCENT : "#FBBF24" }}>
                      {f.estado === "Aprobada" && <CheckCircle className="inline w-2.5 h-2.5 mr-0.5" />}
                      {f.estado}
                    </span>
                  </div>
                </div>
                <p className="text-[9px] font-mono" style={{ color: "rgba(77,124,15,0.6)" }}>CUFE: {f.cufe} · {f.fecha}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "Insights IA" && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl p-3" style={{ background: "rgba(132,204,22,0.06)", border: `1px solid rgba(132,204,22,0.15)` }}>
              <p className="text-xs font-bold" style={{ color: ACCENT }}>Asistente IA · Eccensia</p>
              <p className="text-xs mt-1" style={{ color: "#a3d160" }}>Análisis basado en ventas del día, stock actual y calendario DIAN.</p>
            </div>
            {insights.map((ins, i) => {
              const Icon = ins.icon;
              const urgencyColor = ins.urgency === "alta" ? "#ef4444" : ins.urgency === "media" ? "#FBBF24" : ACCENT;
              return (
                <div key={i} className="rounded-xl p-3 flex gap-3" style={{ background: CARD, border: `1px solid rgba(132,204,22,0.08)` }}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: urgencyColor }} />
                  <div>
                    <p className="text-xs" style={{ color: "#e8f5d0" }}>{ins.text}</p>
                    <span className="text-[10px] font-bold uppercase" style={{ color: urgencyColor }}>urgencia {ins.urgency}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
