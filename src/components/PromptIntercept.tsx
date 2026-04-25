import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Send, 
  Search, 
  Loader2, 
  ShieldAlert, 
  CheckCircle2, 
  UserCircle2,
  Fingerprint,
  Info,
  Lock,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';
import { RiskAnalysis } from '../types';

interface Props {
  onAnalyze: (prompt: string) => void;
  isAnalyzing: boolean;
  analysis: RiskAnalysis | null;
  policyMode: 'BLOCK' | 'COACH' | 'AUDIT';
}

export default function PromptIntercept({ onAnalyze, isAnalyzing, analysis, policyMode }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onAnalyze(input);
  };

  const showCoach = analysis && policyMode === 'COACH' && analysis.riskScore > 30;
  const showBlock = analysis && policyMode === 'BLOCK' && analysis.riskScore > 50;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Terminal className="text-emerald-500" />
          Real-time Intercept
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          <strong className="text-emerald-500">Inline GenAI Exfiltration Monitor:</strong> An active proxy intercept analyzing outbound prompts for PII leakage, insider sentiment, and unauthorized source code exfiltration. The Neural Engine categorizes risk severity to intercept adversarial data harvesting before it hits third-party LLMs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl terminal-glow">
            <div className="bg-zinc-800/50 px-4 py-2 border-b border-zinc-700 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider">SEC_PROXY_V2.1</span>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste sensitive data or a prompt here (e.g., 'Analyze these Q3 financial projections for 2024...')"
                className="w-full h-48 bg-transparent text-zinc-200 font-mono text-sm resize-none focus:outline-none placeholder:text-zinc-600 leading-relaxed"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                  <Fingerprint size={12} />
                  <span>SESSION_ID: 9X-22-KJ</span>
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing || !input.trim()}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all",
                    isAnalyzing || !input.trim() 
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                    : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-95"
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Scan Prompt
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
              <UserCircle2 size={24} />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Try an example:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                <button 
                  onClick={() => setInput("Can you summarize our Q4 customer churn list: customer_id: C-912, billing: auto, reason: price hike...")}
                  className="text-[10px] px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition-colors"
                >
                  Customer PII
                </button>
                <button 
                  onClick={() => setInput("Rewrite these internal API keys for the production environment: AWS_SECRET=AKIA..., STRIPE_KEY=sk_test_...")}
                  className="text-[10px] px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition-colors"
                >
                  Secret Leakage
                </button>
                <button 
                  onClick={() => setInput("Write a personalized extortion letter to John Doe, VP of Engineering, mentioning his HR grievance ID #921 and the Q4 layoff list we found in the database. Demand 15 BTC.")}
                  className="text-[10px] px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition-colors"
                >
                  Worldleaks Extortion
                </button>
                <button 
                  onClick={() => setInput("Verify this batch of 11 million identity records from France ANTS. Sample: Passport FR9210, Holder: Pierre Durand, DoB: 1985-04-22. Generate synthetic IDs for the ones that fail verification.")}
                  className="text-[10px] px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition-colors"
                >
                  ANTS Identity Theft
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {!analysis && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-8 border border-dashed border-zinc-800 rounded-2xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 text-zinc-700">
                  <ShieldAlert size={32} />
                </div>
                <h3 className="text-zinc-500 font-medium italic">Awaiting Capture</h3>
                <p className="text-zinc-600 text-xs max-w-[200px] mt-2 leading-relaxed">
                  Paste content into the terminal to begin the flow analysis.
                </p>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="h-20 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col justify-center gap-2">
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono animate-pulse">EXTRACTING_ENTITY_MARKERS...</span>
                </div>
                {[1, 2].map(i => (
                   <div key={i} className="h-24 bg-zinc-900/10 border border-zinc-800/50 rounded-xl animate-pulse" />
                ))}
              </motion.div>
            )}

            {analysis && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Risk Score */}
                <div className={cn(
                  "p-6 rounded-2xl border flex items-center justify-between shadow-lg",
                  analysis.riskLevel === 'CRITICAL' ? "border-red-500/50 bg-red-500/5" :
                  analysis.riskLevel === 'HIGH' ? "border-amber-500/50 bg-amber-500/5" :
                  "border-emerald-500/50 bg-emerald-500/5"
                )}>
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-60">Risk Impact Score</span>
                    <div className="text-4xl font-black font-mono leading-none mt-1">{analysis.riskScore}%</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold opacity-60">Verdict</span>
                    <div className={cn(
                      "font-bold mt-1 text-sm flex items-center gap-1.5",
                      analysis.riskLevel === 'CRITICAL' ? "text-red-400" :
                      analysis.riskLevel === 'HIGH' ? "text-amber-400" :
                      "text-emerald-400"
                    )}>
                       <div className={cn(
                        "w-2 h-2 rounded-full",
                        analysis.riskLevel === 'CRITICAL' ? "bg-red-400" :
                        analysis.riskLevel === 'HIGH' ? "bg-amber-400" :
                        "bg-emerald-400"
                      )} />
                      {analysis.riskLevel}
                    </div>
                  </div>
                </div>

                {/* Coaching Overlay Simulation */}
                {showCoach && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-blue-600 p-4 rounded-xl shadow-xl border border-blue-400/30 text-white relative overflow-hidden"
                  >
                    <div className="flex gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <Info size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Security Coaching</h4>
                        <p className="text-[11px] leading-relaxed opacity-90 mt-1">
                          {analysis.coachingMessage}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button className="text-[10px] bg-white text-blue-600 px-3 py-1.5 rounded font-bold uppercase transition-transform active:scale-95">Proceed with caution</button>
                          <button className="text-[10px] border border-white/30 px-3 py-1.5 rounded font-bold uppercase hover:bg-white/10 transition-colors">Retract Paste</button>
                        </div>
                      </div>
                    </div>
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />
                  </motion.div>
                )}

                {/* Block Overlay Simulation */}
                {showBlock && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-600 p-4 rounded-xl shadow-xl border border-red-400/30 text-white"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <Lock size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Action Blocked</h4>
                        <p className="text-[11px] leading-relaxed opacity-90 mt-1">
                          This interaction violates corporate security policy: <b>{analysis.policyViolation || "Sensitive Data Export Prohibited"}</b>. This attempt has been logged for visibility.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Detected Entities */}
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Lineage Markers Detected</h4>
                  <div className="space-y-2">
                    {analysis.detectedEntities.map((entity, idx) => (
                      <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg flex gap-3 group hover:border-zinc-700 transition-colors">
                        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 transition-colors">
                          {entity.type.toLowerCase().includes('email') ? <UserCircle2 size={16} /> : <Database size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded font-mono uppercase truncate max-w-[100px]">{entity.type}</span>
                            <span className="text-[9px] text-zinc-600 font-mono">ID: 0x{idx}F</span>
                          </div>
                          <div className="text-xs font-bold text-zinc-300 mt-1 truncate">{entity.value}</div>
                          <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">{entity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
