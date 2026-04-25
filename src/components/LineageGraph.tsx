import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ArrowRight, Globe, Database, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { RiskAnalysis } from '../types';

interface Props {
  analysis: RiskAnalysis | null;
}

export default function LineageGraph({ analysis }: Props) {
  if (!analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
        <Database className="w-12 h-12 text-zinc-800 mb-4" />
        <h3 className="text-xl font-bold text-zinc-200">No Lineage Map Available</h3>
        <p className="text-zinc-500 max-w-sm mt-2 text-sm leading-relaxed">
          Run an intercept analysis to visualize how your data fragments propagate across providers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Globe className="text-emerald-500" />
            Data Lineage Propagation
          </h2>
          <p className="text-zinc-400 text-sm">
            Mapping sensitive tokens from source systems to AI model providers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Visual Map */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Enterprise Source</span>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Model Endpoint</span>
          </div>

          <div className="flex-1 flex flex-col justify-around relative">
            {analysis.dataLineage.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-48 bg-zinc-800/80 p-3 rounded-lg border border-zinc-700 flex flex-col gap-1 z-10">
                  <span className="text-[9px] text-emerald-500 font-bold uppercase">{item.sensitivity}</span>
                  <span className="text-xs font-medium text-zinc-200 truncate">{item.source}</span>
                </div>
                
                <div className="flex-1 relative h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/10 to-transparent">
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full blur-[2px]"
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: idx * 0.2 }}
                  />
                </div>

                <div className="w-48 bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex flex-col gap-1 z-10 text-right group-hover:border-zinc-700 transition-colors">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase">Provider</span>
                  <span className="text-xs font-medium text-zinc-300 truncate">{item.destination}</span>
                </div>
              </motion.div>
            ))}

            {/* Background connection lines logic simulated with opacity */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
               {Array.from({ length: 5 }).map((_, i) => (
                 <div key={i} className="absolute h-px w-full bg-zinc-300" style={{ top: `${20 * i}%`, opacity: 0.1 }} />
               ))}
            </div>
          </div>
        </div>

        {/* Sensitivity Stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
            <Building2 size={16} />
            Data Exposure Risk
          </h3>
          
          <div className="space-y-4">
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis.dataLineage.map(l => ({ name: l.source.split(' ')[0], value: 100 }))}>
                  <XAxis dataKey="name" fontSize={10} hide />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {analysis.dataLineage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.sensitivity === 'CRITICAL' ? '#ef4444' : '#10b981'} />
                    ))}
                  </Bar>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', fontSize: '12px' }}
                    itemStyle={{ color: '#d4d4d8' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Total Tokens</span>
                <span className="font-mono text-zinc-300 font-bold">12,402</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Sensitive Markers</span>
                <span className="font-mono text-emerald-400 font-bold">{analysis.detectedEntities.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Endpoint Trust</span>
                <span className="font-mono text-amber-500 font-bold text-[10px]">VERIFY_FAIL</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
               <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                 "Lineage visibility follows data from Enterprise Vaults through Proxy Intercept to Shared LLM Context Windows."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
