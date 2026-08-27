import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/App.tsx', 'utf8');

// 1. Service cards — add green glow border, brighter text, visible on mobile (no hover needed)
c = c.replace(
  `<div key={s.title} className="glass rounded-3xl overflow-hidden card-hover cursor-pointer border border-white/5" onClick={() => setPage("services")}>`,
  `<div key={s.title} className="glass rounded-3xl overflow-hidden card-hover cursor-pointer border border-[#10b981]/40 shadow-[0_0_18px_rgba(16,185,129,0.18)]" onClick={() => setPage("services")}>`
);

// 2. Brighter description text on cards (white/45 -> white/70)
c = c.replace(
  `<p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>`,
  `<p className="text-white/75 text-sm leading-relaxed">{s.desc}</p>`
);

// 3. Footer WhatsApp — replace "WhatsApp" text with the number
c = c.replace(
  `</svg> WhatsApp\n              </a>`,
  `</svg> +256 704 220704\n              </a>`
);

writeFileSync('src/App.tsx', c, 'utf8');
console.log('done');
console.log('card border updated:', c.includes('border-[#10b981]/40'));
console.log('text brighter:', c.includes('text-white/75'));
console.log('wa number:', c.includes('+256 704 220704'));
