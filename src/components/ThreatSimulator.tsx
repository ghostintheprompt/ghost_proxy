import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Shield, 
  AlertCircle, 
  ChevronRight, 
  Target, 
  Skull,
  Activity,
  Terminal,
  Cpu,
  Crosshair,
  Wifi,
  Network
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ScenarioStep {
  id: string;
  title: string;
  description: string;
  action: string;
  result: string;
  mitigation: string;
  entropy: number;
}

interface Scenario {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'Cloud' | 'IoT' | 'Network';
  difficulty: 'Junior' | 'Mid' | 'Senior';
  description: string;
  steps: ScenarioStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: 'Banking Trojan: Phantom Overlay',
    category: 'Mobile',
    difficulty: 'Senior',
    description: 'Simulate a banking trojan using Shadow DOM isolation to steal credentials via undetectable overlays.',
    steps: [
      {
        id: 'step1',
        title: 'Accessibility Hook Injection',
        description: 'Deploy neural-obfuscated Accessibility Service listener.',
        action: 'INJECT: com.ghost.a11y_hook --stealth',
        result: 'Hook established. Awaiting target banking app context.',
        mitigation: 'Implement rigorous FLAG_SECURE and Context-Aware A11y verification.',
        entropy: 0.84
      },
      {
        id: 'step2',
        title: 'Shadow DOM Overlay Deployment',
        description: 'Construct pixel-perfect login replica within a closed Shadow Root.',
        action: 'EXEC: draw_shadow_ui(target="GlobalBank")',
        result: 'Phantom Overlay rendered. Undetectable to host DOM scanners.',
        mitigation: 'Enforce Screen Isolation primitives at the OS level (2026 standard).',
        entropy: 0.92
      },
      {
        id: 'step3',
        title: 'Credential Exfiltration',
        description: 'Capture keystrokes and exfiltrate via DNS tunneling to avoid WAF.',
        action: 'EXFIL: DNS_TXT_ENCODE(credentials)',
        result: 'Data transmitted. WAF bypassed successfully.',
        mitigation: 'Deploy strict DNS Scrutiny and anomalous outbound traffic analysis.',
        entropy: 0.98
      }
    ]
  },
  {
    id: 's2',
    title: 'Cloud: S3 IAM Privilege Escalation',
    category: 'Cloud',
    difficulty: 'Senior',
    description: 'Exploit a misconfigured IAM role to escalate privileges and enumerate private S3 buckets.',
    steps: [
      {
        id: 'step1',
        title: 'SSRF to Metadata API',
        description: 'Exploit SSRF in target application to hit the AWS IMDSv2 endpoint.',
        action: 'SEND: PUT /api/fetch?url=http://169.254.169.254/latest/api/token',
        result: 'IMDSv2 Token acquired. Proceeding to fetch role credentials.',
        mitigation: 'Enforce IMDSv2 strictly and implement network egress filtering on workloads.',
        entropy: 0.75
      },
      {
        id: 'step2',
        title: 'Assume Compromised Role',
        description: 'Use the stolen credentials to assume the "web-app-role".',
        action: 'EXEC: aws sts assume-role --role-arn ...',
        result: 'Role assumed. Analyzing attached IAM policies.',
        mitigation: 'Implement Least Privilege and continuously audit IAM policy attachments.',
        entropy: 0.88
      }
    ]
  }
];

