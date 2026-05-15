import { motion } from "motion/react";
import { Shield, AlertTriangle, CheckCircle, Activity, Cpu, Server, Wifi } from "lucide-react";

const alerts = [
  { id: "ALT-001", service: "API Gateway", severity: "critical", msg: "Latency spike 2400ms avg", time: "2m ago" },
  { id: "ALT-002", service: "Auth Service", severity: "warning", msg: "Error rate 4.2% — threshold 3%", time: "8m ago" },
  { id: "ALT-003", service: "DB Replica", severity: "warning", msg: "Replication lag 340ms", time: "15m ago" },
  { id: "ALT-004", service: "CDN Edge", severity: "info", msg: "Cache hit ratio dropped to 71%", time: "22m ago" },
  { id: "ALT-005", service: "Worker Queue", severity: "info", msg: "Queue depth 1,240 — normal range", time: "31m ago" },
];

const nodes = [
  { name: "api-prod-1", cpu: 88, mem: 72, status: "critical" },
  { name: "api-prod-2", cpu: 61, mem: 68, status: "ok" },
  { name: "auth-prod-1", cpu: 45, mem: 55, status: "warning" },
  { name: "db-primary", cpu: 34, mem: 81, status: "ok" },
  { name: "worker-01", cpu: 22, mem: 44, status: "ok" },
  { name: "worker-02", cpu: 19, mem: 41, status: "ok" },
];

const uptimeData = [94, 98, 100, 100, 97, 100, 100, 98, 100, 100, 91, 100, 100, 98, 100, 100, 100, 95, 100, 100, 100, 98, 100, 100, 97, 100, 100, 100, 98, 87];

const sevStyle: Record<string, { bg: string; text: string; dot: string }> = {
  critical: { bg: "rgba(239,68,68,0.1)", text: "#ef4444", dot: "#ef4444" },
  warning:  { bg: "rgba(249,115,22,0.1)", text: "#F97316", dot: "#F97316" },
  info:     { bg: "rgba(251,146,60,0.08)", text: "#FB923C", dot: "#FB923C" },
};

const statusColor: Record<string, string> = {
  critical: "#ef4444",
  warning: "#F97316",
  ok: "#22c55e",
};

export default function InfrastructureSentinelPrototype() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: "#0f0800", color: "#e2e8f0" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(15,8,0,0.92)", borderBottom: "1px solid rgba(249,115,22,0.15)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.35)" }}>
            <Shield className="w-4 h-4" style={{ color: "#F97316" }} />
          </div>
          <div>
            <p className="text-xs font-mono" style={{ color: "#F97316" }}>ECCENSIA — INFRA SENTINEL</p>
            <p className="text-xs" style={{ color: "#64748b" }}>6 nodes monitored · auto-remediation ON</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold text-red-400">2 CRITICAL</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Uptime (30d)", value: "99.1%", icon: <Activity className="w-4 h-4" />, ok: true },
            { label: "Active Alerts", value: "5", icon: <AlertTriangle className="w-4 h-4" />, ok: false },
            { label: "MTTR", value: "4.2 min", icon: <CheckCircle className="w-4 h-4" />, ok: true },
            { label: "Auto-fixed", value: "18", icon: <Cpu className="w-4 h-4" />, ok: true },
          ].map((k) => (
            <div key={k.label} className="rounded-xl p-4" style={{ background: "#1a0e00", border: `1px solid rgba(249,115,22,${k.ok ? "0.12" : "0.3"})` }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: "#64748b" }}>{k.label}</p>
                <span style={{ color: k.ok ? "#F97316" : "#ef4444" }}>{k.icon}</span>
              </div>
              <p className="text-2xl font-black" style={{ color: k.ok ? "#F97316" : "#ef4444" }}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Uptime heatmap */}
        <div className="rounded-xl p-5" style={{ background: "#1a0e00", border: "1px solid rgba(249,115,22,0.1)" }}>
          <p className="text-sm font-bold mb-3" style={{ color: "#e2e8f0" }}>30-Day Uptime Heatmap</p>
          <div className="flex gap-1 flex-wrap">
            {uptimeData.map((u, i) => {
              const color = u === 100 ? "#F97316" : u >= 95 ? "#FB923C" : u >= 90 ? "#fdba74" : "#ef4444";
              const opacity = u === 100 ? 0.85 : u >= 95 ? 0.6 : u >= 90 ? 0.4 : 0.9;
              return (
                <div key={i} title={`Day ${i + 1}: ${u}%`}
                  className="w-6 h-6 rounded-sm" style={{ background: color, opacity }} />
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            {[["100%", "#F97316", 0.85], ["95–99%", "#FB923C", 0.6], ["90–94%", "#fdba74", 0.4], ["<90%", "#ef4444", 0.9]].map(([label, color, op]) => (
              <span key={label as string} className="flex items-center gap-1.5 text-xs" style={{ color: "#94a3b8" }}>
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color as string, opacity: op as number }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Node grid */}
        <div className="rounded-xl p-5" style={{ background: "#1a0e00", border: "1px solid rgba(249,115,22,0.1)" }}>
          <p className="text-sm font-bold mb-4" style={{ color: "#e2e8f0" }}>Node Health</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {nodes.map((node) => (
              <div key={node.name} className="rounded-lg p-3" style={{ background: "#0f0800", border: `1px solid ${statusColor[node.status]}22` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Server className="w-3 h-3" style={{ color: statusColor[node.status] }} />
                    <span className="text-[10px] font-mono" style={{ color: "#94a3b8" }}>{node.name}</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[node.status], display: "inline-block" }} />
                </div>
                <div className="space-y-1.5">
                  {[["CPU", node.cpu], ["MEM", node.mem]].map(([label, val]) => (
                    <div key={label as string}>
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[9px]" style={{ color: "#64748b" }}>{label}</span>
                        <span className="text-[9px] font-mono" style={{ color: (val as number) > 80 ? "#ef4444" : "#F97316" }}>{val}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(249,115,22,0.1)" }}>
                        <div className="h-full rounded-full" style={{
                          width: `${val}%`,
                          background: (val as number) > 80 ? "#ef4444" : "linear-gradient(90deg, #ea580c, #F97316)"
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert feed */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(249,115,22,0.1)" }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#1a0e00" }}>
            <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>Alert Feed</p>
            <Wifi className="w-4 h-4" style={{ color: "#64748b" }} />
          </div>
          {alerts.map((a, i) => {
            const s = sevStyle[a.severity];
            return (
              <motion.div key={a.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="px-5 py-3 flex items-start gap-3"
                style={{ background: i % 2 === 0 ? "#0f0800" : "#1a0e00", borderTop: "1px solid rgba(249,115,22,0.06)" }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.dot, display: "inline-block" }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold" style={{ color: "#e2e8f0" }}>{a.service}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: s.bg, color: s.text }}>{a.severity}</span>
                  </div>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>{a.msg}</p>
                </div>
                <span className="text-[10px] shrink-0" style={{ color: "#64748b" }}>{a.time}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
