import React from 'react';
import { 
  Layers, 
  History, 
  AlertTriangle, 
  Users, 
  Unlink, 
  Link, 
  Database,
  BarChart3,
  TrendingDown,
  TrendingUp,
  Usb,
  Cpu,
  BrainCircuit
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';

const LEGACY_STACK = [
  { name: 'Exxon-Legacy-ERP', status: 'FRAGILE', age: '22yrs', risk: 'HIGH' },
  { name: 'Merger-A-AD-Forest', status: 'STITCHED', age: '14yrs', risk: 'MEDIUM' },
  { name: 'Site-Delta-SCADA', status: 'LEGACY', age: '28yrs', risk: 'CRITICAL' },
  { name: 'Modern-Cloud-SaaS', status: 'NATIVE', age: '2yrs', risk: 'LOW' }
];

const EXFIL_COMPARISON = [
  { month: 'Jan', usb: 45, ai_prompt: 12 },
  { month: 'Feb', usb: 42, ai_prompt: 28 },
  { month: 'Mar', usb: 38, ai_prompt: 65 },
  { month: 'Apr', usb: 35, ai_prompt: 112 },
  { month: 'May', usb: 30, ai_prompt: 198 },
  { month: 'Jun', usb: 28, ai_prompt: 310 },
];

const INSIDER_RISK_FLOW = [
  { factor: 'Performance Review', weight: 85, impact: 'HIGH' },
  { factor: 'Access Frequency', weight: 45, impact: 'MEDIUM' },
  { factor: 'Off-hours Activity', weight: 92, impact: 'CRITICAL' },
  { factor: 'Sentiment Drift', weight: 68, impact: 'HIGH' }
];

export default function LegacyAudit() {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Layers className="text-emerald-500" />
          Legacy & Insider Modeling
        </h2>
        <p className="text-zinc-400 max-w-3xl text-sm leading-relaxed">
          The "Conglomerate Reality" dashboard. Mapping legacy infrastructure weak spots and shifting focus from external weather to internal behavioral drift.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Legacy Tool Stack */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
              <History size={16} className="text-amber-500" />
              Conglomerate Stack
            </h3>
            <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-1 rounded">AUDIT_V4</span>
          </div>

          <div className="space-y-3">
             {LEGACY_STACK.map((item, i) => (
               <div key={i} className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-zinc-700 transition-all">
                  <div className="min-w-0 flex-1">
                     <div className="text-xs font-bold text-zinc-200 truncate">{item.name}</div>
                     <div className="flex gap-2 mt-1">
                        <span className="text-[9px] text-zinc-500 uppercase font-mono">{item.age}</span>
                        <span className="text-[9px] text-zinc-500 uppercase font-mono">/</span>
                        <span className={cn(
                          "text-[9px] font-bold uppercase",
                          item.status === 'FRAGILE' ? "text-amber-500" : 
                          item.status === 'STITCHED' ? "text-blue-500" :
                          item.status === 'LEGACY' ? "text-red-500" : "text-emerald-500"
                        )}>{item.status}</span>
                     </div>
                  </div>
                  <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded uppercase",
                    item.risk === 'CRITICAL' ? "bg-red-500/10 text-red-500" :
                    item.risk === 'HIGH' ? "bg-amber-500/10 text-amber-500" : "bg-zinc-800 text-zinc-400"
                  )}>
                    {item.risk}
                  </div>
               </div>
             ))}
          </div>

          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
             <div className="flex gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0" />
                <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                  "Nobody should work like this... we're a 100-year-old conglomerate stitched together by hope and legacy configs."
                </p>
             </div>
          </div>
        </div>

        {/* Exfiltration Path Analysis */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
              <Unlink size={16} className="text-red-500" />
              Exfiltration Evolution Index
            </h3>
            <div className="flex items-center gap-4 text-[10px] uppercase font-bold">
               <span className="flex items-center gap-1.5 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-400" /> USB Drives</span>
               <span className="flex items-center gap-1.5 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400" /> AI Prompts</span>
            </div>
          </div>

          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EXFIL_COMPARISON}>
                <defs>
                  <linearGradient id="colorUsb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="usb" stroke="#60a5fa" fillOpacity={1} fill="url(#colorUsb)" strokeWidth={2} />
                <Area type="monotone" dataKey="ai_prompt" stroke="#10b981" fillOpacity={1} fill="url(#colorAi)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
             <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800">
                <Usb size={20} className="text-blue-500 shrink-0" />
                <div>
                   <h4 className="text-xs font-bold text-zinc-300">USB Physical Leak</h4>
                   <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">Known threat model. Well-understood and mostly mitigated by EDR/DLP physical blocking.</p>
                </div>
             </div>
             <div className="flex gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <BrainCircuit size={20} className="text-emerald-500 shrink-0" />
                <div>
                   <h4 className="text-xs font-bold text-zinc-300">AI "Productivity" Leak</h4>
                   <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed text-emerald-400/80 font-medium">Underappreciated path. Data behaves like a "productivity action" disguised as a task.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Insider Risk Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8 shadow-2xl">
        <div className="flex justify-between items-end">
           <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Users size={22} className="text-emerald-500" />
                Behavioral "Insider" Drift Model
              </h3>
              <p className="text-sm text-zinc-500">Integrating "HR Sentiment" to detect high-risk lifecycle moments.</p>
           </div>
           <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Sentinel Graph Sync</span>
              <div className="flex items-center gap-2 mt-1 text-emerald-500">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold">CONNECTED</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {INSIDER_RISK_FLOW.map((f, i) => (
             <div key={i} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                   <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center">
                      <BarChart3 size={20} className="text-zinc-500" />
                   </div>
                   <span className={cn(
                     "text-[10px] font-bold px-2 py-1 rounded inline-block",
                     f.impact === 'CRITICAL' ? "bg-red-500/20 text-red-400" :
                     f.impact === 'HIGH' ? "bg-amber-500/20 text-amber-500" : "bg-blue-500/20 text-blue-400"
                   )}>{f.impact}</span>
                </div>
                <div>
                   <div className="text-xs font-bold text-zinc-300">{f.factor}</div>
                   <div className="h-1.5 w-full bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full",
                        f.weight > 80 ? "bg-red-500" : f.weight > 60 ? "bg-amber-500" : "bg-emerald-500"
                      )} style={{ width: `${f.weight}%` }} />
                   </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                   <span className="text-[10px] text-zinc-600 uppercase font-bold">Risk Weight</span>
                   <span className="text-sm font-mono text-zinc-400 font-bold">{f.weight}%</span>
                </div>
             </div>
           ))}
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center relative">
                 <div className="text-xl font-black text-zinc-100">82</div>
                 <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-950" />
              </div>
              <div>
                 <h4 className="font-bold text-zinc-200">Organization Health Score</h4>
                 <p className="text-xs text-zinc-500 mt-1 max-w-md">Aggregated risk across all legacy and native integrations. 12 detected "High Friction" points corrected this month.</p>
              </div>
           </div>
           <button className="px-8 py-3 bg-zinc-100 text-zinc-950 font-bold rounded-2xl transition-all hover:bg-white active:scale-95 shadow-lg shadow-white/5">
             RUN DELTA RECONCILIATION
           </button>
        </div>
      </div>
    </div>
  );
}
