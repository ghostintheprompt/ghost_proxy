import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  Search, 
  CheckCircle, 
  Zap, 
  Activity,
  Eye,
  Settings,
  Terminal,
  Sparkles,
  ChevronRight,
  Database,
  Cpu,
  Binary
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
  memoryDump?: string;
  threatActor?: string;
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: 'INC-2026-001',
    timestamp: Date.now() - 120000,
    severity: 'Critical',
    title: 'LSASS Memory Dump Detected',
    source: 'Endpoint: SRV-PROD-01',
    status: 'Open',
    description: 'A highly obfuscated process bypassed EDR and requested PROCESS_VM_READ access to lsass.exe.',
    remediation: 'Isolate host, enforce credential rotation, and deploy automated memory forensics playbook.',
    threatActor: 'APT-GHOST-9',
    memoryDump: '0x0000: 4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00  MZ..............\n0x0010: B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00  ........@.......\n0x0020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................\n0x0030: 00 00 00 00 00 00 00 00 00 00 00 00 E8 00 00 00  ................\n0x0040: 0E 1F BA 0E 00 B4 09 CD 21 B8 01 4C CD 21 54 68  ........!..L.!Th'
  },
  {
    id: 'INC-2026-002',
    timestamp: Date.now() - 300000,
    severity: 'High',
    title: 'Neural WAF Bypass Attempt',
    source: 'Edge-Gateway-04',
    status: 'Open',
    description: 'Anomalous semantic sharding detected in incoming HTTP payloads targeting the Auth API.',
    remediation: 'Update WAF semantic rules engine and block originating ASNs temporarily.',
    threatActor: 'Unknown_Automated'
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
    }, 3000);
  };

  const runAiAnalysis = () => {
    if (!selectedAlert) return;
    setIsAiAnalyzing(true);
    setAiAnalysis(null);
    
    setTimeout(() => {
      let insight = "";
      if (selectedAlert.title.includes('LSASS')) {
        insight = "NEURAL_CORRELATION: The memory dump signature indicates a custom variant of 'Mimikatz' packed with an LLM-mutated obfuscator. Threat Actor [APT-GHOST-9] frequently uses this to establish stealth C2. Automated generation of an IOC containment script is recommended.";
      } else {
        insight = "NEURAL_CORRELATION: Semantic sharding detected. The attacker is splitting a SQLi payload across multiple requests to keep entropy low. Recommendation: Switch WAF to Stateful Sequence Inspection.";
      }
      setAiAnalysis(insight);
      setIsAiAnalyzing(false);
    }, 2500);
  };

  const filteredAlerts = alerts.filter(a => 
    a.title.toLowerCase().includes(filter.toLowerCase()) || 
    a.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <Shield className="text-blue-500" />
            Cyber SOC: Neural Defense Center
          </h2>
          <p className="text-zinc-400 text-sm font-mono uppercase tracking-tighter">Real-Time Threat Correlation & Automated Remediation</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Grid_Secure</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Alert Stream */}
        <div className="lg:col-span-4 flex flex-col gap-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 bg-black/40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input 
                type="text"
                placeholder="Filter Neural Stream..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono focus:border-blue-500 outline-none transition-all shadow-inner"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {filteredAlerts.map(alert => (
              <div 
                key={alert.id}
                onClick={() => { setSelectedAlert(alert); setAiAnalysis(null); }}
                className={cn(
                  "p-4 mb-2 rounded-lg border cursor-pointer transition-all hover:bg-zinc-800/80 group",
                  selectedAlert?.id === alert.id ? "bg-zinc-800 border-blue-500 shadow-lg" : "bg-zinc-950 border-zinc-800"
                )}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={cn(
                    "text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest",
                    alert.severity === 'Critical' ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                    alert.severity === 'High' ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
                    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  )}>
                    {alert.severity}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono tracking-tighter">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors mb-1">{alert.title}</h3>
                <p className="text-[10px] font-mono text-zinc-500 mb-3">{alert.id}</p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
                   <div className={cn(
                     "text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
                     alert.status === 'Open' ? "text-red-500" :
                     alert.status === 'Triaged' ? "text-yellow-500" :
                     "text-emerald-500"
                   )}>
                     <div className={cn("w-1.5 h-1.5 rounded-full", 
                        alert.status === 'Open' ? "bg-red-500 animate-pulse shadow-[0_0_5px_#ef4444]" :
                        alert.status === 'Triaged' ? "bg-yellow-500" :
                        "bg-emerald-500"
                     )} />
                     {alert.status}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {selectedAlert ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      selectedAlert.severity === 'Critical' ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]" :
                      selectedAlert.severity === 'High' ? "bg-orange-500 text-white" :
                      "bg-yellow-500 text-black"
                    )}>
                      {selectedAlert.severity}_PRIORITY
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">{selectedAlert.id}</span>
                  </div>
                  <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">{selectedAlert.title}</h2>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <span className="flex items-center gap-1"><Database size={12} /> {selectedAlert.source}</span>
                    <span className="flex items-center gap-1 text-purple-400"><Cpu size={12} /> {selectedAlert.threatActor}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                   <button 
                     onClick={runAiAnalysis}
                     disabled={isAiAnalyzing}
                     className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-purple-600/20"
                   >
                     {isAiAnalyzing ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                     AI_CORRELATION
                   </button>
                   {selectedAlert.status === 'Open' && (
                     <button 
                       onClick={() => handleTriage(selectedAlert.id)}
                       className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                     >
                       <Eye size={14} /> TRIAGE
                     </button>
                   )}
                   {selectedAlert.status !== 'Resolved' && (
                     <button 
                       onClick={() => handleResolve(selectedAlert.id)}
                       disabled={isHardening}
                       className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                     >
                       {isHardening ? <RefreshCw size={14} className="animate-spin" /> : <Shield size={14} />}
                       {isHardening ? 'GENERATING_PATCH...' : 'ISOLATE_&_REMEDIATE'}
                     </button>
                   )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-500" /> Technical_Overview
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    {selectedAlert.description}
                  </p>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle size={14} /> Playbook_Recommendation
                  </h4>
                  <p className="text-xs text-blue-100/70 leading-relaxed italic">
                    "{selectedAlert.remediation}"
                  </p>
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
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 relative">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                         <Sparkles size={60} className="text-purple-500" />
                       </div>
                       <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10">
                          <Brain size={14} /> Neural_Strategic_Audit
                       </h4>
                       <p className="text-sm text-zinc-100 leading-relaxed font-medium relative z-10 max-w-2xl">
                          {aiAnalysis}
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Memory Forensics Panel */}
              {selectedAlert.memoryDump && (
                <div className="mb-6 bg-black/50 border border-zinc-800 rounded-xl p-5">
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Binary size={14} className="text-zinc-400" /> Extracted_Memory_Forensics
                  </h4>
                  <pre className="text-[9px] text-zinc-400 font-mono leading-relaxed overflow-x-auto custom-scrollbar p-4 bg-zinc-950 border border-zinc-800 rounded">
                    {selectedAlert.memoryDump}
                  </pre>
                </div>
              )}

              <div className="flex-1 min-h-[150px] bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono overflow-hidden flex flex-col">
                 <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
                   <Terminal size={14} className="text-zinc-500" />
                   <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Incident_Event_Stream</span>
                 </div>
                 <div className="flex-1 overflow-y-auto text-[10px] space-y-2 custom-scrollbar">
                    <div className="text-zinc-600"><span className="text-zinc-700 mr-2">[{new Date(selectedAlert.timestamp).toLocaleTimeString()}]</span> INF: Telemetry spike detected from {selectedAlert.source}</div>
                    <div className="text-zinc-500"><span className="text-zinc-700 mr-2">[{new Date(selectedAlert.timestamp + 1000).toLocaleTimeString()}]</span> DBG: Sandbox analysis initiated on parent process.</div>
                    
                    {selectedAlert.status === 'Triaged' && (
                      <div className="text-yellow-500 font-bold"><span className="text-yellow-700 mr-2">[{new Date().toLocaleTimeString()}]</span> ACT: Status updated to TRIAGED by primary analyst.</div>
                    )}
                    {isHardening && (
                      <div className="text-blue-400 animate-pulse"><span className="text-blue-700 mr-2">[{new Date().toLocaleTimeString()}]</span> RUN: Compiling custom EDR remediation policy...</div>
                    )}
                    {selectedAlert.status === 'Resolved' && (
                      <div className="text-emerald-500 font-bold"><span className="text-emerald-700 mr-2">[{new Date().toLocaleTimeString()}]</span> ACT: Host isolated. Neural patch deployed. Incident CLOSED.</div>
                    )}
                 </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-center opacity-30 h-full">
              <Shield className="w-20 h-20 text-zinc-700 mb-6" />
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Select Neural Event</h3>
              <p className="text-zinc-500 text-sm max-w-sm italic">Access deep forensic telemetry and initiate AI-assisted remediation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
