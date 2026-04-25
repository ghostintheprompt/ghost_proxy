import React from 'react';
import { BarChart3, PieChart, ShieldAlert, AlertCircle, CheckCircle2, TrendingUp, Search } from 'lucide-react';
import { ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Tooltip } from 'recharts';
import { RiskAnalysis } from '../types';
import { cn } from '../lib/utils';

interface Props {
  analysis: RiskAnalysis | null;
}

export default function RiskAnalysisPanel({ analysis }: Props) {
  if (!analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
        <BarChart3 className="w-12 h-12 text-zinc-800 mb-4" />
        <h3 className="text-xl font-bold text-zinc-200">Analytics Engine Offline</h3>
        <p className="text-zinc-500 max-w-sm mt-2 text-sm leading-relaxed">
          Risk scoring and behavioral analytics are generated post-intercept. Run an analysis to see the data.
        </p>
      </div>
    );
  }

  const pieData = [
    { name: 'Risk', value: analysis.riskScore },
    { name: 'Safety', value: 100 - analysis.riskScore }
  ];

  const pieColors = analysis.riskLevel === 'CRITICAL' || analysis.riskLevel === 'HIGH' 
    ? ['#ef4444', '#18181b'] 
    : ['#10b981', '#18181b'];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <BarChart3 className="text-emerald-500" />
          Risk Scorecard
        </h2>
        <p className="text-zinc-400 text-sm">
          Detailed breakdown of policy compliance and data sensitivity scoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Main Score Widget */}
        <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between h-[340px]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Composite Risk</span>
              <ShieldAlert className={cn(
                "w-5 h-5",
                analysis.riskLevel === 'CRITICAL' ? "text-red-500" : "text-emerald-500"
              )} />
            </div>
            
            <div className="relative w-40 h-40 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RPieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                </RPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-mono leading-none">{analysis.riskScore}%</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase mt-1">DANGER</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 mt-auto">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-amber-500" />
              <span className="text-xs text-zinc-400 font-medium">Confidence Interval: 94.2%</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Search size={16} />
            Diagnostic Report
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Sovereignty Compliance Index</label>
                  <span className="text-xs font-bold text-zinc-300">BORDER_VIOLATION</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[91%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Latent Encryption Activity</label>
                  <span className="text-xs font-bold text-zinc-300">HIGH</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[72%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Hash Integrity (Tamper Flags)</label>
                  <span className="text-xs font-bold text-zinc-300">FAIL</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[100%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Corporate IP Fingerprinting</label>
                  <span className="text-xs font-bold text-zinc-300">CRITICAL</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[95%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Exfiltration Gravity</label>
                  <span className="text-xs font-bold text-zinc-300">AI PROMPT</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[88%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Productivity Friction</label>
                  <span className="text-xs font-bold text-zinc-300">LOW</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[15%]" />
                </div>
              </div>
            </div>

            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800/80 space-y-4">
              <h4 className="text-[10px] uppercase font-bold text-zinc-500">DLP Hero Opportunity</h4>
              
              <div className="flex gap-3">
                 <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                 <p className="text-xs text-zinc-400 leading-relaxed italic">
                   "Intercepted a 'productivity action' disguised as a task. User attempted to paste sensitive merger data into Copilot. Coaching message sent, friction minimized."
                 </p>
              </div>

              <div className="flex gap-3 pt-2">
                 <AlertCircle size={16} className="text-amber-500 shrink-0" />
                 <p className="text-xs text-zinc-400 leading-relaxed italic">
                   "Identity drift detected: User has 'Rough Relationship' flag from internal HR sentiment sync. Scrutiny elevated to 1.5x."
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Mockup */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-800/20">
          <h3 className="text-sm font-bold text-zinc-300 uppercase letter-spacing-wider">Recent Trace Events</h3>
          <span className="text-[10px] font-mono text-zinc-500 px-2 py-1 bg-zinc-900 rounded">LIVE_FEED_ENABLED</span>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {analysis.dataLineage.map((item, i) => (
             <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/20 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-mono text-[10px]">L{i}</div>
                   <div>
                     <div className="text-xs font-bold text-zinc-300">EXPORT_EVENT</div>
                     <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.source} ➔ {item.destination}</div>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-bold text-emerald-500 uppercase">Intercepted</div>
                   <div className="text-[9px] text-zinc-600 font-mono">2024-03-12 14:22:0{i}</div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
