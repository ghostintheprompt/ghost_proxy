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
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PrivacyTech {
  id: string;
  name: string;
  category: 'Anonymization' | 'Consent' | 'Storage' | 'Computing';
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

const TECH_STACK: PrivacyTech[] = [
  { id: 't1', name: 'Data Clean Room', category: 'Computing', description: 'Measure ad effectiveness without raw PII exchange.', impact: 'High' },
  { id: 't2', name: 'Differential Privacy', category: 'Anonymization', description: 'Add mathematical noise to preserve individual privacy.', impact: 'High' },
  { id: 't3', name: 'Consent Orchestrator', category: 'Consent', description: 'Global opt-out sync across ad-tech platforms.', impact: 'Medium' },
  { id: 't4', name: 'Zero-Knowledge Storage', category: 'Storage', description: 'Encrypt data so even the host cannot see it.', impact: 'High' }
];

export default function PrivacyEngineer() {
  const [selectedTech, setSelectedTech] = useState<PrivacyTech | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <EyeOff className="text-blue-400" />
            Privacy Engineering Lab
          </h2>
          <p className="text-zinc-400 text-sm">Building privacy-by-design systems and clean rooms.</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
           <div className="px-4 py-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={12} /> Privacy_Score: 9.8/10
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
              selectedTech?.id === tech.id ? "bg-blue-500/10 border-blue-500 shadow-xl" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
            )}
          >
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-black text-blue-500 uppercase font-mono">{tech.category}</span>
               <div className={cn(
                 "w-1.5 h-1.5 rounded-full",
                 tech.impact === 'High' ? "bg-emerald-500" : "bg-yellow-500"
               )} />
            </div>
            <h3 className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">{tech.name}</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed italic line-clamp-2">{tech.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
         <div className="lg:col-span-2 flex flex-col gap-6">
            {selectedTech ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Database size={160} />
                 </div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                       <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Operational_Tech
                       </span>
                       <span className="text-zinc-600 font-mono text-xs">{selectedTech.id}</span>
                    </div>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter mb-4">{selectedTech.name}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-8">
                       {selectedTech.category === 'Computing' ? "This clean room allows for secure multi-party computation. Raw PII never leaves the originating boundary, but aggregate insights can be derived mathematically." : 
                        selectedTech.category === 'Anonymization' ? "Differential privacy adds strategic noise to datasets, ensuring that no individual record can be identified while maintaining the statistical integrity of the group." :
                        "Implementing this privacy primitive ensures compliance with GDPR and CPRA while maintaining user-level utility for engineering teams."}
                    </p>

                    <div className="grid grid-cols-2 gap-8 py-8 border-t border-zinc-800/50">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                             <FileSearch size={14} /> Compliance Review
                          </h4>
                          <ul className="text-xs text-zinc-300 space-y-2">
                             <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                Purpose Limitation: Campaign Effectiveness Only
                             </li>
                             <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                Data Minimization: Aggregated Outputs
                             </li>
                          </ul>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                             <Lock size={14} /> Encryption Guardrails
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed italic">
                             "Hashed emails are not anonymized data. Must use Salted HMAC with key rotation."
                          </p>
                       </div>
                    </div>

                    <button 
                      onClick={() => setActiveSimulation(true)}
                      className="mt-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 w-fit"
                    >
                       <Zap size={16} /> Load_Simulation_Environment
                    </button>
                 </div>
              </div>
            ) : (
              <div className="h-full bg-zinc-900 border border-zinc-800 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 opacity-30 text-center">
                 <EyeOff size={64} className="text-zinc-700 mb-6" />
                 <h3 className="text-2xl font-black text-white italic uppercase mb-2">Select Privacy Primitive</h3>
                 <p className="text-zinc-500 text-sm max-w-xs">Audit and deploy privacy-preserving technologies across the Ghost Proxy network.</p>
              </div>
            )}
         </div>

         <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Brain size={120} className="text-blue-500" />
            </div>
            <div className="relative z-10">
               <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-400" />
                  Neural Privacy Audit
               </h3>

               <div className="space-y-6">
                  <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase mb-3">
                        <Globe size={12} /> Regional Guardrail
                     </div>
                     <p className="text-xs text-zinc-300 leading-relaxed">
                        Data residency check for <span className="text-white font-bold">EU_WEST_1</span>. Automated redirection of raw PII to local isolated vaults initiated.
                     </p>
                  </div>

                  <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/20">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-blue-300 uppercase mb-3">
                        <Hash size={12} /> Hashing Standard
                     </div>
                     <p className="text-xs text-blue-100 leading-relaxed italic">
                        "Marketing uses SHA-256 for email matching. Recommend upgrading to SHA-3 with per-tenant salting to prevent re-identification attacks."
                     </p>
                  </div>

                  <div className="mt-8">
                     <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Privacy Pipeline Status</h4>
                     <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono">
                           <span className="text-zinc-400">Anonymization</span>
                           <span className="text-emerald-500">Active</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                           <div className="w-[100%] h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                        </div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono mt-2">
                           <span className="text-zinc-400">Consent Sync</span>
                           <span className="text-yellow-500">Processing</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                           <div className="w-[65%] h-full bg-yellow-500" />
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
