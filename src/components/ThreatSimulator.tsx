import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Terminal, 
  Shield, 
  AlertCircle, 
  ChevronRight, 
  Target, 
  Bug, 
  Lock,
  Skull,
  Activity,
  Code2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ScenarioStep {
  id: string;
  title: string;
  description: string;
  action: string;
  result: string;
  mitigation: string;
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
    title: 'Banking Trojan: Overlay Attack',
    category: 'Mobile',
    difficulty: 'Senior',
    description: 'Simulate a banking trojan that uses SYSTEM_ALERT_WINDOW to steal credentials via UI overlays.',
    steps: [
      {
        id: 'step1',
        title: 'Monitor App Launch',
        description: 'The malware monitors for the launch of a target banking application.',
        action: 'Start Accessibility Service Listener',
        result: 'Target banking app "GlobalBank" launch detected.',
        mitigation: 'Detect and block apps using Accessibility Services for sensitive tasks.'
      },
      {
        id: 'step2',
        title: 'Inject Overlay',
        description: 'Display a SYSTEM_ALERT_WINDOW overlay matching the banking login screen.',
        action: 'Deploy Shadow UI Overlay',
        result: 'Overlay successfully drawn over GlobalBank. User enters credentials.',
        mitigation: 'Implement overlay detection (FLAG_SECURE) in banking applications.'
      },
      {
        id: 'step3',
        title: 'Exfiltrate Credentials',
        description: 'Intercept the entered password and send it to the C2 server.',
        action: 'Send POST to https://c2.ghostproxy.io/collect',
        result: 'Credentials captured: user@email.com / P4ssw0rd!123',
        mitigation: 'Network level monitoring for suspicious C2 traffic.'
      }
    ]
  },
  {
    id: 's2',
    title: 'Cloud: S3 Bucket Enumeration',
    category: 'Cloud',
    difficulty: 'Junior',
    description: 'Locate and assess public S3 buckets in a recently acquired organization.',
    steps: [
      {
        id: 'step1',
        title: 'Domain Scanning',
        description: 'Scan the organization\'s public domains for bucket names.',
        action: 'Run ghost-bucket-scanner',
        result: 'Found 12 candidate buckets. 3 appear publicly accessible.',
        mitigation: 'Enable AWS Public Access Block at the account level.'
      },
      {
        id: 'step2',
        title: 'Permission Audit',
        description: 'Analyze ACLs and Bucket Policies for overly permissive read access.',
        action: 'Query Bucket ACLs',
        result: 'Bucket "company-backup-01" has ListBucket and GetObject for AllUsers.',
        mitigation: 'Apply Least Privilege principle to all IAM and Bucket Policies.'
      }
    ]
  },
  {
    id: 's3',
    title: 'IoT: CAN Bus Fuzzing (Lab Environment)',
    category: 'IoT',
    difficulty: 'Mid',
    description: 'Simulate interaction with a vehicle\'s CAN bus via OBD-II in a controlled lab environment.',
    steps: [
      {
        id: 'step1',
        title: 'Traffic Baseline',
        description: 'Establish a baseline of known-good traffic from the vehicle.',
        action: 'Record CAN Traffic',
        result: 'Baseline recorded. Identifying periodic messages for Engine RPM and Speed.',
        mitigation: 'Implement CAN IDS to baseline normal traffic.'
      },
      {
        id: 'step2',
        title: 'Targeted Injection',
        description: 'Inject a spoofed message to override the speedometer display.',
        action: 'Inject Spoofed CAN Packet [ID: 0x280, DATA: 0xFF 0xFF]',
        result: 'Speedometer showing 180mph while vehicle is stationary.',
        mitigation: 'Message authentication (SecOC) for critical CAN messages.'
      }
    ]
  }
];

