import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/App.tsx', 'utf8');

// 1. Service cards — force green glow border (remove any existing border class first)
c = c.replace(
  /className="glass rounded-3xl overflow-hidden card-hover cursor-pointer border [^"]*"/,
  `className="glass rounded-3xl overflow-hidden card-hover cursor-pointer border border-[#10b981]/40 shadow-[0_0_22px_rgba(16,185,129,0.22)]"`
);

// 2. Footer WhatsApp text
c = c.replace('</svg> WhatsApp', '</svg> +256 704 220704');

// 3. Testimonial cards — inactive ones get a visible green border instead of white/5
c = c.replace(
  `testimonialsSlide === i ? "border-[#10b981]/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]" : "border-white/5"`,
  `testimonialsSlide === i ? "border-[#10b981]/60 shadow-[0_0_40px_rgba(16,185,129,0.18)]" : "border-[#10b981]/20 shadow-[0_0_12px_rgba(16,185,129,0.08)]"`
);

writeFileSync('src/App.tsx', c, 'utf8');
console.log('service card border:', c.includes('border-[#10b981]/40 shadow-[0_0_22px'));
console.log('wa number:', c.includes('+256 704 220704'));
console.log('testimonial inactive border:', c.includes('border-[#10b981]/20'));
