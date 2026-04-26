import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, 
  Shield, 
  Power, 
  RefreshCw, 
  XOctagon, 
  ChevronRight, 
  Terminal, 
  Cpu,
  Activity,
  AlertTriangle,
  Brain,
  Zap,
  Lock,
  Globe,
  Settings,
  Server,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Daemon {
  label: string;
  status: 'running' | 'stopped';
  pid?: number;
}

interface Node {
  id: string;
  hostname: string;
  osVersion: string;
  status: 'online' | 'offline';
  lastSeen: string;
  daemons: Daemon[];
}

const INITIAL_NODES: Node[] = [
  {
    id: 'node-01',
    hostname: 'PHOENIX-MACOS-PROD',
    osVersion: 'macOS 14.4.1',
    status: 'online',
    lastSeen: new Date().toISOString(),
    daemons: [
      { label: 'com.apple.syslogd', status: 'running', pid: 452 },
      { label: 'com.ghost.sentinel', status: 'running', pid: 8821 },
      { label: 'com.suarez.orchestrator', status: 'running', pid: 1029 }
    ]
  },
  {
    id: 'node-02',
    hostname: 'EDGE-GATEWAY-04',
    osVersion: 'Debian 12 (Ghost Edition)',
    status: 'online',
    lastSeen: new Date().toISOString(),
    daemons: [
      { label: 'nginx', status: 'running', pid: 1102 },
      { label: 'fail2ban', status: 'running', pid: 992 }
    ]
  }
];

const DIRTY_DOZEN = [
  { id: 1, name: 'Identity Spoofing', description: 'Agent A attempting to update Agent B status.' },
  { id: 2, name: 'Path Poisoning', description: 'Oversized ID strings to crash buffers.' },
  { id: 3, name: 'Ghost Fields', description: 'Injecting unauthorized admin flags.' },
  { id: 4, name: 'State Shortcutting', description: 'Bypassing execution state machines.' },
  { id: 5, name: 'Unauthorized Command', description: 'Unauthenticated system-level execution.' },
  { id: 6, name: 'Command Hijack', description: 'Intercepting packets meant for other nodes.' }
];

