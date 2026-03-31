// Color replacement script for light theme
const fs = require('fs');
const path = require('path');

const replacements = [
  // Glass backgrounds - white/light instead of transparent white
  [/background: 'rgba\(255, 255, 255, 0\.04\)'/g, "background: 'rgba(255, 255, 255, 0.7)'"],
  [/background: 'rgba\(255, 255, 255, 0\.05\)'/g, "background: 'rgba(255, 255, 255, 0.8)'"],
  [/background: 'rgba\(255, 255, 255, 0\.06\)'/g, "background: 'rgba(255, 255, 255, 0.85)'"],

  // Borders - dark instead of light
  [/border: '1px solid rgba\(255, 255, 255, 0\.08\)'/g, "border: '1px solid rgba(0, 0, 0, 0.08)'"],
  [/border: '1px solid rgba\(255, 255, 255, 0\.1\)'/g, "border: '1px solid rgba(0, 0, 0, 0.1)'"],
  [/border: '1px solid rgba\(255, 255, 255, 0\.12\)'/g, "border: '1px solid rgba(0, 0, 0, 0.12)'"],
  [/border-color: rgba\(255, 255, 255, 0\.08\)/g, "border-color: rgba(0, 0, 0, 0.08)"],
  [/borderColor: 'rgba\(255, 255, 255, 0\.08\)'/g, "borderColor: 'rgba(0, 0, 0, 0.08)'"],

  // Text colors
  [/text-white/g, "text-dark-900"],
  [/color: '#ffffff'/g, "color: '#1A1A24'"],

  // Dark backgrounds for modals/dropdowns
  [/background: 'rgba\(20, 20, 30, 0\.95\)'/g, "background: 'rgba(255, 255, 255, 0.98)'"],
  [/background: 'rgba\(20, 20, 30, 0\.98\)'/g, "background: 'rgba(255, 255, 255, 0.98)'"],
  [/background: 'rgba\(0, 0, 0, 0\.8\)'/g, "background: 'rgba(0, 0, 0, 0.7)'"],

  // Shadows - add instead of remove
  [/boxShadow: 'none'/g, "boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'"],
];

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('Color updates complete!');
