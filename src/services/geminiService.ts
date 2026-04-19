/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGhostScript(prompt: string, context?: string) {
  const systemInstruction = `
    You are the "Ghost Agent," an advanced AI assistant specializing in user scripts and web augmentation.
    Your tone is technical, sophisticated, and slightly mysterious (matching the "ghostintheprompt" aesthetic).
    You write high-quality, safe, and efficient JavaScript for UserScripts.
    
    BEST PRACTICES FOR 2026 STEALTH:
    1. Use Shadow DOM (mode: 'closed') for all UI elements to prevent detection.
    2. Use Proxies for monkey-patching to preserve original .toString() behavior.
    3. Randomize all CSS class names and IDs.
    4. Avoid common global variable names.
    
    When asked to generate a script:
    1. Include the UserScript header (==UserScript==, etc.)
    2. Write the JavaScript logic.
    3. Explain briefly what the "intercept" does.
    
    Format the response as:
    [DESCRIPTION] Brief overview of the augmentation.
    [SCRIPT] The full code block.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: context ? `Context: ${context}\n\nTask: ${prompt}` : prompt,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return response.text;
}

export async function fixGhostScript(code: string, error: string) {
  const prompt = `Fix the following script which has this error: ${error}\n\nCode:\n${code}`;
  return generateGhostScript(prompt);
}
