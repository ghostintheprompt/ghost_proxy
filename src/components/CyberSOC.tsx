import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  Search, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Activity,
  Server,
  Database,
  Globe,
  Lock,
  Eye,
  Settings,
  Terminal,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Alert {
  id: string;
  timestamp: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  source: string;
  status: 'Open' | 'Triaged' | 'Resolved';
  description: string;
  remediation: string;
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: 'a1',
    timestamp: Date.now() - 120000,
    severity: 'Critical',
    title: 'LSASS Memory Dump Detected',
    source: 'Endpoint: SRV-PROD-01',
    status: 'Open',
    description: 'Suspicious process attempted to read LSASS memory, possibly to harvest credentials.',
    remediation: 'Isolate host, reset credentials, and investigate source process.'
  },
  {
    id: 'a2',
    timestamp: Date.now() - 300000,
    severity: 'High',
    title: 'Unauthorized S3 Bucket Modification',
    source: 'AWS: S3-GHOST-PROD',
    status: 'Open',
    description: 'Public access block was disabled for a sensitive backup bucket.',
    remediation: 'Re-enable Public Access Block and audit IAM permissions.'
  },
  {
    id: 'a3',
    timestamp: Date.now() - 600000,
    severity: 'Medium',
    title: 'Potential SQL Injection Attempt',
    source: 'WAF: Edge-Gateway-01',
    status: 'Triaged',
    description: 'Multiple requests with SQL syntax detected targeting /api/v1/search.',
    remediation: 'Review application code for proper query parameterization.'
  }
];

