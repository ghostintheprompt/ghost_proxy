import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Target, 
  Activity, 
  ArrowRight, 
  Cpu,
  Layers,
  ChevronRight,
  Split,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const STRATEGIC_MAPPING = [
  { 
    threat: 'Worldleaks RDP Entry', 
    shield: 'RDP Guard / EPP Kill Monitor', 
    status: 'ACTIVE', 
    coverage: 98,
    color: 'red'
  },
  { 
    threat: 'ANTS Identity Scraping', 
    shield: 'API Sovereignty Rate-Limiting', 
    status: 'ENFORCED', 
    coverage: 92,
    color: 'emerald'
  },
  { 
    threat: 'Shadow SaaS Orphaned Tokens', 
    shield: 'Identity Scrutiny / Session Kill', 
    status: 'MONITORING', 
    coverage: 75,
    color: 'amber'
  }
];

export default function PurpleCommandCenter() {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Split className="text-purple-500" />
          Purple Command Center
        </h2>
        <p className="text-zinc-400 max-w-3xl text-sm leading-relaxed">
          <strong className="text-purple-400">The 2026 Convergence Point.</strong> Real-time mapping of offensive (Red Team) TTPs against our automated (Blue Team) defensive infrastructure. This console correlates adversarial penetration techniques (like AI-driven scraping and RDP exploitation) with our Zero-Trust policies to ensure identity soft-targets are patched and mitigated instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           {/* Active Synthesis Table */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                 <h3 className="text-[10px] uppercase font-black text-zinc-500 tracking-widest flex items-center gap-2">
                    <Activity size={14} className="text-purple-500" />
                    Adversarial vs Defensive Mapping
                 </h3>
                 <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold rounded uppercase">Real-time Correlation</span>
              </div>
              <div className="divide-y divide-zinc-800">
                 {STRATEGIC_MAPPING.map((item, i) => (
                   <div key={i} className="p-6 flex items-center justify-between group hover:bg-zinc-800/30 transition-colors">
                      <div className="flex items-center gap-10">
                         <div className="space-y-1 w-48">
                            <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">Threat Red</div>
                            <div className="text-sm font-bold text-zinc-200">{item.threat}</div>
                         </div>
                         <div className="flex items-center text-zinc-700">
                            <ArrowRight size={16} />
                         </div>
                         <div className="space-y-1">
                            <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">Shield Blue</div>
                            <div className="text-sm font-bold text-emerald-500">{item.shield}</div>
                         </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <div className="text-[10px] font-mono text-zinc-500">{item.coverage}% Covered</div>
                         <div className="h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
                            <div className={cn(
                              "h-full transition-all duration-1000",
                              item.color === 'red' ? "bg-red-500" : item.color === 'emerald' ? "bg-emerald-500" : "bg-amber-500"
                            )} style={{ width: `${item.coverage}%` }} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 border border-red-500/20 p-8 rounded-3xl space-y-4">
                 <div className="flex items-center gap-2">
                    <Target className="text-red-500" size={20} />
                    <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Offensive (Red) Brief</h4>
                 </div>
                 <p className="text-xs text-zinc-500 leading-relaxed">
                   Adversaries are no longer just "hacking"—they are synthesizing. They use AI to cluster exfiltrated data into extortion categories. Our Red models simulate this to find your most sensitive "soft targets" before they do.
                 </p>
                 <div className="text-[10px] text-red-400 font-mono italic">
                    Focus: AI-Accelerated Extortion & SaaS Hijacking
                 </div>
              </div>
              <div className="bg-zinc-900 border border-emerald-500/20 p-8 rounded-3xl space-y-4">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="text-emerald-500" size={20} />
                    <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Defensive (Blue) Brief</h4>
                 </div>
                 <p className="text-xs text-zinc-500 leading-relaxed">
                   Defensive posture relies on **Governance Rules** and **Data Sovereignty**. By locating soft targets in Shadow IT or legacy caches, the blue team can deploy surgical blocks and forced MFA before lateral movement begins.
                 </p>
                 <div className="text-[10px] text-emerald-400 font-mono italic">
                    Focus: Real-time Patching & Sovereignty Enforcement
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           {/* Sidebar: Purple Signals */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-2xl h-full">
              <h3 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Purple Signal Intake</h3>
              <div className="space-y-6">
                 <div className="relative pl-6 border-l border-purple-500/30">
                    <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-purple-500 border-4 border-zinc-900" />
                    <div className="text-[10px] font-mono text-purple-400 mb-1">02s ago</div>
                    <div className="text-xs font-bold text-zinc-200">Worldleaks TTP Drift Detected</div>
                    <p className="text-[10px] text-zinc-500 mt-1 italic">"Adversary using randomized Cloudflare IPs outside predicted range."</p>
                 </div>
                 <div className="relative pl-6 border-l border-purple-500/30">
                    <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-purple-500 border-4 border-zinc-900" />
                    <div className="text-[10px] font-mono text-purple-400 mb-1">14m ago</div>
                    <div className="text-xs font-bold text-zinc-200">ANTS ID-Theft Signature Match</div>
                    <p className="text-[10px] text-zinc-500 mt-1 italic">"Bulk passport query detected on unmonitored API endpoint."</p>
                 </div>
                 <div className="relative pl-6 border-l border-emerald-500/30">
                    <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-emerald-500 border-4 border-zinc-900" />
                    <div className="text-[10px] font-mono text-emerald-400 mb-1">32m ago</div>
                    <div className="text-xs font-bold text-zinc-200">Constraint Rule Deployed</div>
                    <p className="text-[10px] text-zinc-500 mt-1 italic">"Forced MFA on all SaaS service accounts successfully verified."</p>
                 </div>
              </div>

              <div className="pt-6 border-t border-zinc-800">
                 <button className="w-full flex items-center justify-between group p-2 rounded-xl hover:bg-zinc-800/50 transition-all">
                    <div className="flex items-center gap-3">
                       <Eye size={16} className="text-zinc-500" />
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Audit Full Event Log</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-600 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="p-8 bg-purple-600 p-8 rounded-3xl text-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
         <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-zinc-950 text-purple-500 flex items-center justify-center border border-white/20 shrink-0">
               <Zap size={32} />
            </div>
            <div>
               <h3 className="text-xl font-black italic uppercase tracking-tighter">Strategic Dominance</h3>
               <p className="text-sm font-medium opacity-80 max-w-md">
                 "Thinking like the attacker (Red) while building the infrastructure (Blue). This browser-fist security platform is ready for enterprise deployment on macOS and Linux."
               </p>
            </div>
         </div>
         <button className="relative z-10 px-8 py-3 bg-zinc-950 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
            Export Deployment Kit
         </button>
      </div>
    </div>
  );
}
