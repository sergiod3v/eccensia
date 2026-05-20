import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Loader, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { GoogleGenAI } from "@google/genai";
import type { Translations } from "../translations";

interface Props {
  t: Translations;
}

export default function EfficiencyCalculator({ t }: Props) {
  const [process, setProcess] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tc = t.calculator;

  const handleGenerate = async () => {
    if (!process.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError("VITE_GEMINI_API_KEY not set. Add it to your .env file.");
      setLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `${tc.systemPrompt}\n\n---\n\nBusiness Process Description:\n${process}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      setResult(response.text ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="section-pad grid-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4"
            style={{ background: "rgba(93, 248, 216, 0.1)", border: "1px solid rgba(93, 248, 216, 0.2)", color: "#5DF8D8" }}>
            <Zap className="w-3 h-3" />
            AI-Powered
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{tc.title}</h2>
          <p className="text-[#6FD1D7] text-lg max-w-2xl mx-auto">{tc.subtitle}</p>
        </div>

        {/* Input area */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: "#093C5D",
            border: "1px solid rgba(111, 209, 215, 0.15)",
          }}
        >
          <textarea
            value={process}
            onChange={(e) => setProcess(e.target.value)}
            placeholder={tc.placeholder}
            rows={6}
            className="w-full bg-transparent text-white placeholder-[#3B7597] text-sm leading-relaxed outline-none resize-none font-[Inter]"
          />
          <div className="flex items-center justify-between mt-4 pt-4"
            style={{ borderTop: "1px solid rgba(111, 209, 215, 0.1)" }}>
            <span className="text-xs text-[#3B7597]">{process.length} chars</span>
            <button
              onClick={handleGenerate}
              disabled={loading || !process.trim()}
              className="btn-primary text-sm py-2.5 px-6 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {tc.loading}
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  {tc.button}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 p-4 rounded-xl mb-6"
              style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)" }}
            >
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-sm text-red-300 font-mono">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-6"
              style={{
                background: "#093C5D",
                border: "1px solid rgba(93, 248, 216, 0.2)",
                boxShadow: "0 0 40px rgba(93, 248, 216, 0.05)",
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 mb-6 pb-4"
                style={{ borderBottom: "1px solid rgba(111, 209, 215, 0.12)" }}>
                <div className="w-2 h-2 rounded-full bg-[#5DF8D8]" />
                <span className="text-xs font-bold text-[#5DF8D8] uppercase tracking-widest">
                  Eccensia Audit Report
                </span>
              </div>

              {/* Markdown output */}
              <div className="prose prose-invert prose-sm max-w-none
                [&_h2]:text-[#5DF8D8] [&_h2]:font-bold [&_h2]:text-base [&_h2]:mt-5 [&_h2]:mb-2
                [&_h3]:text-[#6FD1D7] [&_h3]:font-semibold [&_h3]:text-sm [&_h3]:mt-4 [&_h3]:mb-1
                [&_p]:text-[#b8dde4] [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3
                [&_ul]:text-[#b8dde4] [&_ul]:text-sm [&_ul]:pl-4 [&_ul]:space-y-1
                [&_li]:marker:text-[#5DF8D8]
                [&_strong]:text-white [&_strong]:font-semibold
                [&_hr]:border-[#3B7597]/30 [&_hr]:my-4
                [&_code]:text-[#5DF8D8] [&_code]:font-mono [&_code]:text-xs [&_code]:bg-[#061e2e]/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
              ">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
