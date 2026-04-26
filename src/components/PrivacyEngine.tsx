import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  EyeOff, 
  Database, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  FileSearch, 
  Zap, 
  ChevronRight,
  Target,
  Brain,
  Hash,
  Globe,
  Lock,
  Activity,
  BarChart4
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PrivacyTech {
  id: string;
  name: string;
  category: 'Anonymization' | 'Consent' | 'Storage' | 'Computing';
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  kAnonymity: number;
}

const TECH_STACK: PrivacyTech[] = [
  { id: 't1', name: 'Data Clean Room Validation', category: 'Computing', description: 'Mathematical validation of ad-tech data joining without exposing raw PII.', impact: 'High', kAnonymity: 50 },
  { id: 't2', name: 'Differential Privacy Injector', category: 'Anonymization', description: 'Add localized mathematical noise (Laplace Mechanism) to statistical queries.', impact: 'High', kAnonymity: 100 },
  { id: 't3', name: 'Consent Orchestrator Hub', category: 'Consent', description: 'Synchronize opt-out signals (GPC) across downstream vendors.', impact: 'Medium', kAnonymity: 0 },
  { id: 't4', name: 'Zero-Knowledge Vault', category: 'Storage', description: 'Client-side encryption enforcing host-blind data storage.', impact: 'High', kAnonymity: 0 }
];

export default function PrivacyEngine() {
  const [selectedTech, setSelectedTech] = useState<PrivacyTech | null>(TECH_STACK[0]);
  const [activeSimulation, setActiveSimulation] = useState<boolean>(false);
  const [epsilonValue, setEpsilonValue] = useState<number>(0.5);

  const triggerSimulation = () => {
    setActiveSimulation(true);
    setTimeout(() => setActiveSimulation(false), 3000);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <EyeOff className="text-blue-500" />
            Privacy Engineering Engine
          </h2>
          <p className="text-zinc-400 text-sm font-mono uppercase tracking-tighter">Mathematical Privacy, Clean Rooms, and K-Anonymity</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
           <div className="px-4 py-1.5 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> ENTERPRISE_COMPLIANCE_VERIFIED
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {TECH_STACK.map(tech => (
          <motion.div
            key={tech.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedTech(tech)}
            className={cn(
              "p-5 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 group",
              selectedTech?.id === tech.id ? "bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
            )}
          >
            <div className="flex justify-between items-center">
               <span className="text-[9px] font-black text-blue-500 uppercase font-mono tracking-widest">{tech.category}</span>
               <div className={cn(
                 "w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor]",
                 tech.impact === 'High' ? "bg-emerald-500 text-emerald-500" : "bg-yellow-500 text-yellow-500"
               )} />
            </div>
            <h3 className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{tech.name}</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed italic line-clamp-2">{tech.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
         {/* Detailed View */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            {selectedTech ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Database size={240} />
                 </div>
                 
                 <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                       <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                          {selectedTech.category}
                       </span>
                       <span className="text-zinc-600 font-mono text-[10px]">TECH_ID: {selectedTech.id}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4 uppercase">{selectedTech.name}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl mb-8 font-mono bg-black/40 p-4 rounded-xl border border-zinc-800">
                       {selectedTech.category === 'Computing' ? "Validates cryptographic data overlap without exchanging raw records. Utilizes Private Set Intersection (PSI) to ensure parties only learn the intersection of their datasets." : 
                        selectedTech.category === 'Anonymization' ? "Injects calibrated noise into statistical aggregates. Ensures that the removal or addition of a single record does not significantly alter the query result, thwarting re-identification attacks." :
                        "Enforces global privacy signals (GPC) across the ad-tech pipeline, ensuring compliance with CPRA/GDPR via automated vendor signal mapping."}
                    </p>

                    {selectedTech.kAnonymity > 0 && (
                      <div className="grid grid-cols-2 gap-6 mb-8">
                         <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                               <BarChart4 size={14} className="text-blue-500" /> K-Anonymity Factor
                            </div>
                            <div className="text-4xl font-black text-white italic">{selectedTech.kAnonymity}<span className="text-sm text-zinc-600 not-italic ml-2">Records/Group</span></div>
                         </div>
                         <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl flex flex-col justify-center">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                               <Settings size={14} className="text-purple-500" /> Epsilon (ε) Tuning
                            </div>
                            <div className="flex items-center gap-4">
                               <input 
                                 type="range" 
                                 min="0.1" max="2.0" step="0.1" 
                                 value={epsilonValue}
                                 onChange={(e) => setEpsilonValue(parseFloat(e.target.value))}
                                 className="flex-1 accent-purple-500"
                               />
                               <span className="text-sm font-bold text-purple-400 font-mono w-8 text-right">{epsilonValue}</span>
                            </div>
                            <div className="text-[8px] text-zinc-600 uppercase mt-2">Lower = More Privacy, Less Utility</div>
                         </div>
                      </div>
                    )}

                    <div className="mt-auto">
                       <button 
                         onClick={triggerSimulation}
                         disabled={activeSimulation}
                         className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 w-fit shadow-lg shadow-blue-600/20 disabled:opacity-50"
                       >
                          {activeSimulation ? <Activity size={16} className="animate-spin" /> : <Zap size={16} />}
                          {activeSimulation ? 'CALCULATING_NOISE_VECTORS...' : 'RUN_MATHEMATICAL_VALIDATION'}
                       </button>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="h-full bg-zinc-900 border border-zinc-800 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 opacity-30 text-center">
                 <EyeOff size={80} className="text-zinc-700 mb-6" />
                 <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Select Privacy Primitive</h3>
                 <p className="text-zinc-500 text-sm max-w-sm italic">Audit and deploy mathematical privacy-preserving technologies.</p>
              </div>
            )}
         </div>

         {/* Sidebar Simulation Info */}
         <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Brain size={160} className="text-blue-500" />
            </div>
            <div className="relative z-10 flex-1 flex flex-col">
               <h3 className="text-[11px] font-black text-zinc-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-400" />
                  Neural Pipeline Audit
               </h3>

               <div className="space-y-4">
                  <div className="bg-zinc-900/80 p-5 rounded-xl border border-zinc-800">
                     <div className="flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">
                        <Globe size={12} /> Data Residency
                     </div>
                     <p className="text-[11px] text-zinc-300 leading-relaxed font-mono">
                        Validating origin constraint: <span className="text-white font-bold">EU_WEST_1</span>. Automated redirection of raw PII to local isolated vaults confirmed.
                     </p>
                  </div>

                  <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/20">
                     <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">
                        <Hash size={12} /> Cryptographic Hash Check
                     </div>
                     <p className="text-[11px] text-blue-100/80 leading-relaxed italic">
                        "Marketing pipeline uses SHA-256 for record matching. Automatically enforced upgrade to SHA-3 with per-tenant salting to prevent dictionary re-identification."
                     </p>
                  </div>
               </div>

               <div className="mt-auto pt-6 border-t border-zinc-800">
                  <h4 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-4">Real-Time Engine Status</h4>
                  <div className="flex flex-col gap-4">
                     <div>
                        <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest mb-1.5">
                           <span className="text-zinc-400">Differential Noise</span>
                           <span className="text-blue-500 font-mono">ε={epsilonValue}</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                           <motion.div 
                             animate={{ width: \`\${Math.max(10, (2.1 - epsilonValue) * 50)}%\` }} 
                             className="h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" 
                           />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest mb-1.5">
                           <span className="text-zinc-400">Global Opt-Out (GPC)</span>
                           <span className="text-emerald-500">Synced</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                           <div className="w-[100%] h-full bg-emerald-500" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
