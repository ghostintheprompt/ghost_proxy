import React from 'react';
import { 
  HardDrive, 
  Hash, 
  Fingerprint, 
  ShieldAlert, 
  Activity, 
  FileLock, 
  Share2, 
  AlertCircle,
  Clock,
  Terminal,
  Zap,
  Eye,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ScatterChart, Scatter, ZAxis, CartesianGrid } from 'recharts';

const DETECTED_SHADOW_DRIVES = [
  { id: 'S-01', type: 'ENCRYPTED_VOLUME', mount: '/Volumes/Untitled_1', size: '20GB', entropy: 7.9, risk: 'HIGH' },
  { id: 'S-02', type: 'HIDDEN_PARTITION', mount: '/dev/disk4s2', size: '120GB', entropy: 3.2, risk: 'MEDIUM' },
  { id: 'S-03', type: 'SSHFS_MOUNT', mount: '/home/user/mnt/remote', size: 'Inf', entropy: 5.1, risk: 'CRITICAL' },
];

const HASH_LINEAGE = [
  { event: 'FILE_CREATE', hash: 'e3b0c442...', source: 'HR_PORTAL', time: '09:12:01', status: 'ORIGINAL' },
  { event: 'FILE_COPY', hash: 'e3b0c442...', source: 'LOCAL_DESKTOP', time: '10:45:22', status: 'STABLE' },
  { event: 'FILE_ENCRYPT', hash: '8f2a1b9c...', source: 'CRYPTO_LOC', time: '14:20:11', status: 'TAMPERED' },
  { event: 'FILE_EXFIL', hash: '8f2a1b9c...', source: 'SHADOW_DRIVE', time: '14:22:05', status: 'SUSPICIOUS' },
];

const ENTROPY_SAMPLES = [
  { x: 10, y: 3, name: 'Normal Doc', size: 10 },
  { x: 25, y: 2, name: 'PDF Export', size: 20 },
  { x: 60, y: 7.8, name: 'Encrypted Vault', size: 80 },
  { x: 80, y: 8.2, name: 'GPG Compressed', size: 100 },
  { x: 45, y: 4, name: 'Source Code', size: 30 },
];

