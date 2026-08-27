import { readFileSync, writeFileSync } from 'fs';

let app = readFileSync('src/App.tsx', 'utf8');

// 1. Add "Email Me" button below the email address in contact card
app = app.replace(
  `<a href="mailto:okellojoseph1410@gmail.com" className="text-white/70 text-sm hover:text-[#10b981] transition-colors break-all">okellojoseph1410@gmail.com</a>\n                  </div>`,
  `<a href="mailto:okellojoseph1410@gmail.com" className="text-white/70 text-sm hover:text-[#10b981] transition-colors break-all">okellojoseph1410@gmail.com</a>\n                    <a href="mailto:okellojoseph1410@gmail.com" className="inline-flex items-center gap-1 mt-1.5 text-[#10b981] text-xs font-bold border border-[#10b981]/40 rounded-full px-3 py-1 hover:bg-[#10b981]/10 transition-colors">Email Me →</a>\n                  </div>`
);

// 2. Mobile dropdown — heavier dark glass background + stronger blur
app = app.replace(
  `<div className="md:hidden glass-dark border-t border-[#10b981]/10 px-6 py-4 space-y-2">`,
  `<div className="md:hidden border-t border-[#10b981]/20 px-6 py-4 space-y-2" style={{background:'rgba(2,5,10,0.92)',backdropFilter:'blur(40px)',WebkitBackdropFilter:'blur(40px)'}}>`
);

writeFileSync('src/App.tsx', app, 'utf8');
console.log('email btn:', app.includes('Email Me →'));
console.log('nav blur:', app.includes('blur(40px)'));
