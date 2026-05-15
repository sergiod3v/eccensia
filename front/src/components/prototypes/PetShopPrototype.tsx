import { useState } from "react";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

const ACCENT = "#f472b6";
const BG = "#130010";
const CARD = "#200018";
const MUTED = "#9d174d";

const appointments = [
  { time: "09:00", pet: "Max", owner: "Carlos Ruiz", service: "Baño y corte", status: "Completado" },
  { time: "10:30", pet: "Luna", owner: "María García", service: "Vacuna antirrábica", status: "En curso" },
  { time: "12:00", pet: "Rocky", owner: "Andrés López", service: "Consulta general", status: "Pendiente" },
  { time: "14:00", pet: "Coco", owner: "Sara Martínez", service: "Desparasitación", status: "Pendiente" },
  { time: "16:30", pet: "Nala", owner: "Felipe Torres", service: "Baño y corte", status: "Pendiente" },
];

const pets = [
  { name: "Max", species: "Canino", breed: "Golden Retriever", owner: "Carlos Ruiz", age: "3 años", vaccines: ["Rabia ✓", "Parvovirus ✓", "Leptospira ✓"], next: "Ago 2025" },
  { name: "Luna", species: "Canino", breed: "Labrador", owner: "María García", age: "2 años", vaccines: ["Rabia ✓", "Parvovirus ✓", "Leptospira ⚠"], next: "May 2025" },
  { name: "Rocky", species: "Canino", breed: "Bulldog Francés", owner: "Andrés López", age: "5 años", vaccines: ["Rabia ✓", "Parvovirus ✓", "Leptospira ✓"], next: "Dic 2025" },
  { name: "Coco", species: "Felino", breed: "Persa", owner: "Sara Martínez", age: "4 años", vaccines: ["Rabia ✓", "Triple Felino ✓"], next: "Nov 2025" },
];

const alerts = [
  { type: "vaccine", text: "Luna — Leptospira vence en 3 días. Notificación enviada a María García.", urgency: "alta" },
  { type: "appointment", text: "Rocky sin visita en 8 meses. Recomendado chequeo general.", urgency: "media" },
  { type: "birthday", text: "Max cumple 4 años el 18 de mayo. Enviar cupón de baño de cumpleaños.", urgency: "info" },
  { type: "vaccine", text: "Nala — sin historial de vacunas registrado. Solicitar carné al propietario.", urgency: "alta" },
];

const statusColor: Record<string, string> = {
  Completado: "#84cc16",
  "En curso": "#FBBF24",
  Pendiente: MUTED,
};

const statusIcon: Record<string, typeof CheckCircle> = {
  Completado: CheckCircle,
  "En curso": Clock,
  Pendiente: Clock,
};

const tabs = ["Agenda", "Mascotas", "Alertas IA"] as const;
type Tab = (typeof tabs)[number];

export default function PetShopPrototype() {
  const [tab, setTab] = useState<Tab>("Agenda");

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: BG, color: "#fce7f3", fontFamily: "Inter, sans-serif" }}>
      <div className="px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: `1px solid rgba(244,114,182,0.12)` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-black" style={{ color: ACCENT }}>Pet Shop IA</h1>
            <p className="text-xs" style={{ color: MUTED }}>Clínica Veterinaria · Bogotá, Colombia</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(244,114,182,0.15)", color: ACCENT }}>
            {appointments.filter((a) => a.status === "Completado").length}/{appointments.length} hoy
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Citas Hoy", value: appointments.length },
            { label: "Completadas", value: appointments.filter((a) => a.status === "Completado").length },
            { label: "Pacientes", value: pets.length },
            { label: "Alertas", value: alerts.filter((a) => a.urgency === "alta").length },
          ].map((k) => (
            <div key={k.label} className="rounded-lg p-2 text-center" style={{ background: CARD }}>
              <div className="text-sm font-black" style={{ color: ACCENT }}>{k.value}</div>
              <div className="text-[10px]" style={{ color: MUTED }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 px-4 pt-3 gap-3" style={{ borderBottom: `1px solid rgba(244,114,182,0.08)` }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="pb-2 text-xs font-bold transition-colors"
            style={{ color: tab === t ? ACCENT : MUTED, borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "Agenda" && (
          <div className="flex flex-col gap-2">
            {appointments.map((a, i) => {
              const Icon = statusIcon[a.status];
              return (
                <div key={i} className="rounded-xl p-3 flex items-center gap-3" style={{ background: CARD, border: `1px solid rgba(244,114,182,0.08)` }}>
                  <div className="text-center shrink-0 w-12">
                    <p className="text-sm font-black font-mono" style={{ color: ACCENT }}>{a.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{a.pet}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>{a.owner} · {a.service}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon className="w-3.5 h-3.5" style={{ color: statusColor[a.status] }} />
                    <span className="text-[10px] font-bold" style={{ color: statusColor[a.status] }}>{a.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "Mascotas" && (
          <div className="flex flex-col gap-2">
            {pets.map((p) => (
              <div key={p.name} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(244,114,182,0.08)` }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-white">{p.name}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>{p.species} · {p.breed} · {p.age}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>Dueño: {p.owner}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px]" style={{ color: MUTED }}>Próx. vacuna</p>
                    <p className="text-xs font-bold" style={{ color: ACCENT }}>{p.next}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {p.vaccines.map((v) => (
                    <span key={v} className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background: v.includes("⚠") ? "rgba(239,68,68,0.2)" : "rgba(244,114,182,0.12)", color: v.includes("⚠") ? "#f87171" : ACCENT }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Alertas IA" && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl p-3" style={{ background: "rgba(244,114,182,0.06)", border: `1px solid rgba(244,114,182,0.15)` }}>
              <p className="text-xs font-bold" style={{ color: ACCENT }}>Asistente IA · Eccensia</p>
              <p className="text-xs mt-1" style={{ color: "#fbcfe8" }}>Notificaciones automáticas a dueños vía WhatsApp. Tasa de respuesta: 91%.</p>
            </div>
            {alerts.map((a, i) => {
              const urgencyColor = a.urgency === "alta" ? "#ef4444" : a.urgency === "media" ? "#FBBF24" : ACCENT;
              const Icon = a.urgency === "alta" ? AlertTriangle : a.urgency === "media" ? AlertTriangle : CheckCircle;
              return (
                <div key={i} className="rounded-xl p-3 flex gap-3" style={{ background: CARD, border: `1px solid rgba(244,114,182,0.08)` }}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: urgencyColor }} />
                  <div>
                    <p className="text-xs" style={{ color: "#fce7f3" }}>{a.text}</p>
                    <span className="text-[10px] font-bold uppercase" style={{ color: urgencyColor }}>urgencia {a.urgency}</span>
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
