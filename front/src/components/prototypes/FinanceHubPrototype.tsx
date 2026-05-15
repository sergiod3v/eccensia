import { TrendingUp, TrendingDown, FileText, CheckCircle, AlertCircle, DollarSign, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

const invoices = [
  { id: "INV-2024-0841", vendor: "Proveedor Andino S.A.S", amount: "$4,200,000", status: "matched", date: "May 12" },
  { id: "INV-2024-0842", vendor: "Tech Bogotá Ltda", amount: "$1,850,000", status: "matched", date: "May 12" },
  { id: "INV-2024-0843", vendor: "Distribuciones Norte", amount: "$780,000", status: "pending", date: "May 13" },
  { id: "INV-2024-0844", vendor: "Importaciones CR", amount: "$6,100,000", status: "flagged", date: "May 13" },
  { id: "INV-2024-0845", vendor: "Servicios Bogotá", amount: "$2,340,000", status: "matched", date: "May 14" },
];

const cashflow = [
  { month: "Jan", in: 82, out: 61 },
  { month: "Feb", in: 74, out: 58 },
  { month: "Mar", in: 91, out: 63 },
  { month: "Apr", in: 88, out: 55 },
  { month: "May", in: 96, out: 60 },
];

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  matched: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e", label: "Matched" },
  pending:  { bg: "rgba(245, 200, 66, 0.1)", text: "#F5C842", label: "Pending" },
  flagged:  { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", label: "Flagged" },
};

export default function FinanceHubPrototype() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: "#0a0f1e", color: "#e2e8f0" }}>
      {/* Header bar */}
      <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(10,15,30,0.9)", borderBottom: "1px solid rgba(245,200,66,0.12)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,200,66,0.15)", border: "1px solid rgba(245,200,66,0.3)" }}>
            <DollarSign className="w-4 h-4" style={{ color: "#F5C842" }} />
          </div>
          <div>
            <p className="text-xs font-mono" style={{ color: "#F5C842" }}>ECCENSIA — FINANCE HUB</p>
            <p className="text-xs" style={{ color: "#64748b" }}>Live reconciliation · May 14, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ color: "#F5C842", animationDuration: "3s" }} />
          <span className="text-xs font-mono" style={{ color: "#F5C842" }}>LIVE</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Invoices Today", value: "47", delta: "+12%", up: true },
            { label: "Auto-Matched", value: "43", delta: "91.5%", up: true },
            { label: "Flagged", value: "4", delta: "↓ from 11", up: true },
            { label: "Overhead Saved", value: "−40%", delta: "vs manual", up: true },
          ].map((kpi) => (
            <motion.div key={kpi.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-4"
              style={{ background: "#111827", border: "1px solid rgba(245,200,66,0.12)" }}>
              <p className="text-xs mb-2" style={{ color: "#64748b" }}>{kpi.label}</p>
              <p className="text-2xl font-black" style={{ color: "#F5C842" }}>{kpi.value}</p>
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: kpi.up ? "#22c55e" : "#ef4444" }}>
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.delta}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cash flow mini chart */}
        <div className="rounded-xl p-5" style={{ background: "#111827", border: "1px solid rgba(245,200,66,0.1)" }}>
          <p className="text-sm font-bold mb-4" style={{ color: "#e2e8f0" }}>Cash Flow — 5 Month View</p>
          <div className="flex items-end gap-3 h-24">
            {cashflow.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end" style={{ height: 72 }}>
                  <div className="flex-1 rounded-t-sm" style={{ height: `${d.in}%`, background: "rgba(245,200,66,0.7)" }} />
                  <div className="flex-1 rounded-t-sm" style={{ height: `${d.out}%`, background: "rgba(239,68,68,0.4)" }} />
                </div>
                <span className="text-[10px]" style={{ color: "#64748b" }}>{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "#94a3b8" }}>
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "rgba(245,200,66,0.7)" }} /> Inflow
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "#94a3b8" }}>
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "rgba(239,68,68,0.4)" }} /> Outflow
            </span>
          </div>
        </div>

        {/* Invoice table */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(245,200,66,0.1)" }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#111827" }}>
            <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>Recent Invoices</p>
            <FileText className="w-4 h-4" style={{ color: "#64748b" }} />
          </div>
          {invoices.map((inv, i) => {
            const s = statusStyle[inv.status];
            return (
              <motion.div key={inv.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-center justify-between px-5 py-3"
                style={{ background: i % 2 === 0 ? "#0d1526" : "#111827", borderTop: "1px solid rgba(245,200,66,0.06)" }}>
                <div>
                  <p className="text-xs font-mono" style={{ color: "#F5C842" }}>{inv.id}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{inv.vendor}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono" style={{ color: "#e2e8f0" }}>{inv.amount}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: s.bg, color: s.text }}>
                    {s.label}
                  </span>
                  {inv.status === "matched" ? <CheckCircle className="w-3.5 h-3.5" style={{ color: "#22c55e" }} /> : <AlertCircle className="w-3.5 h-3.5" style={{ color: s.text }} />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
