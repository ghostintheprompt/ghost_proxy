import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Activity, 
  Lock, 
  Zap, 
  Play, 
  Trash2, 
  Code2, 
  ChevronRight,
  Filter,
  ArrowDownCircle,
  XCircle,
  CheckCircle2,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PFRule {
  id: string;
  action: 'pass' | 'block';
  direction: 'in' | 'out';
  proto: 'tcp' | 'udp' | 'icmp' | 'any';
  port?: string;
  from: string;
  to: string;
  quick: boolean;
  comment: string;
}

interface Packet {
  id: string;
  proto: 'tcp' | 'udp' | 'icmp';
  port: string;
  source: string;
  dest: string;
  status?: 'passed' | 'blocked';
  ruleId?: string;
}

const DEFAULT_RULES: PFRule[] = [
  { id: 'r1', action: 'block', direction: 'in', proto: 'any', from: 'any', to: 'any', quick: false, comment: 'Default Deny Inbound' },
  { id: 'r2', action: 'pass', direction: 'out', proto: 'any', from: 'any', to: 'any', quick: false, comment: 'Allow All Outbound' },
  { id: 'r3', action: 'pass', direction: 'in', proto: 'tcp', port: '22', from: '192.168.1.50', to: 'any', quick: true, comment: 'Allow SSH from Jumpbox' },
  { id: 'r4', action: 'block', direction: 'in', proto: 'icmp', from: 'any', to: 'any', quick: true, comment: 'Drop Inbound Pings' }
];