export default function AttackScenarioSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setActiveStepIndex(0);
    setLogs([\`Initializing Red Team Simulation: \${scenario.title}\`, \`Environment: Sandbox_v4.2\`]);
  };

  const executeStep = () => {
    if (!selectedScenario || isSimulating) return;
    
    setIsSimulating(true);
    const step = selectedScenario.steps[activeStepIndex];
    
    setLogs(prev => [...prev, \`> Executing: \${step.action}\`]);

    setTimeout(() => {
      setLogs(prev => [...prev, \`[SUCCESS] \${step.result}\`]);
      setIsSimulating(false);
      if (activeStepIndex < selectedScenario.steps.length - 1) {
        setActiveStepIndex(prev => prev + 1);
      } else {
        setLogs(prev => [...prev, \`Simulation Complete. All objectives achieved.\`]);
      }
    }, 1500);
  };

  const reset = () => {
    setSelectedScenario(null);
    setActiveStepIndex(-1);
    setLogs([]);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Target className="text-red-500" />
            Attack Scenario Simulator
          </h2>
          <p className="text-zinc-400 text-sm">Interactive Red-Team simulations for pentesting and research.</p>
        </div>
        {selectedScenario && (
          <button 
            onClick={reset}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-xs font-bold transition-all"
          >
            SELECT DIFFERENT SCENARIO
          </button>
        )}
      </div>

      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCENARIOS.map(scenario => (
            <motion.div
              key={scenario.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl cursor-pointer hover:border-red-500/50 transition-all flex flex-col group"
              onClick={() => startSimulation(scenario)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                  scenario.category === 'Mobile' ? "bg-blue-500/20 text-blue-400" :
                  scenario.category === 'Cloud' ? "bg-orange-500/20 text-orange-400" :
                  "bg-purple-500/20 text-purple-400"
                )}>
                  {scenario.category}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  {scenario.difficulty}
                </div>
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-red-400 transition-colors">{scenario.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6 flex-1">{scenario.description}</p>
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold">
                INITIATE SIMULATION <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Skull className="text-red-500 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 uppercase tracking-tighter">Attack Chain</h3>
                  <p className="text-[10px] text-zinc-500">Execution Timeline</p>
                </div>
              </div>

              <div className="space-y-6">
                {selectedScenario.steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={cn(
                      "relative pl-8 border-l-2 transition-all",
                      index < activeStepIndex ? "border-red-500" :
                      index === activeStepIndex ? "border-zinc-500 animate-pulse" :
                      "border-zinc-800 opacity-30"
                    )}
                  >
                    <div className={cn(
                      "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-zinc-950",
                      index < activeStepIndex ? "border-red-500 bg-red-500" :
                      index === activeStepIndex ? "border-zinc-500" :
                      "border-zinc-800"
                    )} />
                    
                    <h4 className="font-bold text-sm text-zinc-100 mb-1">{step.title}</h4>
                    <p className="text-xs text-zinc-400 mb-3">{step.description}</p>
                    
                    {index === activeStepIndex && !isSimulating && (
                      <button 
                        onClick={executeStep}
                        className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-[10px] font-bold transition-all flex items-center gap-2"
                      >
                        <Zap size={12} />
                        EXECUTE: {step.action}
                      </button>
                    )}

                    {index < activeStepIndex && (
                      <div className="bg-zinc-800/50 p-3 rounded-lg border border-red-500/20 mt-2">
                        <div className="flex items-center gap-2 text-[10px] text-red-400 font-bold mb-1">
                          <Activity size={12} />
                          OUTCOME
                        </div>
                        <p className="text-[11px] text-zinc-300 font-mono">{step.result}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Shield className="text-blue-500 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-100 uppercase tracking-tighter">Hardening & Defense</h3>
                  <p className="text-[10px] text-blue-400/70">Blue Team Recommendation</p>
                </div>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-blue-500/10">
                <p className="text-xs text-blue-100 leading-relaxed italic">
                  {activeStepIndex > 0 
                    ? selectedScenario.steps[activeStepIndex - 1].mitigation 
                    : "Simulate the first step to reveal defense strategies."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col overflow-hidden font-mono">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-zinc-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase">C2_CONSOLE</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="flex-1 p-4 text-[10px] overflow-y-auto flex flex-col gap-1 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className={cn(
                  log.startsWith('>') ? "text-blue-400" :
                  log.startsWith('[SUCCESS]') ? "text-green-400" :
                  log.startsWith('Simulation Complete') ? "text-red-400 font-bold" :
                  "text-zinc-500"
                )}>
                  {log}
                </div>
              ))}
              {isSimulating && (
                <div className="text-zinc-600 animate-pulse">Running neural probe...</div>
              )}
            </div>
            <div className="p-3 bg-zinc-900/30 border-t border-zinc-800 flex items-center gap-2">
              <ChevronRight size={14} className="text-red-500" />
              <div className="w-1.5 h-3 bg-red-500 animate-blink" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
