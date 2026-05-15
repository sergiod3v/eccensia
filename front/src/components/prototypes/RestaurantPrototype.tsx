import { useState } from "react";
import { Clock, ChefHat, CheckCircle, TrendingUp } from "lucide-react";

const ACCENT = "#f43f5e";
const BG = "#150007";
const CARD = "#230010";
const MUTED = "#9f1239";

type OrderStatus = "Pendiente" | "Cocinando" | "Listo" | "Entregado";

const STATUS_CYCLE: OrderStatus[] = ["Pendiente", "Cocinando", "Listo", "Entregado"];

const initialOrders: { id: string; table: string; items: string[]; time: string; status: OrderStatus }[] = [
  { id: "CMD-041", table: "Mesa 3", items: ["Bandeja Paisa", "Limonada de Coco"], time: "12:14", status: "Cocinando" },
  { id: "CMD-042", table: "Mesa 7", items: ["Ajiaco Bogotano x2", "Agua Cristal"], time: "12:22", status: "Pendiente" },
  { id: "CMD-043", table: "Mesa 1", items: ["Sobrebarriga al Horno", "Arroz con Coco", "Patacones"], time: "12:31", status: "Cocinando" },
  { id: "CMD-044", table: "Mesa 5", items: ["Cazuela de Mariscos", "Jugo de Maracuyá"], time: "12:45", status: "Pendiente" },
];

const reservations = [
  { time: "19:00", name: "García — 4 personas", note: "Cumpleaños, mesa con decoración" },
  { time: "19:30", name: "López — 2 personas", note: "" },
  { time: "20:00", name: "Martínez — 6 personas", note: "Reunión de negocios, menú ejecutivo" },
  { time: "20:30", name: "Rodríguez — 3 personas", note: "Alergia al mariscos — 1 persona" },
  { time: "21:00", name: "Torres — 8 personas", note: "Celebración, servicio completo" },
];

const insights = [
  { icon: TrendingUp, text: "Bandeja Paisa es el plato más pedido hoy (34% del total). Stock de chicharrón al 45%.", type: "trend" },
  { icon: ChefHat, text: "Tiempo promedio de cocina: 18 min. Meta: 15 min. Considerar preparar salsas con anticipación.", type: "ops" },
  { icon: TrendingUp, text: "Desperdicio proyectado hoy: 8% (meta: 5%). Ingredientes en riesgo: Plátano maduro, Aguacate.", type: "waste" },
  { icon: CheckCircle, text: "Ocupación nocturna: 96%. Recomendado lista de espera digital para llegadas sin reserva.", type: "capacity" },
];

const statusColor: Record<OrderStatus, string> = {
  Pendiente: MUTED,
  Cocinando: "#FBBF24",
  Listo: "#84cc16",
  Entregado: "#475569",
};

const tabs = ["Cocina", "Reservas", "Insights IA"] as const;
type Tab = (typeof tabs)[number];

export default function RestaurantPrototype() {
  const [tab, setTab] = useState<Tab>("Cocina");
  const [orders, setOrders] = useState(initialOrders);

  const cycleStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = STATUS_CYCLE.indexOf(o.status);
        return { ...o, status: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] };
      })
    );
  };

  const active = orders.filter((o) => o.status !== "Entregado").length;

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: BG, color: "#ffe4e6", fontFamily: "Inter, sans-serif" }}>
      <div className="px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: `1px solid rgba(244,63,94,0.12)` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-black" style={{ color: ACCENT }}>Restaurante IA</h1>
            <p className="text-xs" style={{ color: MUTED }}>Servicio del Mediodía · Bogotá, Colombia</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(244,63,94,0.15)", color: ACCENT }}>
            {active} órdenes activas
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Órdenes", value: orders.length },
            { label: "En cocina", value: orders.filter((o) => o.status === "Cocinando").length },
            { label: "Listos", value: orders.filter((o) => o.status === "Listo").length },
            { label: "Reservas", value: reservations.length },
          ].map((k) => (
            <div key={k.label} className="rounded-lg p-2 text-center" style={{ background: CARD }}>
              <div className="text-sm font-black" style={{ color: ACCENT }}>{k.value}</div>
              <div className="text-[10px]" style={{ color: MUTED }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 px-4 pt-3 gap-3" style={{ borderBottom: `1px solid rgba(244,63,94,0.08)` }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="pb-2 text-xs font-bold transition-colors"
            style={{ color: tab === t ? ACCENT : MUTED, borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "Cocina" && (
          <div>
            <p className="text-[10px] mb-3" style={{ color: MUTED }}>Toca el estado para actualizar el pedido →</p>
            <div className="flex flex-col gap-2">
              {orders.map((o) => (
                <div key={o.id} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(244,63,94,0.08)` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold font-mono text-white">{o.id} · {o.table}</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>{o.time}</p>
                    </div>
                    <button onClick={() => cycleStatus(o.id)}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full transition-all"
                      style={{ background: `${statusColor[o.status]}20`, color: statusColor[o.status], border: `1px solid ${statusColor[o.status]}40` }}>
                      {o.status}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {o.items.map((item) => (
                      <span key={item} className="text-[10px] px-2 py-0.5 rounded"
                        style={{ background: "rgba(244,63,94,0.08)", color: "#fda4af" }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Reservas" && (
          <div className="flex flex-col gap-2">
            <div className="rounded-xl p-3 mb-1" style={{ background: "rgba(244,63,94,0.06)", border: `1px solid rgba(244,63,94,0.15)` }}>
              <p className="text-xs font-bold" style={{ color: ACCENT }}>Reservas Nocturnas — {reservations.length} mesas</p>
              <p className="text-xs mt-0.5" style={{ color: "#fda4af" }}>Ocupación proyectada: 96% · Notificaciones automáticas enviadas</p>
            </div>
            {reservations.map((r, i) => (
              <div key={i} className="rounded-xl p-3 flex items-start gap-3" style={{ background: CARD, border: `1px solid rgba(244,63,94,0.08)` }}>
                <div className="text-center shrink-0 w-12">
                  <p className="text-sm font-black font-mono" style={{ color: ACCENT }}>{r.time}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  {r.note && <p className="text-[10px] mt-0.5" style={{ color: "#fda4af" }}>{r.note}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Insights IA" && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl p-3" style={{ background: "rgba(244,63,94,0.06)", border: `1px solid rgba(244,63,94,0.15)` }}>
              <p className="text-xs font-bold" style={{ color: ACCENT }}>Asistente IA · Eccensia</p>
              <p className="text-xs mt-1" style={{ color: "#fda4af" }}>Análisis de ventas, cocina y desperdicio en tiempo real.</p>
            </div>
            {insights.map((ins, i) => {
              const Icon = ins.icon;
              const c = ins.type === "waste" ? "#FBBF24" : ins.type === "ops" ? "#A78BFA" : ACCENT;
              return (
                <div key={i} className="rounded-xl p-3 flex gap-3" style={{ background: CARD, border: `1px solid rgba(244,63,94,0.08)` }}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: c }} />
                  <p className="text-xs" style={{ color: "#ffe4e6" }}>{ins.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
