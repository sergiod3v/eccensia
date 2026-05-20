import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";
import FinanceHubPrototype from "./FinanceHubPrototype";
import SalesIntelPrototype from "./SalesIntelPrototype";
import InfrastructureSentinelPrototype from "./InfrastructureSentinelPrototype";
import CustomCopilotPrototype from "./CustomCopilotPrototype";
import SupermarketPrototype from "./SupermarketPrototype";
import FarmaciaPrototype from "./FarmaciaPrototype";
import PetShopPrototype from "./PetShopPrototype";
import SmokeShopPrototype from "./SmokeShopPrototype";
import PersonalFinancePrototype from "./PersonalFinancePrototype";
import RestaurantPrototype from "./RestaurantPrototype";

export type PrototypeId = "finance" | "supermarket" | "farmacia" | "sales" | "petshop" | "copilot" | "personalfinance" | "restaurant" | "smoke" | "infra";

const PROTOTYPES: Record<PrototypeId, { label: string; component: React.FC }> = {
  finance:         { label: "Finance Hub", component: FinanceHubPrototype },
  supermarket:     { label: "Supermarket IA", component: SupermarketPrototype },
  farmacia:        { label: "Farmacia Digital", component: FarmaciaPrototype },
  sales:           { label: "Sales Intel", component: SalesIntelPrototype },
  petshop:         { label: "Pet Shop IA", component: PetShopPrototype },
  copilot:         { label: "Custom Copilot", component: CustomCopilotPrototype },
  personalfinance: { label: "Personal Finance IA", component: PersonalFinancePrototype },
  restaurant:      { label: "Restaurante IA", component: RestaurantPrototype },
  smoke:           { label: "Smoke Shop Smart", component: SmokeShopPrototype },
  infra:           { label: "Infrastructure Sentinel", component: InfrastructureSentinelPrototype },
};

interface Props {
  open: PrototypeId | null;
  onClose: () => void;
}

export default function TemplatePrototypeModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const proto = open ? PROTOTYPES[open] : null;
  const Component = proto?.component ?? null;

  return (
    <AnimatePresence>
      {open && proto && Component && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col"
            style={{ height: "85vh", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chrome bar */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ background: "rgba(10,10,20,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
                <span className="ml-3 text-xs font-mono" style={{ color: "#475569" }}>eccensia.app / {proto.label.toLowerCase().replace(/ /g, "-")}</span>
              </div>
              <button onClick={onClose} className="p-1 rounded-lg transition-colors" style={{ color: "#64748b" }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prototype */}
            <div className="flex-1 overflow-hidden">
              <Component />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
