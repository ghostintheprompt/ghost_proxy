import React, { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const REPO = 'ghostintheprompt/ghost-proxy';
const CURRENT_VERSION = '1.0.0';

export default function GitHubUpdateChecker() {
  const [updateAvailable, setUpdateAvailable] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkForUpdates();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const checkForUpdates = async () => {
    try {
      const response = await fetch(\`https://api.github.com/repos/\${REPO}/releases/latest\`);
      if (response.ok) {
        const data = await response.json();
        const latestVersion = data.tag_name.replace('v', '');
        if (latestVersion !== CURRENT_VERSION) {
          setUpdateAvailable(data.html_url);
        }
      }
    } catch (error) {
      console.error('Update check failed:', error);
    }
  };

  if (!updateAvailable) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-3 py-1 bg-blue-600 text-white rounded text-[10px] font-bold shadow-lg shadow-blue-600/20"
    >
      <ArrowUpCircle size={12} className="animate-bounce" />
      UPDATE_AVAILABLE
      <a 
        href={updateAvailable} 
        target="_blank" 
        rel="noopener noreferrer"
        className="ml-2 pl-2 border-l border-white/30 flex items-center gap-1 hover:underline"
      >
        VIEW <ExternalLink size={10} />
      </a>
    </motion.div>
  );
}
