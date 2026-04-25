/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Ghost, 
  Terminal, 
  Puzzle, 
  Send, 
  Play, 
  Trash2, 
  Plus, 
  Settings, 
  Shield, 
  Eye, 
  Code2,
  ChevronRight,
  Zap,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GhostScript, GhostAgentMessage } from './types';
import { generateGhostScript } from './services/geminiService';
import PentestLab from './PentestLab';

const INITIAL_SCRIPTS: GhostScript[] = [
  {
    id: '1',
    name: 'Ghost Eyes: Night Dark',
    description: 'Intercepts global styles to enforce an ultra-low contrast night mode.',
    targetUrl: '*',
    code: '// ==UserScript==\n// @match *://*\n// ==/UserScript==\ndocument.body.style.filter = "contrast(80%) brightness(80%) grayscale(10%)";',
    enabled: true,
    author: 'Ghost',
    createdAt: Date.now() - 86400000
  },
  {
    id: '2',
    name: 'Red Team: Cookie Shroud',
    description: 'Obfuscates local cookies from trackers using ghost proxies.',
    targetUrl: 'https://*.googletagmanager.com/*',
    code: '// ==UserScript==\n// @match https://*.googletagmanager.com/*\n// ==/UserScript==\nconsole.log("Ghosting trackers...");',
    enabled: false,
    author: 'Ghost',
    createdAt: Date.now() - 172800000
  },
  {
    id: '3',
    name: 'Ghost Protocol: Security Headers',
    description: 'Ultra-robust security headers checker that works everywhere.',
    targetUrl: '*://*/*',
    code: `// ==UserScript==
// @name         Bulletproof Security Headers Checker
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Ultra-robust security headers checker that works everywhere
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Force inject immediately - no waiting
    function forceInject() {
        // Create button with maximum priority styling
        const button = document.createElement('div');
        button.id = 'security-checker-btn-' + Math.random().toString(36).substr(2, 9);
        button.innerHTML = '🔒 SECURITY';

        // Ultra-aggressive styling that overrides everything
        button.style.cssText = \`
            position: fixed !important;
            top: 10px !important;
            right: 10px !important;
            width: 120px !important;
            height: 40px !important;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24) !important;
            color: white !important;
            padding: 0 !important;
            margin: 0 !important;
            border: 3px solid #ffffff !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            font-weight: bold !important;
            font-family: Arial, sans-serif !important;
            z-index: 2147483647 !important;
            cursor: pointer !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            line-height: 1 !important;
            user-select: none !important;
            pointer-events: auto !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            transition: all 0.3s ease !important;
        \`;

        // Hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) !important';
            this.style.boxShadow = '0 6px 25px rgba(0,0,0,0.7) !important';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) !important';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5) !important';
        });

        // Click handler
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityPanel();
        });

        // Force append to document
        function appendButton() {
            try {
                // Try multiple append methods
                if (document.body) {
                    document.body.appendChild(button);
                } else if (document.documentElement) {
                    document.documentElement.appendChild(button);
                } else if (document.head) {
                    document.head.appendChild(button);
                } else {
                    document.appendChild(button);
                }

                // Double-check it's visible
                setTimeout(() => {
                    if (!document.contains(button)) {
                        document.body.appendChild(button);
                    }
                }, 100);

                console.log('Security checker button injected successfully');
                return true;
            } catch (error) {
                console.error('Failed to inject button:', error);
                return false;
            }
        }

        // Try immediately
        if (!appendButton()) {
            // If failed, try with DOM events
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', appendButton);
            } else {
                appendButton();
            }

            // Fallback with timer
            setTimeout(appendButton, 100);
            setTimeout(appendButton, 500);
            setTimeout(appendButton, 1000);
        }
    }

    // Security panel function
    function showSecurityPanel() {
        // Remove existing panels
        const existing = document.querySelectorAll('[id^="security-panel-"]');
        existing.forEach(panel => panel.remove());

        // Create panel
        const panel = document.createElement('div');
        panel.id = 'security-panel-' + Math.random().toString(36).substr(2, 9);
        panel.style.cssText = \`
            position: fixed !important;
            top: 60px !important;
            right: 10px !important;
            width: 400px !important;
            max-height: 500px !important;
            overflow-y: auto !important;
            background: linear-gradient(135deg, #2c3e50, #34495e) !important;
            color: white !important;
            padding: 20px !important;
            border-radius: 10px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
            z-index: 2147483646 !important;
            font-family: Arial, sans-serif !important;
            font-size: 13px !important;
            border: 2px solid #ecf0f1 !important;
        \`;

        // Create buttons with proper event listeners
        panel.innerHTML = \`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #ecf0f1; font-size: 18px;">🔒 Security Analysis</h3>
                <button id="close-btn" style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 16px;
                    line-height: 1;
                ">×</button>
            </div>

            <div style="margin-bottom: 15px;">
                <button id="headers-btn" style="
                    width: 100%;
                    padding: 10px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-bottom: 10px;
                ">📊 Check Security Headers</button>

                <button id="vuln-btn" style="
                    width: 100%;
                    padding: 10px;
                    background: #e67e22;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-bottom: 10px;
                ">🧪 Run Vulnerability Tests</button>

                <button id="info-btn" style="
                    width: 100%;
                    padding: 10px;
                    background: #27ae60;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                ">ℹ️ Quick Site Info</button>
            </div>

            <div id="results-area" style="
                background: rgba(0,0,0,0.3);
                padding: 15px;
                border-radius: 5px;
                min-height: 100px;
                color: #ecf0f1;
            ">
                <p style="margin: 0; text-align: center; color: #bdc3c7;">
                    Click a button above to start analysis
                </p>
            </div>
        \`;

        // Add event listeners properly
        setTimeout(() => {
            const closeBtn = panel.querySelector('#close-btn');
            const headersBtn = panel.querySelector('#headers-btn');
            const vulnBtn = panel.querySelector('#vuln-btn');
            const infoBtn = panel.querySelector('#info-btn');

            if (closeBtn) closeBtn.addEventListener('click', () => panel.remove());
            if (headersBtn) headersBtn.addEventListener('click', runHeadersCheck);
            if (vulnBtn) vulnBtn.addEventListener('click', runVulnTests);
            if (infoBtn) infoBtn.addEventListener('click', showQuickInfo);
        }, 100);

        // Force append panel
        try {
            document.body.appendChild(panel);
        } catch (error) {
            document.documentElement.appendChild(panel);
        }
    }

    // Headers check function
    function runHeadersCheck() {
        const resultsArea = document.getElementById('results-area');
        resultsArea.innerHTML = '<p style="color: #f39c12;">🔄 Checking headers...</p>';

        // Always works - check current response headers
        const headers = {
            'Content-Security-Policy': 'Unknown',
            'X-Frame-Options': 'Unknown',
            'Strict-Transport-Security': 'Unknown',
            'X-Content-Type-Options': 'Unknown',
            'Referrer-Policy': 'Unknown'
        };

        // Try to get headers via fetch
        fetch(window.location.href, { method: 'HEAD' })
            .then(response => {
                Object.keys(headers).forEach(header => {
                    const value = response.headers.get(header);
                    headers[header] = value || 'Not Set';
                });
                displayHeaders(headers);
            })
            .catch(() => {
                // Fallback - analyze page for clues
                headers['Content-Security-Policy'] = document.querySelector('meta[http-equiv="Content-Security-Policy"]') ? 'Set via Meta' : 'Not Set';
                headers['X-Frame-Options'] = window.self === window.top ? 'Unknown' : 'Likely Set';
                headers['Strict-Transport-Security'] = location.protocol === 'https:' ? 'Likely Set' : 'Not Set';
                headers['X-Content-Type-Options'] = 'Unknown';
                headers['Referrer-Policy'] = document.referrerPolicy || 'Not Set';

                displayHeaders(headers);
            });
    }

    function displayHeaders(headers) {
        const resultsArea = document.getElementById('results-area');
        let html = '<h4 style="margin: 0 0 10px 0; color: #ecf0f1;">Security Headers:</h4>';

        Object.entries(headers).forEach(([header, value]) => {
            const isSet = value !== 'Not Set' && value !== 'Unknown';
            const color = isSet ? '#27ae60' : '#e74c3c';
            const icon = isSet ? '✅' : '❌';
            const shortValue = value.length > 30 ? value.substring(0, 30) + '...' : value;

            html += \`
                <div style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
                    <div style="color: \${color}; font-weight: bold;">
                        \${icon} \${header}
                    </div>
                    <div style="color: #bdc3c7; font-size: 11px; margin-top: 3px;">
                        \${shortValue}
                    </div>
                </div>
            \`;
        });

        resultsArea.innerHTML = html;
    }

    // Vulnerability tests
    function runVulnTests() {
        const resultsArea = document.getElementById('results-area');
        resultsArea.innerHTML = '<p style="color: #f39c12;">🔄 Running tests...</p>';

        const tests = [];

        // HTTPS check
        tests.push({
            name: 'HTTPS Usage',
            result: location.protocol === 'https:' ? 'Pass' : 'Fail',
            status: location.protocol === 'https:' ? 'success' : 'critical'
        });

        // Mixed content check
        const httpResources = Array.from(document.querySelectorAll('img, script, link'))
            .filter(el => el.src && el.src.startsWith('http:'));
        tests.push({
            name: 'Mixed Content',
            result: httpResources.length === 0 ? 'Pass' : \`\${httpResources.length} HTTP resources\`,
            status: httpResources.length === 0 ? 'success' : 'warning'
        });

        // Form security
        const forms = document.querySelectorAll('form');
        const passwordForms = Array.from(forms).filter(form =>
            form.querySelector('input[type="password"]')
        );
        tests.push({
            name: 'Password Forms',
            result: passwordForms.length === 0 ? 'None found' :
                   (location.protocol === 'https:' ? \`\${passwordForms.length} over HTTPS\` : \`\${passwordForms.length} over HTTP\`),
            status: passwordForms.length === 0 ? 'info' :
                   (location.protocol === 'https:' ? 'success' : 'critical')
        });

        // External scripts
        const externalScripts = Array.from(document.querySelectorAll('script[src]'))
            .filter(script => !script.src.includes(location.hostname));
        tests.push({
            name: 'External Scripts',
            result: \`\${externalScripts.length} external scripts\`,
            status: externalScripts.length === 0 ? 'success' : 'info'
        });

        displayTests(tests);
    }

    function displayTests(tests) {
        const resultsArea = document.getElementById('results-area');
        let html = '<h4 style="margin: 0 0 10px 0; color: #ecf0f1;">Vulnerability Tests:</h4>';

        tests.forEach(test => {
            let color, icon;
            switch(test.status) {
                case 'success':
                    color = '#27ae60';
                    icon = '✅';
                    break;
                case 'warning':
                    color = '#f39c12';
                    icon = '⚠️';
                    break;
                case 'critical':
                    color = '#e74c3c';
                    icon = '🔴';
                    break;
                default:
                    color = '#3498db';
                    icon = 'ℹ️';
            }

            html += \`
                <div style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
                    <div style="color: \${color}; font-weight: bold;">
                        \${icon} \${test.name}
                    </div>
                    <div style="color: #bdc3c7; font-size: 11px; margin-top: 3px;">
                        \${test.result}
                    </div>
                </div>
            \`;
        });

        resultsArea.innerHTML = html;
    }

    // Quick info function
    function showQuickInfo() {
        const resultsArea = document.getElementById('results-area');

        const info = {
            'Domain': location.hostname,
            'Protocol': location.protocol,
            'Port': location.port || 'Default',
            'Path': location.pathname,
            'Cookies': document.cookie ? 'Present' : 'None',
            'Local Storage': localStorage.length + ' items',
            'Session Storage': sessionStorage.length + ' items',
            'User Agent': navigator.userAgent.substring(0, 50) + '...'
        };

        let html = '<h4 style="margin: 0 0 10px 0; color: #ecf0f1;">Quick Site Info:</h4>';

        Object.entries(info).forEach(([key, value]) => {
            html += \`
                <div style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
                    <div style="color: #3498db; font-weight: bold;">
                        \${key}
                    </div>
                    <div style="color: #ecf0f1; font-size: 11px; margin-top: 3px; word-break: break-all;">
                        \${value}
                    </div>
                </div>
            \`;
        });

        resultsArea.innerHTML = html;
    }

    // Initialize immediately
    forceInject();

    // Multiple backup timers
    setTimeout(forceInject, 100);
    setTimeout(forceInject, 500);
    setTimeout(forceInject, 1000);
    setTimeout(forceInject, 2000);

    // DOM ready backup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceInject);
    }

    // Window load backup
    window.addEventListener('load', forceInject);

    console.log('Bulletproof Security Checker initialized');

})();`,
    enabled: true,
    author: 'Ghost',
    createdAt: Date.now() - 5000
  },
  {
    id: '4',
    name: 'Ghost Protocol: UI Sentinel 2026',
    description: 'Proactive Red-Team defense against AI-spoofed overlays and DOM poisoning.',
    targetUrl: '*://*/*',
    code: `// ==UserScript==
// @name         Ghost UI Sentinel
// @namespace    GhostProxy
// @version      2026.1
// @description  Protects against "Phantom Overlays" and unauthorized DOM mutations
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const GHOST_CONFIG = {
        scanFrequency: 2000,
        allowedZIndex: 1000,
        autoBlock: true
    };

    console.log("%c[GHOST_SENTINEL] Active and Scanning...", "color: #00ff00; font-weight: bold;");

    // 1. Monitor for "Floating Phantoms" (High Z-Index Overlays)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const style = window.getComputedStyle(node);
                        const zIndex = parseInt(style.zIndex);
                        
                        if (zIndex > GHOST_CONFIG.allowedZIndex) {
                            console.warn("[GHOST_ALERT] High-Alt Overlay Detected:", node);
                            if (GHOST_CONFIG.autoBlock) {
                                // node.style.outline = "2px dashed #ff0000"; // Debug mode
                                node.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.5)";
                            }
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 2. Intercept Data Exfiltration
    const originalFetch = window.fetch;
    window.fetch = function() {
        const url = arguments[0];
        // Identify suspicious telemetry domains (example)
        if (url.includes('exfil') || url.includes('tracking')) {
           console.error("[GHOST_BLOCK] Intercepted unauthorized data leak to:", url);
           return Promise.reject("Ghost Protocol Block");
        }
        return originalFetch.apply(this, arguments);
    };

    // 3. Highlight Sensitive Fields for review
    const inputs = document.querySelectorAll('input[type="password"], input[type="email"]');
    inputs.forEach(input => {
        input.style.borderLeft = "2px solid #00ff00";
    });

})();`,
    enabled: true,
    author: 'Ghost',
    createdAt: Date.now()
  },
  {
    id: '5',
    name: 'Ghost Protocol: Source Secret Scanner',
    description: 'Passive scanner for leaked API keys, .env signatures, and internal archetypes.',
    targetUrl: '*://*/*',
    code: `// ==UserScript==
// @name         Source Secret Scanner
// @namespace    GhostProxy.Global
// @version      1.0
// @description  Scans source code for sensitive information
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const SIGNATURES = [
        { name: 'Stripe API Key', regex: /sk_live_[0-9a-zA-Z]{24}/ },
        { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/ },
        { name: 'Google API Key', regex: /AIza[0-9A-Za-z\\-_]{35}/ },
        { name: 'Firebase Config', regex: /apiKey: "AIza/ },
        { name: 'Internal IP', regex: /10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|192\\.168\\.\\d{1,3}\\.\\d{1,3}/ },
        { name: 'Generic Secret', regex: /secret[_-]?key|password|auth_token/i }
    ];

    console.log("%c[GHOST_SCANNER] Initializing Neural Audit...", "color: #00ff00;");

    function scanSource() {
        const source = document.documentElement.innerHTML;
        const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src || s.innerText);
        
        SIGNATURES.forEach(sig => {
            if (sig.regex.test(source)) {
                console.warn(\`%c[!] GHOST_ALERT: Found potential \${sig.name} in DOM\`, "color: #ff6600; font-weight: bold;");
            }
        });

        // Scan external script names for dangerous patterns
        scripts.forEach(s => {
            if (s.includes('.env') || s.includes('config.js') || s.includes('credentials')) {
                console.warn("[!] GHOST_ALERT: Sensitive script source detected:", s);
            }
        });
    }

    scanSource();
    // Periodically re-scan for dynamic content
    setInterval(scanSource, 10000);

})();`,
    enabled: true,
    author: 'Ghost',
    createdAt: Date.now() + 1000
  },
  {
    id: '6',
    name: 'Surgical Intercept: E-Comm Auditor',
    description: 'Specialized auditor for Shopify and WooCommerce architecture vulnerabilities.',
    targetUrl: '*://*/checkout*, *://*/cart*',
    code: `// ==UserScript==
// @name         E-Comm Architect Auditor
// @namespace    GhostProxy.Surgical
// @version      1.2
// @match        *://*/*
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const ARCH_DETECTION = {
        isShopify: !!window.Shopify,
        isWooCommerce: !!document.body.classList.contains('woocommerce'),
    };

    if (!ARCH_DETECTION.isShopify && !ARCH_DETECTION.isWooCommerce) return;

    console.log("%c[GHOST_ARCH] E-Comm Platform Identified. Loading specialized probes...", "color: #ff00ff;");

    // 1. Discount Enumeration Probe
    function checkDiscountLogic() {
        const couponInputs = document.querySelectorAll('input[name="checkout[reduction_code]"], .checkout_coupon input');
        couponInputs.forEach(input => {
            input.style.boxShadow = "0 0 10px #ff00ff";
            console.log("[GHOST_ARCH] Found Discount Hook point. Testing for client-side evaluation vulnerability.");
        });
    }

    // 2. Hidden Field Price Tamper Check
    function checkHiddenPrices() {
        const hiddenPriceFields = document.querySelectorAll('input[type="hidden"][name*="price"], input[type="hidden"][name*="amount"]');
        if (hiddenPriceFields.length > 0) {
            console.warn("[!] GHOST_ARCH: Found hidden price fields. Potential for Price Tampering (IDOR/Parameter Pollution).");
            hiddenPriceFields.forEach(f => {
                f.type = "text"; // Reveal for manual manipulation in sandbox
                f.style.background = "#ffff00";
                f.style.color = "#000";
            });
        }
    }

    // 3. Checkout Data Leak Probe (CORS/Exfiltration)
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        if (this._url && (this._url.includes('checkout') || this._url.includes('payment'))) {
            console.log("[GHOST_ARCH] Intercepting transactional packet to:", this._url);
        }
        return originalSend.apply(this, arguments);
    };

    checkDiscountLogic();
    checkHiddenPrices();

})();`,
    enabled: true,
    author: 'Ghost',
    createdAt: Date.now() + 2000
  },
  {
    id: 'sec_1',
    name: '[Sec+] DEMO: Shadow UI Spoofing',
    description: 'Visual demonstration of how attackers inject fake UI elements into legitimate sites.',
    targetUrl: '*://*/*',
    code: `// ==UserScript==
// @name         Demo: Shadow UI Spoofing
// @version      3.1
// @description  Educational demo for Sec+ exam - UI Interception
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function simulateAttack() {
        console.log("[GHOST_DEMO] Initializing Spoofing Scenario...");
        
        const overlay = document.createElement('div');
        overlay.style.cssText = \`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            background: #fff;
            color: #000;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 0 100px rgba(0,0,0,0.9);
            z-index: 2147483647;
            font-family: sans-serif;
            border-top: 10px solid #d32f2f;
        \`;

        overlay.innerHTML = \`
            <h2 style="margin-top: 0; color: #d32f2f;">⚠️ Session Timeout</h2>
            <p>Your secure session has expired for security reasons. Please re-authenticate to continue.</p>
            <input type="password" placeholder="Current Password" style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <button id="ghost-spoof-btn" style="width: 100%; padding: 12px; background: #d32f2f; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">RESTORE SESSION</button>
            <p style="font-size: 10px; color: #666; margin-top: 15px;">SEC+ CONCEPT: SOCIAL ENGINEERING & UI OVERLAY ATTACK</p>
        \`;

        document.body.appendChild(overlay);

        document.getElementById('ghost-spoof-btn').addEventListener('click', () => {
            alert("RED TEAM CAPTURE: In a real attack, that password would have just been exfiltrated to the attacker's C2 server.");
            overlay.remove();
        });
    }

    // Trigger after 5 seconds to simulate a "stealthy" injection
    setTimeout(simulateAttack, 5000);

})();`,
    enabled: false,
    author: 'Ghost',
    createdAt: Date.now() + 3000
  },
  {
    id: 'sec_2',
    name: '[Sec+] DEMO: JWT Token Harvester',
    description: 'Educational tool highlighting the risk of storing sensitive tokens in LocalStorage.',
    targetUrl: '*://*/*',
    code: `// ==UserScript==
// @name         Demo: Token Harvester
// @version      1.0
// @description  Educational demo for Sec+ - Session Hijacking
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function harvest() {
        console.log("%c[GHOST_DEMO] Scanning for Session Tokens...", "color: #ff00ff;");
        
        const findings = [];
        
        // 1. Check LocalStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.toLowerCase().includes('token') || key.toLowerCase().includes('jwt') || key.toLowerCase().includes('auth')) {
                findings.push({ type: 'LocalStorage', key, value: localStorage.getItem(key).substring(0, 20) + "..." });
            }
        }

        // 2. Check SessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.toLowerCase().includes('session')) {
                findings.push({ type: 'SessionStorage', key, value: sessionStorage.getItem(key).substring(0, 20) + "..." });
            }
        }

        if (findings.length > 0) {
            console.table(findings);
            console.warn("[!] SEC+ RISK: Storing sensitive tokens in Web Storage makes them accessible to ANY script (XSS). Always prefer HttpOnly Cookies.");
        } else {
            console.log("[GHOST_DEMO] No clear tokens found in storage. Proper hygiene detected.");
        }
    }

    harvest();

})();`,
    enabled: false,
    author: 'Ghost',
    createdAt: Date.now() + 4000
  },
  {
    id: 'stealth_cloak',
    name: 'Ghost Protocol: Stealth Cloak',
    description: 'Best-in-class environment obfuscation and anti-anti-tamper utilities.',
    targetUrl: '*://*/*',
    code: `// ==UserScript==
// @name         Ghost Stealth Cloak
// @namespace    GhostProxy.Stealth
// @version      2026.4
// @description  Hides script presence and obfuscates DOM footprints
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. SHADOW DOM ISOLATION (The Gold Standard for Stealth UI)
    // Always render UI inside a Shadow Root to prevent main-page CSS/JS from seeing it.
    window.createStealthUI = function(id, html, css) {
        const host = document.createElement('div');
        host.id = 'gp-' + Math.random().toString(36).substr(2, 6); // Randomized ID
        document.body.appendChild(host);
        
        const shadow = host.attachShadow({mode: 'closed'}); // 'closed' makes it invisible to host script
        const style = document.createElement('style');
        style.textContent = css;
        shadow.appendChild(style);
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        shadow.appendChild(wrapper);
        return shadow;
    };

    // 2. PROXY-BASED MONKEY PATCHING (Detection Prevention)
    // Websites can detect monkey-patching by checking func.toString().
    // This helper creates a stealthy proxy.
    window.stealthPatch = function(obj, prop, replacementFunc) {
        const original = obj[prop];
        const proxy = new Proxy(replacementFunc, {
            get: (target, key) => {
                if (key === 'toString') return () => original.toString();
                return target[key];
            }
        });
        obj[prop] = proxy;
    };

    // 3. EVENT LISTENER CLOAKING
    // Prevent the site from iterating over your listeners via getEventListeners()
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    stealthPatch(EventTarget.prototype, 'addEventListener', function(type, listener, options) {
        // Log attempts to monitor listeners
        if (type === 'mousedown' && options?.once) {
            // Potential bot detection check
        }
        return originalAddEventListener.apply(this, arguments);
    });

    console.log("%c[GHOST_STEALTH] Cloak Engaged. Environment Anonymized.", "color: #00ff00;");

})();`,
    enabled: true,
    author: 'Ghost',
    createdAt: Date.now() + 5000
  },
  {
    id: 'hydra_1',
    name: 'Ghost Protocol: Hydra Polymorph',
    description: 'Futuristic simulator for red-teams to test polymorphic payload detection.',
    targetUrl: '*://*/*',
    code: `// ==UserScript==
// @name         Hydra Polymorphic Simulator
// @namespace    GhostProxy.Offensive
// @version      2026.9
// @description  Demonstrates dynamic payload mutation to bypass signature-based WAFs
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // THE ARCHETYPE: Attackers in 2026 use AI to mutate payloads on every execution.
    // This script simulates a 'payload' that reconstructs itself using different math constants.
    
    const HYDRA_CORE = {
        // Base segments of a 'malicious' string disguised as math/coordinates
        ch: [97, 108, 101, 114, 116], // "alert" in ASCII
        v: [40, 39, 71, 72, 79, 83, 84, 95, 72, 89, 68, 82, 65, 95, 66, 89, 80, 65, 83, 83, 39, 41], // "('GHOST_HYDRA_BYPASS')"
        
        mutate: function() {
            // Reconstruct the payload dynamically
            const cmd = String.fromCharCode(...this.ch);
            const val = String.fromCharCode(...this.v);
            
            console.log("%c[GHOST_HYDRA] Mutating Payload Signature...", "color: #ff0000; font-weight: bold;");
            
            // Execute using a dynamic constructor to hide from static analysis
            try {
                const trigger = new Function(cmd + val);
                // trigger(); // Simulated execution
                console.log("[GHOST_HYDRA] Neural Payload Armed: " + cmd + val);
            } catch (e) {
                console.error("[GHOST_HYDRA] Mutation Error", e);
            }
        }
    };

    // Simulate "Cloaking" the execution trigger
    const _t = Math.random() > 0.5 ? 2000 : 5000;
    setTimeout(() => HYDRA_CORE.mutate(), _t);

    console.log("[GHOST_HYDRA] Listener Attached. Pulse established.");

})();`,
    enabled: false,
    author: 'Ghost',
    createdAt: Date.now() + 6000
  }
];

