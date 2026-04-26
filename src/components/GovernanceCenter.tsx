import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  Users, 
  BarChart, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Zap,
  Fingerprint,
  HardDrive,
  Lock,
  Eye,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Policy {
  id: string;
  name: string;
  category: 'Classification' | 'Access' | 'Retention' | 'Compliance';
  status: 'Active' | 'Draft' | 'Review';
  compliance: number;
}

const INITIAL_POLICIES: Policy[] = [
  { id: 'pol-1', name: 'Data Classification Standard', category: 'Classification', status: 'Active', compliance: 92 },
  { id: 'pol-2', name: 'Just-In-Time (JIT) Admin Access', category: 'Access', status: 'Active', compliance: 85 },
  { id: 'pol-3', name: 'Shadow IT Data Export Rule', category: 'Retention', status: 'Review', compliance: 64 },
  { id: 'pol-4', name: 'SOC 2 Trust Principles', category: 'Compliance', status: 'Active', compliance: 100 }
];

export default function GovernanceRiskCompliance() {
  const [policies, setPolicies] = useState<Policy[]>(INITIAL_POLICIES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <ShieldCheck className="text-emerald-500" />
            GRC Command Center
          </h2>
          <p className="text-zinc-400 text-sm">Governance, Risk, and Compliance Orchestration.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Compliance</span>
              <span className="text-sm font-black text-emerald-500">88.4%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {['Classification', 'Access', 'Retention', 'Compliance'].map(cat => (
           <motion.div 
             key={cat}
             whileHover={{ y: -5 }}
             onClick={() => setSelectedCategory(cat)}
             className={cn(
               "p-6 rounded-xl border cursor-pointer transition-all",
               selectedCategory === cat ? "bg-emerald-500/10 border-emerald-500" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
             )}
           >
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{cat}</h3>
                 {cat === 'Classification' && <Fingerprint size={16} className="text-blue-400" />}
                 {cat === 'Access' && <Lock size={16} className="text-purple-400" />}
                 {cat === 'Retention' && <Clock size={16} className="text-orange-400" />}
                 {cat === 'Compliance' && <ShieldAlert size={16} className="text-emerald-400" />}
              </div>
              <div className="text-2xl font-black text-white mb-1">
                 {policies.filter(p => p.category === cat).length}
              </div>
              <p className="text-[10px] text-zinc-500 uppercase font-bold">Managed Policies</p>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
         <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-black/20 flex items-center justify-between">
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={12} /> Active Policy Enforcement
               </span>
               <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-[10px] font-bold transition-all">
                  GENERATE_REPORT
               </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {policies
                .filter(p => !selectedCategory || p.category === selectedCategory)
                .map(policy => (
                  <div key={policy.id} className="p-4 border-b border-zinc-800 hover:bg-zinc-800/30 transition-all group">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                           <span className={cn(
                             "text-[9px] font-bold px-1.5 py-0.5 rounded",
                             policy.status === 'Active' ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-500"
                           )}>{policy.status}</span>
                           <h4 className="text-sm font-bold text-zinc-100">{policy.name}</h4>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right">
                              <div className="text-[10px] font-black text-white">{policy.compliance}%</div>
                              <div className="text-[8px] text-zinc-500 uppercase">Compliance</div>
                           </div>
                           <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                              <Settings size={14} />
                           </button>
                        </div>
                     </div>
                     <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${policy.compliance}%` }}
                          className={cn(
                            "h-full",
                            policy.compliance > 90 ? "bg-emerald-500" :
                            policy.compliance > 70 ? "bg-yellow-500" : "bg-red-500"
                          )}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <AlertCircle size={120} />
            </div>
            <div className="relative z-10">
               <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <BarChart size={16} className="text-red-500" />
                  Real-time Risk Audit
               </h3>

               <div className="space-y-6">
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-red-400 uppercase">Critical Discovery</span>
                        <span className="text-[10px] text-zinc-600 font-mono">INC-9921</span>
                     </div>
                     <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                        A database dump containing <span className="text-white font-bold">customer_pii</span> was detected in a public repository.
                     </p>
                     <button className="w-full py-2 bg-red-600 text-white rounded text-[10px] font-bold uppercase hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                        <ShieldAlert size={12} /> INITIATE_CLASSIFICATION_SCAN
                     </button>
                  </div>

                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Governance Opportunity</span>
                     </div>
                     <p className="text-xs text-zinc-400 leading-relaxed italic">
                        "Support team is exporting records to Google Sheets. Recommend implementing Data Minimization rules at the proxy layer."
                     </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-zinc-800">
                     <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Just-In-Time Access Request</h4>
                     <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">SRE</div>
                           <div>
                              <div className="text-[10px] font-bold text-zinc-100">Elevated Admin (Prod)</div>
                              <div className="text-[8px] text-zinc-600">Expires in 59:52</div>
                           </div>
                        </div>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
