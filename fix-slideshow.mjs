import { readFileSync, writeFileSync } from 'fs';

// Fix App.tsx — reduce scale and set object-position for mobile
let app = readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  `className="w-full h-full object-cover object-center"\r\n                style={{ transform: i === slide ? "scale(1.04)" : "scale(1)", transition: "transform 8s ease" }}`,
  `className="w-full h-full object-cover object-center"\r\n                style={{ transform: i === slide ? "scale(1.02)" : "scale(1)", transition: "transform 8s ease", objectPosition: "center 25%" }}`
);

writeFileSync('src/App.tsx', app, 'utf8');
console.log('App.tsx done');

// Fix index.css — add mobile media query to override zoom and object-position
let css = readFileSync('src/index.css', 'utf8');

const oldBlock = `.slideshow-item.active {\r\n  opacity: 1;\r\n}`;
const newBlock = `.slideshow-item.active {\r\n  opacity: 1;\r\n}\r\n\r\n/* Mobile: pull back zoom, show upper portion of image */\r\n@media (max-width: 767px) {\r\n  .slideshow-item img {\r\n    object-position: center 20% !important;\r\n    transform: scale(1) !important;\r\n  }\r\n}`;

css = css.replace(oldBlock, newBlock);
writeFileSync('src/index.css', css, 'utf8');
console.log('index.css done');