export default function InfrastructureManager() {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(INITIAL_NODES[0].id);
  const [activeTab, setActiveView] = useState<'nodes' | 'guardrails'>('nodes');

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Server className="text-[#00ff00]" />
            Suarez Infrastructure Orchestrator
          </h2>
          <p className="text-zinc-400 text-sm font-mono uppercase tracking-tighter">Autonomous Node Management & Guardrails</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <button 
            onClick={() => setActiveView('nodes')}
            className={cn(
              "px-4 py-1.5 rounded text-[10px] font-bold transition-all uppercase tracking-widest",
              activeTab === 'nodes' ? "bg-[#00ff00] text-black" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            ACTIVE_NODES
          </button>
          <button 
            onClick={() => setActiveView('guardrails')}
            className={cn(
              "px-4 py-1.5 rounded text-[10px] font-bold transition-all uppercase tracking-widest",
              activeTab === 'guardrails' ? "bg-red-600 text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            DIRTY_DOZEN_RULES
          </button>
        </div>
      </div>

      {activeTab === 'nodes' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-zinc-800 bg-black/40 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
               <Globe size={12} className="text-[#00ff00]" /> D-Space Grid
            </div>
            <div className="flex-1 overflow-y-auto">
              {nodes.map(node => (
                <div 
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    "p-4 border-b border-zinc-800 cursor-pointer transition-all hover:bg-zinc-800/50",
                    selectedNodeId === node.id ? "bg-zinc-800 border-l-4 border-l-[#00ff00]" : ""
                  )}
                >
                  <h3 className="text-sm font-bold text-zinc-100">{node.hostname}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={cn("w-1.5 h-1.5 rounded-full", node.status === 'online' ? "bg-[#00ff00] animate-pulse" : "bg-zinc-700")} />
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter">{node.osVersion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-9 flex flex-col gap-6">
            {selectedNode ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-10">
                   <div>
                     <h1 className="text-5xl font-black text-white italic tracking-tighter mb-2">{selectedNode.hostname}</h1>
                     <div className="flex gap-4 text-[10px] font-mono text-zinc-500 uppercase">
                        <span>ID: {selectedNode.id}</span>
                        <span>KERNEL: {selectedNode.osVersion}</span>
                        <span className="text-[#00ff00]">STATUS: SYNC_STABLE</span>
                     </div>
                   </div>
                   <div className="flex gap-3">
                      <button className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:text-[#00ff00] hover:border-[#00ff00] transition-all">
                         <RefreshCw size={18} />
                      </button>
                      <button className="px-6 py-2 bg-red-600/10 border border-red-600/30 text-red-500 rounded-lg text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">
                         Purge_Node
                      </button>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                      <Zap className="text-[#00ff00]" size={18} />
                      <h3 className="text-sm font-black text-white italic uppercase">Daemon_Representations</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedNode.daemons.map(daemon => (
                        <div key={daemon.label} className="bg-black/50 border border-zinc-800 p-4 rounded-lg group hover:border-[#00ff00]/50 transition-all">
                           <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                 <div className={cn("w-2 h-2 rounded-sm", daemon.status === 'running' ? "bg-[#00ff00] shadow-[0_0_8px_#00ff00]" : "bg-zinc-700")} />
                                 <span className="text-[11px] font-bold text-zinc-100 truncate max-w-[200px]">{daemon.label}</span>
                              </div>
                              <button className="text-zinc-600 hover:text-zinc-100 transition-colors">
                                 <Brain size={14} />
                              </button>
                           </div>
                           <div className="flex items-center justify-between">
                              <span className="text-[9px] text-zinc-500 font-mono">PID: {daemon.pid || 'N/A'}</span>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="px-2 py-1 bg-zinc-800 text-[8px] font-black uppercase rounded border border-zinc-700 hover:bg-zinc-700">Stop</button>
                                 <button className="px-2 py-1 bg-zinc-800 text-[8px] font-black uppercase rounded border border-zinc-700 hover:bg-zinc-700">Restart</button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mt-auto pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-xl">
                      <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                         <XOctagon size={14} /> System_Critical_Action
                      </h4>
                      <button className="w-full py-4 bg-red-600 text-white font-black uppercase text-xs rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                         <Power size={18} /> Remote_Node_Shutdown
                      </button>
                   </div>
                   <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl font-mono">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                         <Terminal size={14} /> Operation_History
                      </h4>
                      <div className="text-[8px] space-y-1 text-zinc-600">
                         <div>[14:02:01] INF: Daemon "com.ghost.sentinel" HEARTBEAT</div>
                         <div>[13:58:22] INF: Node sync completed (Layer 4)</div>
                         <div className="text-[#00ff00]">[13:55:00] ACT: Command "RESTART_DAEMON" executed</div>
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full bg-zinc-900 border border-zinc-800 border-dashed rounded-xl flex items-center justify-center text-zinc-600 uppercase tracking-widest font-black italic">
                 Awaiting_Neural_Link
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 overflow-y-auto custom-scrollbar">
           <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6">
              <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20">
                 <AlertTriangle size={32} className="text-red-500" />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">The Dirty Dozen</h3>
                 <p className="text-zinc-500 text-sm">Security Guardrails for Suarez Infrastructure Orchestration.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DIRTY_DOZEN.map(rule => (
                <div key={rule.id} className="p-6 bg-black/40 border border-zinc-800 rounded-xl group hover:border-red-600/50 transition-all">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-red-500 font-mono">#{rule.id.toString().padStart(2, '0')}</span>
                      <Shield size={16} className="text-zinc-700 group-hover:text-red-500 transition-colors" />
                   </div>
                   <h4 className="text-lg font-bold text-zinc-100 mb-2">{rule.name}</h4>
                   <p className="text-xs text-zinc-500 leading-relaxed italic">"{rule.description}"</p>
                   <div className="mt-6 flex items-center gap-2">
                      <div className="px-2 py-1 bg-red-600/10 border border-red-600/20 text-red-500 text-[8px] font-black uppercase rounded">Auto_Reject</div>
                      <div className="px-2 py-1 bg-zinc-800 text-[8px] font-black uppercase rounded text-zinc-500">Log_Incident</div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-red-900/10 to-transparent border border-red-900/20">
              <h4 className="text-sm font-black text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <Lock size={16} /> Enforcement_Status
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-3xl">
                 These rules are enforced at the Firestore Security Layer and the Neural Proxy. Any payload matching these patterns is immediately neutralized and the originating session is blacklisted for 24 hours.
              </p>
           </div>
        </div>
      )}
    </div>
  );
}
