import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Loader } from "lucide-react";
import type { Translations } from "../translations";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

export default function ContactModal({ isOpen, onClose, t }: ContactModalProps) {
  const [form, setForm] = useState({ company: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setForm({ company: "", email: "", message: "" });
    }, 300);
  };

  const tc = t.contact;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="w-full max-w-md rounded-2xl p-6 relative"
              style={{
                background: "#093C5D",
                border: "1px solid rgba(111, 209, 215, 0.2)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
                pointerEvents: "auto",
              }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[#3B7597] hover:text-[#6FD1D7] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 flex flex-col items-center text-center gap-4"
                >
                  <CheckCircle className="w-14 h-14 text-[#5DF8D8]" />
                  <p className="text-lg font-semibold text-white">{tc.success}</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-white mb-1">{tc.title}</h2>
                  <p className="text-sm text-[#6FD1D7] mb-6">{tc.subtitle}</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#6FD1D7] mb-1.5">
                        {tc.company}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-all"
                        style={{
                          background: "rgba(6, 30, 46, 0.8)",
                          border: "1px solid rgba(111, 209, 215, 0.2)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(93, 248, 216, 0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(111, 209, 215, 0.2)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6FD1D7] mb-1.5">
                        {tc.email}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-all"
                        style={{
                          background: "rgba(6, 30, 46, 0.8)",
                          border: "1px solid rgba(111, 209, 215, 0.2)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(93, 248, 216, 0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(111, 209, 215, 0.2)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6FD1D7] mb-1.5">
                        {tc.message}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-all resize-none"
                        style={{
                          background: "rgba(6, 30, 46, 0.8)",
                          border: "1px solid rgba(111, 209, 215, 0.2)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(93, 248, 216, 0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(111, 209, 215, 0.2)")}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary w-full justify-center mt-1"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          {tc.submitting}
                        </>
                      ) : (
                        tc.submit
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
