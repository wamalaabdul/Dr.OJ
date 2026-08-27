import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/App.tsx', 'utf8');

const oldPath = `<path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.15)"/>`;
const oldCircle = `<circle cx="12" cy="10" r="3" fill="#10b981" opacity="0.8"/>`;

const newPaths = `<path d="M6 3h2v5a4 4 0 0 0 8 0V3h2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3v2M14 3v2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 8a4 4 0 0 0 4 4 2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-1" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="15" cy="19" r="2" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5"/>`;

c = c.replace(oldPath, newPaths);
c = c.replace(oldCircle, '');

writeFileSync('src/App.tsx', c, 'utf8');
console.log('done, old pin gone:', !c.includes('M12 2C8 2'), '| stethoscope in:', c.includes('M6 3h2v5'));
