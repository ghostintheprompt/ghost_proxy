# Building Ghost Proxy

This guide covers building Ghost Proxy from source for development or production deployment.

## Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## Build Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ghostintheprompt/ghost-proxy.git
   cd ghost-proxy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a .env file in the root directory (optional, for Gemini AI features):
   ```bash
   VITE_GEMINI_API_KEY=your_key_here
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```
   The build artifacts will be located in the dist/ directory.

## Cross-Platform Verification (M1 + Linux/UTM)
Ghost Proxy is optimized for a dual-tier testing environment:

### macOS M1/M2 Build
The DMG build (`make_dmg.sh`) is designed for native Apple Silicon. It provides the best performance for the Neural Exploit Lab and is required for functional mastery of the PF Firewall module.

### Linux / UTM Build
To test the repo on Linux with external hardware (Alfa adapters):
1. Run `npm run build` on your host or within the UTM environment.
2. If building on the host, move the `dist/` directory to your Linux VM.
3. Serve the directory using a lightweight proxy: `python3 -m http.server 8080`.
4. Point your Alfa-connected browser to `localhost:8080` to carry out network-wide injection tests.

## Troubleshooting
- Vite Build Failures: Ensure node_modules is clean by running npm run clean then npm install.
- API Errors: Verify your VITE_GEMINI_API_KEY is valid and has access to the Gemini 3.1 Pro models.
- PF Permissions: On macOS, the PF firewall requires sudo privileges to actually load rules into the kernel. The Orchestrator exports the config for manual loading via sudo pfctl -f pf.conf.
