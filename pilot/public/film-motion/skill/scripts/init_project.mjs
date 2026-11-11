#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const own = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const target = args.shift();
if (!target || target.startsWith('--')) { console.error('Usage: node init_project.mjs NEW_PROJECT_DIRECTORY [--template TEMPLATE_DIRECTORY]'); process.exit(1); }
let template = path.resolve(own, '../assets/starter');
if (args.length) { if (args.length !== 2 || args[0] !== '--template') throw new Error('Only --template DIRECTORY is supported'); template = path.resolve(args[1]); }
else { try { await fs.access(template); } catch { template = path.resolve(own, '../template'); } }
const dest = path.resolve(target);
try { await fs.lstat(dest); throw new Error(`Destination already exists: ${dest}`); } catch (e) { if (e.code !== 'ENOENT') throw e; }
await fs.mkdir(path.dirname(dest), { recursive: true });
await fs.cp(template, dest, { recursive: true, errorOnExist: true, force: false, filter: source => !['node_modules', 'renders', '.DS_Store'].includes(path.basename(source)) });
console.log(`Created ${dest}\nNext: cd into the project, npm ci, npx playwright install chromium, npm run check`);
