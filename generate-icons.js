// Ejecutar con: node generate-icons.js
// Requiere: npm install sharp

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="106" fill="#1F3A5F"/>
  <rect x="90" y="120" width="144" height="256" rx="10" fill="#0F1E30"/>
  <rect x="102" y="132" width="120" height="232" rx="6" fill="#8AAFD4"/>
  <rect x="118" y="166" width="76" height="6" rx="3" fill="#FAF7F0" opacity="0.6"/>
  <rect x="118" y="184" width="88" height="5" rx="2" fill="#FAF7F0" opacity="0.4"/>
  <rect x="118" y="198" width="68" height="5" rx="2" fill="#FAF7F0" opacity="0.4"/>
  <rect x="118" y="218" width="88" height="5" rx="2" fill="#FAF7F0" opacity="0.3"/>
  <rect x="118" y="232" width="60" height="5" rx="2" fill="#FAF7F0" opacity="0.3"/>
  <rect x="272" y="120" width="144" height="256" rx="10" fill="#B8922A"/>
  <rect x="284" y="132" width="120" height="232" rx="6" fill="#F5E9C0"/>
  <rect x="300" y="166" width="76" height="6" rx="3" fill="#8B6914" opacity="0.6"/>
  <rect x="300" y="184" width="88" height="5" rx="2" fill="#8B6914" opacity="0.4"/>
  <rect x="300" y="198" width="68" height="5" rx="2" fill="#8B6914" opacity="0.4"/>
  <rect x="300" y="218" width="88" height="5" rx="2" fill="#8B6914" opacity="0.3"/>
  <rect x="300" y="232" width="60" height="5" rx="2" fill="#8B6914" opacity="0.3"/>
  <rect x="230" y="110" width="36" height="278" rx="8" fill="#0F1E30"/>
  <rect x="244" y="218" width="8" height="46" rx="4" fill="#E1B955"/>
  <rect x="236" y="238" width="24" height="6" rx="3" fill="#E1B955"/>
  <rect x="244" y="150" width="8" height="24" rx="4" fill="#E1B955"/>
  <rect x="236" y="158" width="24" height="6" rx="3" fill="#E1B955"/>
  <text x="256" y="432" font-family="Georgia, serif" font-size="44" font-weight="400" fill="#FAF7F0" text-anchor="middle" letter-spacing="1">Católicum</text>
  <text x="256" y="468" font-family="Georgia, serif" font-size="18" font-weight="400" fill="#E1B955" text-anchor="middle" font-style="italic">La Librería Católica</text>
</svg>`;

const outDir = path.join(__dirname, "public", "icons");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const svgBuffer = Buffer.from(svgContent);

async function generate() {
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(outDir, "icon-192.png"));
  console.log("✅ icon-192.png generado");
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(outDir, "icon-512.png"));
  console.log("✅ icon-512.png generado");
}

generate().catch(console.error);