export default function FirewallOrchestrator() {
  const [rules, setRules] = useState<PFRule[]>(DEFAULT_RULES);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [activeTab, setActiveTab] = useState<'rules' | 'config' | 'logs'>('rules');

  // Simulation loop
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const newPacket: Packet = {
        id: Math.random().toString(36).substr(2, 9),
        proto: ['tcp', 'udp', 'icmp'][Math.floor(Math.random() * 3)] as any,
        port: ['22', '80', '443', '3306', '53'][Math.floor(Math.random() * 5)],
        source: ['192.168.1.50', '10.0.0.4', '172.16.0.1', '8.8.8.8'][Math.floor(Math.random() * 4)],
        dest: 'localhost'
      };

      // Process packet through rules (PF uses "last match wins" unless "quick" is used)
      let finalAction: 'pass' | 'block' = 'pass'; 
      let matchedRuleId = '';

      for (const rule of rules) {
        let match = true;
        if (rule.proto !== 'any' && rule.proto !== newPacket.proto) match = false;
        if (rule.port && rule.port !== newPacket.port) match = false;
        if (rule.from !== 'any' && rule.from !== newPacket.source) match = false;

        if (match) {
          finalAction = rule.action;
          matchedRuleId = rule.id;
          if (rule.quick) break; // "quick" means stop processing
        }
      }

      newPacket.status = finalAction === 'pass' ? 'passed' : 'blocked';
      newPacket.ruleId = matchedRuleId;

      setPackets(prev => [newPacket, ...prev].slice(0, 50));
    }, 1500);
    return () => clearInterval(interval);
  }, [isLive, rules]);

  const generateConf = () => {
    return `# /etc/pf.conf (Simulated for Ghost Proxy)
set skip on lo0
scrub in all

\${rules.map(r => \`\${r.action} \${r.direction} \${r.quick ? 'quick ' : ''}on en0 proto \${r.proto} from \${r.from} to \${r.to}\${r.port ? \` port \${r.port}\` : ''} # \${r.comment}\`).join('\\n')}
`;
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <Filter className="text-orange-500" />
            macOS PF Firewall Orchestrator
          </h2>
          <p className="text-zinc-400 text-sm">Master Packet Filter logic: anchors, scrubbing, and stateful inspection.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2",
              isLive ? "bg-red-600 text-white animate-pulse" : "bg-[#00ff00] text-black"
            )}
          >
            {isLive ? <Zap size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            {isLive ? 'FIREWALL_ENABLED' : 'INITIATE_DAEMON'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left: Rule Management */}
        <div className="lg:col-span-7 flex flex-col gap-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="flex bg-black/40 p-1 border-b border-zinc-800">
             <button onClick={() => setActiveTab('rules')} className={cn("flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all", activeTab === 'rules' ? "text-[#00ff00] bg-zinc-800/50" : "text-zinc-500")}>ACTIVE_RULES</button>
             <button onClick={() => setActiveTab('config')} className={cn("flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all", activeTab === 'config' ? "text-[#00ff00] bg-zinc-800/50" : "text-zinc-500")}>PF_CONF_SOURCE</button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
             {activeTab === 'rules' ? (
               <div className="p-4 space-y-3">
                  {rules.map((rule, idx) => (
                    <motion.div 
                      key={rule.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg group hover:border-orange-500/30 transition-all"
                    >
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-mono text-zinc-600">#{idx + 1}</span>
                             <span className={cn(
                               "text-[9px] font-black uppercase px-2 py-0.5 rounded",
                               rule.action === 'pass' ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                             )}>{rule.action}</span>
                             <span className="text-[10px] font-bold text-zinc-300 uppercase">{rule.direction}</span>
                             {rule.quick && <span className="text-[8px] bg-orange-500 text-black px-1 font-black rounded">QUICK</span>}
                          </div>
                          <button className="text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                             <Trash2 size={14} />
                          </button>
                       </div>
                       <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                          <span className="text-blue-400">proto</span> {rule.proto}
                          <span className="text-blue-400">from</span> {rule.from}
                          <span className="text-blue-400">to</span> {rule.to}
                          {rule.port && <><span className="text-blue-400">port</span> {rule.port}</>}
                       </div>
                       <p className="text-[10px] text-zinc-600 mt-2 italic">// {rule.comment}</p>
                    </motion.div>
                  ))}
               </div>
             ) : (
               <div className="p-6 font-mono text-xs leading-relaxed text-zinc-300 bg-black/40 h-full">
                  <pre className="whitespace-pre-wrap">{generateConf()}</pre>
               </div>
             )}
          </div>
        </div>

        {/* Right: Live Packet Visualization */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                    <Activity size={14} className="text-[#00ff00]" /> Live_Packet_Stream
                 </h3>
                 {isLive && <div className="text-[9px] text-emerald-500 font-bold animate-pulse">MONITORING_ACTIVE</div>}
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                 <AnimatePresence initial={false}>
                    {packets.map(packet => (
                      <motion.div 
                        key={packet.id}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={cn(
                          "p-3 rounded-lg border flex items-center justify-between transition-all",
                          packet.status === 'passed' ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
                        )}
                      >
                         <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-md",
                              packet.status === 'passed' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            )}>
                               {packet.status === 'passed' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                            </div>
                            <div>
                               <div className="text-[10px] font-mono text-zinc-100 uppercase">
                                  {packet.proto} <span className="text-zinc-500">:</span> {packet.port}
                               </div>
                               <div className="text-[8px] text-zinc-500 font-mono">
                                  {packet.source} <ChevronRight size={8} className="inline mx-1" /> localhost
                               </div>
                            </div>
                         </div>
                         <div className="text-right">
                            <div className={cn(
                              "text-[9px] font-black uppercase",
                              packet.status === 'passed' ? "text-emerald-500" : "text-red-500"
                            )}>{packet.status}</div>
                            <div className="text-[8px] text-zinc-600 font-mono">Rule: {packet.ruleId || 'Implicit'}</div>
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>

           {/* Mastering Section */}
           <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <Code2 size={14} /> Master_The_Logic
              </h3>
              <div className="space-y-4">
                 <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <h4 className="text-[10px] font-bold text-zinc-100 uppercase mb-1">Stateful Inspection</h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                       PF is stateful by default. When a packet passes, a state is created. Subsequent packets in that connection bypass rule evaluation entirely.
                    </p>
                 </div>
                 <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <h4 className="text-[10px] font-bold text-zinc-100 uppercase mb-1">Last Match Wins</h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                       Unlike many firewalls, PF evaluates every rule in the set. The LAST rule to match determines the fate of the packet. Use the quick keyword to stop evaluation.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