export default function CyberSOC() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [isHardening, setIsHardening] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const handleTriage = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Triaged' } : a));
    if (selectedAlert?.id === id) setSelectedAlert(prev => prev ? { ...prev, status: 'Triaged' } : null);
  };

  const handleResolve = (id: string) => {
    setIsHardening(true);
    setTimeout(() => {
      setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
      if (selectedAlert?.id === id) setSelectedAlert(prev => prev ? { ...prev, status: 'Resolved' } : null);
      setIsHardening(false);
    }, 2000);
  };

  const runAiAnalysis = () => {
    if (!selectedAlert) return;
    setIsAiAnalyzing(true);
    setAiAnalysis(null);
    
    setTimeout(() => {
      let insight = "";
      if (selectedAlert.title.includes('LSASS')) {
        insight = "NEURAL_INSIGHT: This attack correlates with GhostLink malware activity. The attacker is likely using a modified procdump utility with a randomized hash to evade signature-based detection. Recommend enabling LSA Protection and monitoring for Event 4656 on the LSASS object.";
      } else if (selectedAlert.title.includes('S3')) {
        insight = "NEURAL_INSIGHT: Automated detection suggests this modification was performed via a stolen session token rather than long-term IAM keys. The IP origin is a known residential proxy network. Immediate session invalidation is recommended.";
      } else {
        insight = "NEURAL_INSIGHT: Signature analysis indicates an automated scanner testing for IDOR vulnerabilities. While currently blocked, the pattern suggests a slow-and-low enumeration strategy. Recommend implementing adaptive rate limiting at the WAF layer.";
      }
      setAiAnalysis(insight);
      setIsAiAnalyzing(false);
    }, 2500);
  };

  const filteredAlerts = alerts.filter(a => 
    a.title.toLowerCase().includes(filter.toLowerCase()) || 
    a.source.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Shield className="text-blue-500" />
            Cyber SOC CommandCenter
          </h2>
          <p className="text-zinc-400 text-sm">Real-time threat monitoring and incident response interface.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-[10px] font-bold text-zinc-300 uppercase">System Status: Nominal</span>
          </div>
          <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors">
            <Settings className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-4 flex flex-col gap-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="Filter alerts..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 pl-10 pr-4 text-xs focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredAlerts.map(alert => (
              <div 
                key={alert.id}
                onClick={() => { setSelectedAlert(alert); setAiAnalysis(null); }}
                className={cn(
                  "p-4 border-b border-zinc-800 cursor-pointer transition-all hover:bg-zinc-800/50",
                  selectedAlert?.id === alert.id ? "bg-zinc-800 border-l-4 border-l-blue-500" : ""
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest",
                    alert.severity === 'Critical' ? "bg-red-500/20 text-red-400" :
                    alert.severity === 'High' ? "bg-orange-500/20 text-orange-400" :
                    "bg-yellow-500/20 text-yellow-400"
                  )}>
                    {alert.severity}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100 truncate">{alert.title}</h3>
                <p className="text-[11px] text-zinc-500 mt-1 truncate">{alert.source}</p>
                <div className="flex items-center justify-between mt-3">
                   <div className={cn(
                     "text-[9px] font-bold uppercase flex items-center gap-1",
                     alert.status === 'Open' ? "text-red-500" :
                     alert.status === 'Triaged' ? "text-yellow-500" :
                     "text-green-500"
                   )}>
                     <div className={cn("w-1.5 h-1.5 rounded-full", 
                        alert.status === 'Open' ? "bg-red-500 animate-pulse" :
                        alert.status === 'Triaged' ? "bg-yellow-500" :
                        "bg-green-500"
                     )} />
                     {alert.status}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          {selectedAlert ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      selectedAlert.severity === 'Critical' ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                      selectedAlert.severity === 'High' ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
                      "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    )}>
                      {selectedAlert.severity} PRIORITY
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">{selectedAlert.id}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-100">{selectedAlert.title}</h2>
                  <p className="text-zinc-400 text-sm mt-1">{selectedAlert.source}</p>
                </div>
                <div className="flex gap-2">
                   <button 
                     onClick={runAiAnalysis}
                     disabled={isAiAnalyzing}
                     className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-bold hover:bg-purple-500/20 transition-all disabled:opacity-50"
                   >
                     {isAiAnalyzing ? <Sparkles size={14} className="animate-spin" /> : <Sparkles size={14} />}
                     AI_ANALYZE
                   </button>
                   {selectedAlert.status === 'Open' && (
                     <button 
                       onClick={() => handleTriage(selectedAlert.id)}
                       className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-md text-xs font-bold hover:bg-yellow-500/20 transition-all"
                     >
                       <Eye size={14} />
                       TRIAGE
                     </button>
                   )}
                   {selectedAlert.status !== 'Resolved' && (
                     <button 
                       onClick={() => handleResolve(selectedAlert.id)}
                       disabled={isHardening}
                       className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md text-xs font-bold hover:bg-blue-600 transition-all disabled:opacity-50"
                     >
                       {isHardening ? <Zap size={14} className="animate-spin" /> : <Shield size={14} />}
                       {isHardening ? 'HARDENING...' : 'RESOLVE'}
                     </button>
                   )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <AlertTriangle size={12} />
                      Event Description
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/50 p-4 rounded-lg border border-zinc-800">
                      {selectedAlert.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <CheckCircle size={12} />
                      Remediation Plan
                    </h4>
                    <p className="text-sm text-blue-100 leading-relaxed bg-blue-500/5 p-4 rounded-lg border border-blue-500/20 italic">
                      {selectedAlert.remediation}
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {aiAnalysis && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                       <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase mb-2">
                          <Sparkles size={12} />
                          Neural Strategic Audit
                       </div>
                       <p className="text-sm text-zinc-100 leading-relaxed italic">
                          "{aiAnalysis}"
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 min-h-0 bg-zinc-950 rounded-lg border border-zinc-800 p-4 font-mono overflow-hidden flex flex-col">
                 <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
                   <Terminal size={14} className="text-zinc-500" />
                   <span className="text-[10px] text-zinc-400 font-bold">EVENT_STREAM</span>
                 </div>
                 <div className="flex-1 overflow-y-auto text-[10px] space-y-1 custom-scrollbar">
                    <div className="text-zinc-600">[{new Date(selectedAlert.timestamp).toISOString()}] INF: Initial trigger detected from {selectedAlert.source}</div>
                    <div className="text-zinc-600">[{new Date(selectedAlert.timestamp + 1000).toISOString()}] INF: Correlation engine identified {selectedAlert.title}</div>
                    <div className="text-zinc-500">[{new Date(selectedAlert.timestamp + 2000).toISOString()}] DBG: Payload signature matched GHOST_V3_SIG</div>
                    {selectedAlert.status === 'Triaged' && (
                      <div className="text-yellow-500 font-bold">[{new Date().toISOString()}] ACT: Alert moved to TRIAGED by analyst.</div>
                    )}
                    {selectedAlert.status === 'Resolved' && (
                      <div className="text-green-500 font-bold">[{new Date().toISOString()}] ACT: Automated remediation deployed. Incident CLOSED.</div>
                    )}
                    {isHardening && (
                      <div className="text-blue-400 animate-pulse">[{new Date().toISOString()}] RUN: Deploying hardening script GP-SOC-2026.sh...</div>
                    )}
                    {isAiAnalyzing && (
                      <div className="text-purple-400 animate-pulse">[{new Date().toISOString()}] RUN: Querying Neural Engine for strategic context...</div>
                    )}
                 </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-center opacity-50 h-full">
              <Shield className="w-16 h-16 text-zinc-700 mb-4" />
              <h3 className="text-lg font-bold text-zinc-500 uppercase tracking-widest">Select an Alert</h3>
              <p className="text-sm text-zinc-600 mt-2">Choose an event from the stream to begin triage and remediation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