export default function ShadowDriveAudit() {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <HardDrive className="text-emerald-500" />
          Shadow & Hash Trace
        </h2>
        <p className="text-zinc-400 max-w-3xl text-sm leading-relaxed">
          <strong className="text-zinc-300">Blue Team Forensics:</strong> Tracking the full lifecycle of data from creation to silent exfiltration. Detecting "Shadow Drives" (hidden encrypted volumes, rogue SSHFS mounts) and performing real-time heuristic entropy analysis on file hashes to identify stealth-encrypted exfiltration payloads before they leave the perimeter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shadow Drive Detectors */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
              <HardDrive size={16} className="text-amber-500" />
              Shadow Mounts
            </h3>
            <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-1 rounded">LIVE_SCAN</span>
          </div>

          <div className="space-y-3">
             {DETECTED_SHADOW_DRIVES.map((drive, i) => (
               <div key={i} className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl group hover:border-zinc-700 transition-all">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded font-mono font-bold uppercase">{drive.type}</span>
                     <span className={cn(
                       "text-[10px] font-bold uppercase",
                       drive.risk === 'CRITICAL' ? "text-red-500" : 
                       drive.risk === 'HIGH' ? "text-amber-500" : "text-zinc-500"
                     )}>{drive.risk} RISK</span>
                  </div>
                  <div className="text-sm font-bold text-zinc-200">{drive.mount}</div>
                  <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-zinc-500">
                     <div className="flex gap-4">
                        <span>SIZE: {drive.size}</span>
                        <span>ENTROPY: {drive.entropy}</span>
                     </div>
                     <Activity size={12} className={drive.entropy > 7 ? "text-red-500 animate-pulse" : "text-zinc-700"} />
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Hash Lineage / DTEX Simulation */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
           <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                <Hash size={16} className="text-emerald-500" />
                Hash Propagation Chain
              </h3>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">DTEX_CORE_SYNC</span>
              </div>
           </div>

           <div className="relative mt-8">
              {HASH_LINEAGE.map((item, i) => (
                <div key={i} className="flex gap-6 mb-8 last:mb-0 relative z-10">
                   <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
                      {i === 0 ? <ShieldAlert size={20} className="text-emerald-500" /> : 
                       i === 2 ? <FileLock size={20} className="text-red-500" /> :
                       <Share2 size={20} className="text-zinc-500" />}
                   </div>
                   <div className="flex-1 pb-8 border-b border-zinc-800/50">
                      <div className="flex justify-between items-start">
                         <div>
                            <div className="text-xs font-bold text-zinc-200">{item.event}</div>
                            <div className="text-[10px] font-mono text-zinc-500 mt-0.5">SOURCE: {item.source}</div>
                         </div>
                         <div className="text-right">
                            <div className={cn(
                              "text-[9px] font-bold px-1.5 py-0.5 rounded",
                              item.status === 'TAMPERED' ? "bg-red-500/10 text-red-500" :
                              item.status === 'SUSPICIOUS' ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                            )}>{item.status}</div>
                            <div className="text-[10px] font-mono text-zinc-600 mt-1">{item.time}</div>
                         </div>
                      </div>
                      <div className="mt-3 p-2 bg-zinc-950 rounded border border-zinc-800/50 flex items-center gap-3">
                         <Fingerprint size={14} className="text-zinc-600" />
                         <span className="text-[10px] font-mono text-zinc-500 truncate">{item.hash}</span>
                      </div>
                   </div>
                </div>
              ))}
              {/* Vertical timeline line */}
              <div className="absolute left-[24px] top-12 bottom-12 w-px bg-zinc-800 pointer-events-none" />
           </div>
        </div>
      </div>

      {/* Entropy Visualization Mapping */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
               <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                 <Terminal size={16} className="text-blue-500" />
                 Entropic Behavioral Scrutiny
               </h3>
               <span className="text-[10px] text-zinc-500 italic">"Identifying encryption as an exfiltration signal"</span>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeWidth={0.5} />
                  <XAxis type="number" dataKey="x" name="File Size" unit="MB" fontSize={10} hide />
                  <YAxis type="number" dataKey="y" name="Entropy" unit="H" fontSize={10} hide />
                  <ZAxis type="number" dataKey="size" range={[50, 400]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '11px', color: '#d4d4d8' }}
                  />
                  <Scatter name="Files" data={ENTROPY_SAMPLES}>
                    {ENTROPY_SAMPLES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.y > 6 ? '#ef4444' : '#10b981'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 flex flex-col">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              Security Recommendation
            </h3>
            <div className="flex-1 space-y-4">
               <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex gap-3">
                  <AlertCircle size={18} className="text-red-500 shrink-0" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Detected anomalous encryption on <b>User_912_Workstation</b>. File hash <code>8f2a1b9c...</code> was encrypted using a non-standard binary and moved to a hidden mount point <code>/dev/disk4s2</code>.
                  </p>
               </div>
               <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                  <h4 className="text-[10px] uppercase font-bold text-zinc-500 mb-2">Recommended Response</h4>
                  <ul className="space-y-2">
                     <li className="flex items-center gap-2 text-[11px] text-zinc-300">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        Freeze workstation network egress
                     </li>
                     <li className="flex items-center gap-2 text-[11px] text-zinc-300">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        Capture shadow drive disk image
                     </li>
                     <li className="flex items-center gap-2 text-[11px] text-zinc-300">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        Correlate with HR Sentiment flags
                     </li>
                  </ul>
               </div>
            </div>
            <button className="w-full py-3 bg-red-500 text-zinc-950 font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-red-400 transition-colors shadow-lg shadow-red-500/10">
              INITIATE LOCKDOWN
            </button>
         </div>
      </div>
    </div>
  );
}