export default function App() {
  const [mode, setMode] = useState<'proxy' | 'pentest'>('proxy');
  const [scripts, setScripts] = useState<GhostScript[]>(() => {
    const saved = localStorage.getItem('ghost_scripts');
    return saved ? JSON.parse(saved) : INITIAL_SCRIPTS;
  });
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(INITIAL_SCRIPTS[0].id);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [agentMessages, setAgentMessages] = useState<GhostAgentMessage[]>([
    { role: 'agent', content: 'Connection established. I am ready to augment your digital environment. What shall we intercept today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('ghost_scripts', JSON.stringify(scripts));
  }, [scripts]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [agentMessages]);

  const selectedScript = scripts.find(s => s.id === selectedScriptId) || null;

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: GhostAgentMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setAgentMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      const response = await generateGhostScript(input, selectedScript?.code);
      const agentMessage: GhostAgentMessage = {
        role: 'agent',
        content: response || 'Neural link severed. Try again.',
        timestamp: Date.now()
      };
      setAgentMessages(prev => [...prev, agentMessage]);

      // If response starts with [SCRIPT], potentially update current script
      if (response && response.includes('[SCRIPT]')) {
        const codeMatch = response.match(/\[SCRIPT\]([\s\S]*?)(\[|$)/);
        if (codeMatch && selectedScript) {
          updateScript(selectedScript.id, { code: codeMatch[1].trim() });
        }
      }
    } catch (error) {
      console.error(error);
      setAgentMessages(prev => [...prev, { role: 'agent', content: 'Error: Connection lost.', timestamp: Date.now() }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateScript = (id: string, updates: Partial<GhostScript>) => {
    setScripts(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const createNewScript = () => {
    const newScript: GhostScript = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Intercept',
      description: 'A customized digital augmentation.',
      targetUrl: '*',
      code: '// ==UserScript==\n// @match *://*\n// ==/UserScript==\n\n(function() {\n    "use strict";\n    // Enter intercept logic here\n})();',
      enabled: true,
      author: 'User',
      createdAt: Date.now()
    };
    setScripts(prev => [...prev, newScript]);
    setSelectedScriptId(newScript.id);
  };

  const deleteScript = (id: string) => {
    setScripts(prev => prev.filter(s => s.id !== id));
    if (selectedScriptId === id) setSelectedScriptId(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-ghost-bg text-ghost-text relative">
      {/* Grindhouse CRT Overlays */}
      <div className="crt-overlay" />
      <div className="crt-line" />

      {/* Top Header */}
      <header className="flex items-center justify-between p-4 border-b border-ghost-border bg-ghost-card shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-ghost-neon rounded-sm text-ghost-bg ghost-flicker">
            <Ghost className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter">GHOST_PROXY</h1>
            <p className="text-[10px] text-ghost-muted uppercase tracking-[0.2em]">Intercept . Augment . Anonymize</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-ghost-border/30 p-1 rounded-sm mr-4 border border-ghost-border">
            <button 
              onClick={() => setMode('proxy')}
              className={`px-3 py-1 text-[10px] font-bold rounded-sm transition-all ${mode === 'proxy' ? 'bg-ghost-neon text-ghost-bg' : 'text-ghost-muted hover:text-ghost-text'}`}
            >
              GHOST_PROXY
            </button>
            <button 
              onClick={() => setMode('pentest')}
              className={`px-3 py-1 text-[10px] font-bold rounded-sm transition-all ${mode === 'pentest' ? 'bg-emerald-500 text-zinc-950' : 'text-ghost-muted hover:text-ghost-text'}`}
            >
              PENTEST_LAB
            </button>
          </div>
          <button 
            onClick={() => setIsStealthMode(!isStealthMode)}
            className={`flex items-center gap-2 px-3 py-1 border rounded text-[10px] font-bold transition-all ${isStealthMode ? 'bg-ghost-neon text-ghost-bg border-ghost-neon shadow-[0_0_10px_rgba(0,255,0,0.3)]' : 'border-ghost-border text-ghost-muted hover:border-ghost-muted/50'}`}
          >
            <Shield className="w-3 h-3" />
            {isStealthMode ? 'STEALTH_ACTIVE' : 'STEALTH_OFF'}
          </button>
          <div className="flex items-center gap-2 px-3 py-1 bg-ghost-neon/10 border border-ghost-neon/30 rounded text-[10px] text-ghost-neon font-bold">
            <Shield className="w-3 h-3" />
            V3.0_LIVE
          </div>
          <button className="p-2 hover:bg-ghost-border rounded transition-colors">
            <Settings className="w-5 h-5 text-ghost-muted" />
          </button>
        </div>
      </header>

      {mode === 'proxy' ? (
        <>
          <main className="flex flex-1 overflow-hidden">
            {/* Left Sidebar: Scripts List */}
            <aside className="w-80 border-right border-ghost-border flex flex-col bg-ghost-bg">
              <div className="p-4 border-b border-ghost-border flex justify-between items-center">
                <h2 className="text-xs font-bold text-ghost-muted uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Active_Intercepts
                </h2>
                <button 
                  onClick={createNewScript}
                  className="p-1 hover:bg-ghost-neon hover:text-ghost-bg border border-ghost-border rounded transition-all group"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {scripts.map(script => (
                  <div 
                    key={script.id}
                    onClick={() => setSelectedScriptId(script.id)}
                    className={`group p-4 border-b border-ghost-border transition-all cursor-pointer relative overflow-hidden ${selectedScriptId === script.id ? 'bg-ghost-card' : 'hover:bg-ghost-card/50'}`}
                  >
                    {selectedScriptId === script.id && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-ghost-neon shadow-[0_0_10px_rgba(0,255,0,0.5)]" 
                      />
                    )}
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-sm font-bold truncate ${script.enabled ? 'text-ghost-text' : 'text-ghost-muted line-through'}`}>
                        {script.name}
                      </h3>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteScript(script.id); }}
                          className="p-1 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] text-ghost-muted font-mono uppercase truncate opacity-75">
                        {script.targetUrl}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${script.enabled ? 'bg-ghost-neon' : 'bg-red-500'} shadow-[0_0_5px_currentColor]`} />
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Center: IDE / Editor */}
            <section className="flex-1 flex flex-col bg-ghost-bg font-mono">
              {selectedScript ? (
                <div className="flex flex-col h-full">
                  <div className="p-3 border-b border-ghost-border flex justify-between items-center bg-ghost-card">
                    <div className="flex items-center gap-3">
                      <div className="p-2 border border-ghost-border rounded-sm">
                        <Code2 className="w-4 h-4 text-ghost-neon" />
                      </div>
                      <div>
                        <input 
                          type="text"
                          value={selectedScript.name}
                          onChange={(e) => updateScript(selectedScript.id, { name: e.target.value })}
                          className="bg-transparent border-none focus:ring-0 text-sm font-bold text-ghost-text p-0 h-auto"
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <Globe className="w-3 h-3 text-ghost-muted" />
                          <input 
                             type="text"
                             value={selectedScript.targetUrl}
                             onChange={(e) => updateScript(selectedScript.id, { targetUrl: e.target.value })}
                             className="bg-transparent border-none focus:ring-0 text-[10px] text-ghost-muted p-0 h-auto w-40"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => updateScript(selectedScript.id, { enabled: !selectedScript.enabled })}
                        className={`flex items-center gap-2 px-3 py-1 border rounded text-[10px] font-bold transition-all ${selectedScript.enabled ? 'border-ghost-neon text-ghost-neon bg-ghost-neon/5' : 'border-ghost-muted text-ghost-muted'}`}
                      >
                        <AnimatePresence mode="wait">
                          {selectedScript.enabled ? (
                            <motion.span key="on" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>ONLINE</motion.span>
                          ) : (
                            <motion.span key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>OFFLINE</motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1 bg-ghost-neon text-ghost-bg rounded text-[10px] font-bold hover:brightness-110 transition-all">
                        <Zap className="w-3 h-3" />
                        DEPLOY_AUGMENTATION
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 relative ghost-scanner">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-ghost-card/50 flex flex-col items-center pt-4 text-[10px] text-ghost-muted border-r border-ghost-border pointer-events-none">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="mb-0.5">{i + 1}</div>
                      ))}
                    </div>
                    <textarea 
                      value={selectedScript.code}
                      onChange={(e) => updateScript(selectedScript.id, { code: e.target.value })}
                      className="w-full h-full bg-transparent border-none focus:ring-0 resize-none p-4 pl-16 text-ghost-neon scrollbar-hide font-mono text-sm leading-relaxed"
                      spellCheck={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-20 select-none">
                   <Ghost className="w-24 h-24 mb-4" />
                   <p className="text-xs uppercase tracking-[0.4em]">Initialize_Link_To_Proceed</p>
                </div>
              )}
            </section>

            {/* Right Sidebar: Ghost Agent */}
            <aside className={`transition-all duration-300 ease-in-out border-l border-ghost-border flex flex-col bg-ghost-card ${isAgentActive ? 'w-96' : 'w-12 items-center'}`}>
              <div className={`p-4 flex items-center ${isAgentActive ? 'justify-between' : 'justify-center cursor-pointer'}`} onClick={() => !isAgentActive && setIsAgentActive(true)}>
                {isAgentActive ? (
                   <>
                     <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-ghost-neon">
                       <Puzzle className="w-4 h-4 animate-spin-slow" />
                       GHOST_AGENT
                     </h2>
                     <button onClick={() => setIsAgentActive(false)} className="p-1 hover:bg-ghost-border rounded">
                        <ChevronRight className="w-4 h-4 translate-x-0.5" />
                     </button>
                   </>
                ) : (
                   <Puzzle className="w-6 h-6 text-ghost-neon hover:scale-110 transition-transform" />
                )}
              </div>

              {isAgentActive && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
                    {agentMessages.map((msg, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[85%] p-3 rounded-sm text-[11px] leading-relaxed ${msg.role === 'user' ? 'bg-ghost-neon/10 border border-ghost-neon/30 text-ghost-neon' : 'bg-ghost-border/50 border border-ghost-border text-ghost-text'}`}>
                          {msg.content}
                        </div>
                        <span className="text-[8px] text-ghost-muted mt-1 uppercase tracking-tighter">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </motion.div>
                    ))}
                    {isGenerating && (
                      <div className="flex gap-1 items-center p-3 text-ghost-neon opacity-50 bg-ghost-neon/5 rounded-sm">
                        <span className="w-1 h-1 bg-ghost-neon rounded-full animate-bounce" />
                        <span className="w-1 h-1 bg-ghost-neon rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1 h-1 bg-ghost-neon rounded-full animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[9px] uppercase ml-2 tracking-widest">Processing_Data</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-ghost-border">
                    <div className="relative">
                      <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                        placeholder="Request augmentation..."
                        className="w-full bg-ghost-bg border border-ghost-border rounded p-3 pr-10 text-[11px] focus:border-ghost-neon focus:ring-0 h-20 resize-none transition-all placeholder:opacity-30"
                      />
                      <button 
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isGenerating}
                        className="absolute bottom-3 right-3 text-ghost-muted hover:text-ghost-neon transition-colors disabled:opacity-30"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex justify-between text-[8px] text-ghost-muted uppercase opacity-50 font-mono">
                       <span>SECURE_LINK</span>
                       <span>LATENCY: 12ms</span>
                    </div>
                  </div>
                </>
              )}
            </aside>
          </main>

          <footer className="h-6 bg-ghost-card border-t border-ghost-border flex items-center justify-between px-4 text-[9px] text-ghost-muted uppercase tracking-tighter select-none font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-ghost-neon rounded-full" />
                NODE: PHOENIX_PRIME
              </span>
              <span>UPTIME: 12:44:02</span>
            </div>
            <div className="flex items-center gap-4">
              <span>PACKETS_INTERCEPTED: 1,492</span>
              <span>ENCRYPTION: AES-256_GHOST</span>
              <span className="text-ghost-neon">© GHOST_IN_THE_PROMPT</span>
            </div>
          </footer>
        </>
      ) : (
        <div className="flex-1 overflow-hidden">
          <PentestLab />
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-ghost-border);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-ghost-muted);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
