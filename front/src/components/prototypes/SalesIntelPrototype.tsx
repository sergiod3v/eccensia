import { motion } from "motion/react";
import { TrendingUp, User, Zap, Star, Mail, Phone, BarChart3 } from "lucide-react";

const leads = [
  { name: "Distribuidora Bogotá", contact: "Carolina Ruiz", score: 94, stage: "Proposal", value: "$8,400", source: "LinkedIn" },
  { name: "Construcciones Andinas", contact: "Jorge Medina", score: 87, stage: "Demo", value: "$12,000", source: "Referral" },
  { name: "Tech Servicios S.A.", contact: "Valentina Pérez", score: 72, stage: "Qualified", value: "$5,200", source: "Web" },
  { name: "Logística del Norte", contact: "Andrés Torres", score: 61, stage: "Contact", value: "$3,800", source: "Cold" },
  { name: "Alimentos Centrales", contact: "María López", score: 55, stage: "Contact", value: "$6,100", source: "Web" },
];

const funnel = [
  { stage: "Awareness", count: 1240, pct: 100 },
  { stage: "Qualified", count: 384, pct: 31 },
  { stage: "Demo", count: 142, pct: 11.5 },
  { stage: "Proposal", count: 58, pct: 4.7 },
  { stage: "Closed", count: 29, pct: 2.3 },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#A78BFA" : score >= 60 ? "#F5C842" : "#94a3b8";
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(167,139,250,0.15)" }}>
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs font-bold font-mono" style={{ color }}>{score}</span>
    </div>
  );
}

export default function SalesIntelPrototype() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: "#0d0a1e", color: "#e2e8f0" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(13,10,30,0.9)", borderBottom: "1px solid rgba(139,92,246,0.15)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)" }}>
            <BarChart3 className="w-4 h-4" style={{ color: "#A78BFA" }} />
          </div>
          <div>
            <p className="text-xs font-mono" style={{ color: "#A78BFA" }}>ECCENSIA — SALES INTEL</p>
            <p className="text-xs" style={{ color: "#64748b" }}>AI pipeline · 29 deals active</p>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(139,92,246,0.15)", color: "#A78BFA" }}>
          +30% conversion
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Pipeline Value", value: "$284K", delta: "+18% MoM" },
            { label: "Avg Lead Score", value: "73.8", delta: "+9 pts" },
            { label: "Win Rate", value: "32%", delta: "+8% vs prev" },
            { label: "Sequences Active", value: "147", delta: "Auto-running" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl p-4" style={{ background: "#130f2a", border: "1px solid rgba(139,92,246,0.12)" }}>
              <p className="text-xs mb-2" style={{ color: "#64748b" }}>{k.label}</p>
              <p className="text-2xl font-black" style={{ color: "#A78BFA" }}>{k.value}</p>
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#22c55e" }}>
                <TrendingUp className="w-3 h-3" />{k.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Funnel */}
        <div className="rounded-xl p-5" style={{ background: "#130f2a", border: "1px solid rgba(139,92,246,0.1)" }}>
          <p className="text-sm font-bold mb-4" style={{ color: "#e2e8f0" }}>Conversion Funnel</p>
          <div className="space-y-2">
            {funnel.map((f) => (
              <div key={f.stage}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: "#94a3b8" }}>{f.stage}</span>
                  <span className="text-xs font-mono" style={{ color: "#A78BFA" }}>{f.count.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(139,92,246,0.1)" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${f.pct}%` }} transition={{ duration: 0.8, delay: 0.1 }}
                    className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #8B5CF6, #A78BFA)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead table */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.1)" }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#130f2a" }}>
            <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>AI-Scored Leads</p>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" style={{ color: "#A78BFA" }} />
              <span className="text-xs" style={{ color: "#A78BFA" }}>Auto-enriched</span>
            </div>
          </div>
          {leads.map((lead, i) => (
            <motion.div key={lead.name}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              className="px-5 py-3 flex items-center gap-4"
              style={{ background: i % 2 === 0 ? "#0d0a1e" : "#130f2a", borderTop: "1px solid rgba(139,92,246,0.06)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(139,92,246,0.12)" }}>
                <User className="w-3.5 h-3.5" style={{ color: "#A78BFA" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: "#e2e8f0" }}>{lead.name}</p>
                <p className="text-[10px] truncate" style={{ color: "#64748b" }}>{lead.contact}</p>
              </div>
              <ScoreBadge score={lead.score} />
              <span className="text-[10px] px-2 py-0.5 rounded-full hidden sm:inline" style={{ background: "rgba(139,92,246,0.12)", color: "#A78BFA" }}>{lead.stage}</span>
              <span className="text-xs font-mono" style={{ color: "#e2e8f0" }}>{lead.value}</span>
              <div className="flex gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: "#64748b" }} />
                <Phone className="w-3.5 h-3.5" style={{ color: "#64748b" }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI insight */}
        <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}>
          <Star className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#A78BFA" }} />
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: "#A78BFA" }}>AI Insight</p>
            <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
              Construcciones Andinas shows 3× engagement spike this week. Recommend advancing to proposal stage — optimal send window: Wednesday 9–11am COT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