export default function ThreatSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [payloadEntropy, setPayloadEntropy] = useState(0.00);

  const startSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setActiveStepIndex(0);
    setPayloadEntropy(0.00);
    setLogs([
      \`[SYSTEM] Initializing Red Team Framework v26.4\`,
      \`[TARGET] Loading Scenario: \${scenario.title}\`,
      \`[STATUS] Evasion engines armed. Ready for execution.\`
    ]);
  };

  const executeStep = () => {
    if (!selectedScenario || isSimulating) return;
    
    setIsSimulating(true);
    const step = selectedScenario.steps[activeStepIndex];
    
    setLogs(prev => [...prev, \`[EXEC] Deploying Vector: \${step.title}\`, \`> \${step.action}\`]);

    let currentEntropy = payloadEntropy;
    const entropyTarget = step.entropy;
    
    const entropyInterval = setInterval(() => {
      currentEntropy += 0.05;
      if (currentEntropy >= entropyTarget) {
        currentEntropy = entropyTarget;
        clearInterval(entropyInterval);
      }
      setPayloadEntropy(currentEntropy);
    }, 100);

    setTimeout(() => {
      setLogs(prev => [...prev, \`[SUCCESS] \${step.result}\`]);
      setIsSimulating(false);
      if (activeStepIndex < selectedScenario.steps.length - 1) {
        setActiveStepIndex(prev => prev + 1);
      } else {
        setLogs(prev => [...prev, \`[COMPLETED] Kill chain fully executed. Operation successful.\`]);
      }
    }, 1500);
  };

  const reset = () => {
    setSelectedScenario(null);
    setActiveStepIndex(-1);
    setLogs([]);
    setPayloadEntropy(0);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Target className="text-red-500" />
            Advanced Threat Simulator
          </h2>
          <p className="text-zinc-400 text-sm font-mono uppercase tracking-tighter">Execute High-Fidelity 2026 Kill Chains</p>
        </div>
        {selectedScenario && (
          <button 
            onClick={reset}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-md text-[10px] font-black uppercase tracking-widest transition-all"
          >
            ABORT_OPERATION
          </button>
        )}
      </div>

      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCENARIOS.map(scenario => (
            <motion.div
              key={scenario.id}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl cursor-pointer hover:border-red-500/50 transition-all flex flex-col group relative overflow-hidden"
              onClick={() => startSimulation(scenario)}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5">
                 <Network size={120} />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                    scenario.category === 'Mobile' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    scenario.category === 'Cloud' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                    "bg-purple-500/10 text-purple-400 border-purple-500/20"
                  )}>
                    {scenario.category}
                  </div>
                  <div className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                    scenario.difficulty === 'Senior' ? "bg-red-500/20 text-red-500" : "bg-yellow-500/20 text-yellow-500"
                  )}>
                    {scenario.difficulty}
                  </div>
                </div>
                <h3 className="text-xl font-black text-zinc-100 mb-2 group-hover:text-red-400 transition-colors uppercase tracking-tighter">{scenario.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6 flex-1 italic">{scenario.description}</p>
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest">
                  <Crosshair size={14} /> INITIATE_KILL_CHAIN <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Execution Matrix */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex-1 overflow-y-auto relative">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                    <Skull className="text-red-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-white uppercase tracking-tighter text-xl">Execution Matrix</h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Target: {selectedScenario.title}</p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-bold text-zinc-500 uppercase mb-1">WAF_Evasion_Entropy</div>
                   <div className="text-2xl font-black text-red-500 font-mono">{payloadEntropy.toFixed(2)}</div>
                </div>
              </div>

              <div className="space-y-8">
                {selectedScenario.steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={cn(
                      "relative pl-8 border-l-2 transition-all duration-500",
                      index < activeStepIndex ? "border-red-500" :
                      index === activeStepIndex ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" :
                      "border-zinc-800 opacity-40"
                    )}
                  >
                    <div className={cn(
                      "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-zinc-950 transition-all duration-500",
                      index < activeStepIndex ? "border-red-500 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" :
                      index === activeStepIndex ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" :
                      "border-zinc-800"
                    )} />
                    
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-sm text-zinc-100 uppercase tracking-wide">{step.title}</h4>
                       <span className="text-[9px] font-mono text-zinc-500">Vector_{index + 1}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4 italic">{step.description}</p>
                    
                    {index === activeStepIndex && !isSimulating && (
                      <button 
                        onClick={executeStep}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
                      >
                        <Zap size={14} />
                        EXECUTE_VECTOR
                      </button>
                    )}

                    {index < activeStepIndex && (
                      <div className="bg-black/40 p-4 rounded-lg border border-red-500/20 mt-4">
                        <div className="flex items-center gap-2 text-[10px] text-red-500 font-black uppercase tracking-widest mb-2">
                          <Activity size={12} />
                          Vector_Outcome
                        </div>
                        <p className="text-[11px] text-zinc-300 font-mono leading-relaxed">{step.result}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* C2 Console & Defense Intel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col overflow-hidden font-mono h-2/3 shadow-2xl">
              <div className="p-3 border-b border-zinc-800 bg-black/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-red-500" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">C2_CONSOLE</span>
                </div>
                <Wifi size={12} className="text-emerald-500 animate-pulse" />
              </div>
              <div className="flex-1 p-4 text-[10px] overflow-y-auto flex flex-col gap-1 custom-scrollbar leading-relaxed">
                {logs.map((log, i) => (
                  <div key={i} className={cn(
                    log.includes('[EXEC]') ? "text-blue-400" :
                    log.includes('[SUCCESS]') ? "text-emerald-400 font-bold" :
                    log.includes('[COMPLETED]') ? "text-red-500 font-black uppercase" :
                    "text-zinc-500"
                  )}>
                    {log}
                  </div>
                ))}
                {isSimulating && (
                  <div className="text-red-500 animate-pulse mt-2 flex items-center gap-2">
                     <Cpu size={12} className="animate-spin" /> Injecting payload sequence...
                  </div>
                )}
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Shield size={80} className="text-emerald-500" />
              </div>
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                   <Shield className="text-emerald-500 w-4 h-4" />
                   <h3 className="font-black text-emerald-400 uppercase tracking-widest text-[10px]">Blue_Team_Intel</h3>
                 </div>
                 <p className="text-xs text-emerald-100/70 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">
                   {activeStepIndex > 0 
                     ? selectedScenario.steps[activeStepIndex - 1].mitigation 
                     : "Execute a vector to reveal defensive mitigation strategies for 2026 architectures."}
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
