import React from 'react';
import { 
  Network, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Server, 
  CloudOff, 
  AlertTriangle,
  ArrowRight,
  Database,
  Lock,
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const GLOBAL_NODES = [
  { region: 'NA-East', load: '65%', status: 'LOCALIZED', compliance: 'SOC2' },
  { region: 'EU-West', load: '42%', status: 'LOCALIZED', compliance: 'GDPR' },
  { region: 'APAC-South', load: '88%', status: 'LEAKING', compliance: 'PENDING' },
  { region: 'LATAM-Central', load: '12%', status: 'LOCALIZED', compliance: 'LOCAL' },
];

const SAAS_RISK_DISTRIBUTION = [
  { name: 'Core ERP', internal: 85, cloud: 15 },
  { name: 'HR / PII', internal: 92, cloud: 8 },
  { name: 'R&D IP', internal: 78, cloud: 22 },
  { name: 'Public Comms', internal: 10, cloud: 90 },
];

export default function DataSovereignty() {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Network className="text-emerald-500" />
          Decentralized Sovereignty
        </h2>
        <p className="text-zinc-400 max-w-3xl text-sm leading-relaxed">
          Countering global SaaS sprawl by decentralizing core assets. Monitoring cross-border data flows and enforcing local governance to prevent trusting "every provider with all your data."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {GLOBAL_NODES.map((node, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg hover:border-zinc-700 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                <MapPin size={20} className={node.status === 'LEAKING' ? "text-red-500" : "text-emerald-500"} />
              </div>
              <div className={cn(
                "text-[9px] font-bold px-2 py-1 rounded uppercase",
                node.status === 'LEAKING' ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
              )}>
                {node.status}
              </div>
            </div>
            <h4 className="text-sm font-bold text-zinc-100">{node.region}</h4>
            <div className="flex justify-between items-end mt-4">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Node Load</span>
                <div className="text-lg font-mono font-bold text-zinc-300">{node.load}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Protocol</span>
                <div className="text-[10px] font-bold text-zinc-400">{node.compliance}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Localization vs Cloud Gravity */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
           <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                <CloudOff size={16} className="text-amber-500" />
                SaaS Gravity Decomposition
              </h3>
              <span className="text-[10px] text-zinc-500">Local vs Provider Control</span>
           </div>
           
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SAAS_RISK_DISTRIBUTION} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                  <Bar dataKey="internal" stackId="a" fill="#10b981" radius={[4, 0, 0, 4]} />
                  <Bar dataKey="cloud" stackId="a" fill="#3f3f46" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-emerald-500" />
                 <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Local Sovereign Vault</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-zinc-700" />
                 <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">External SaaS Storage</span>
              </div>
           </div>
        </div>

        {/* Global Extraction Alerts */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-2xl">
           <div className="flex justify-between items-start">
              <div>
                 <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                   <AlertTriangle size={18} className="text-red-500" />
                   Anomalous Extraction Detection
                 </h3>
                 <p className="text-[11px] text-zinc-500 mt-1">Cross-domain movement detected in non-standard GEOs.</p>
              </div>
              <Zap size={20} className="text-amber-500 animate-pulse" />
           </div>

           <div className="space-y-4">
              <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div>
                       <div className="text-xs font-bold text-zinc-200">BULK_EXPORT_ALERT</div>
                       <div className="text-[10px] text-zinc-500">Target: Salesforce EU ➔ Unidentified HK Region</div>
                    </div>
                 </div>
                 <span className="text-[10px] font-mono text-zinc-600">0.2s ago</span>
              </div>
              <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div>
                       <div className="text-xs font-bold text-zinc-200">RESIDENCY_VIOLATION</div>
                       <div className="text-[10px] text-zinc-500">PII Data entering non-localized SaaS node</div>
                    </div>
                 </div>
                 <span className="text-[10px] font-mono text-zinc-600">12m ago</span>
              </div>
           </div>

           <div className="pt-4 border-t border-zinc-800">
              <button className="w-full flex items-center justify-between group">
                 <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-100 transition-colors uppercase tracking-widest">Enforce Data Locality Policy</span>
                 <ChevronRight size={16} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
         <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Lock size={32} className="text-emerald-500" />
         </div>
         <div className="max-w-px-2xl space-y-2">
            <h3 className="text-xl font-bold text-zinc-100 italic">"Trusting every provider can be a fatal architectural choice."</h3>
            <p className="text-sm text-zinc-500 px-12 leading-relaxed">
              Decentralize your most sensitive IP into localized sinks. We help you monitor SaaS movement and flag extractions before they cross sovereign boundaries.
            </p>
         </div>
         <div className="flex gap-4">
            <button className="px-6 py-2 bg-emerald-500 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors">Setup Local Vault</button>
            <button className="px-6 py-2 border border-zinc-700 text-zinc-300 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors">Risk Report</button>
         </div>
      </div>
    </div>
  );
}
