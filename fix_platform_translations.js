const fs = require('fs');
let text = fs.readFileSync('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', 'utf8');

// 1. Replace hardcoded Arabic trust levels in buildExG
text = text.replace(
    "const tl = ex.t >= 9 ? 'ثقة عالية' : ex.t >= 7 ? 'متوسطة' : 'منخفضة';",
    "const tl = ex.t >= 9 ? t('trustHigh') : ex.t >= 7 ? t('trustMedium') : t('trustLow');"
);

// 2. Replace hardcoded "تداول ←" in buildExG
text = text.replace(
    '<span class="tbtn">تداول ←</span>',
    '<span class="tbtn">${t(\\\'colTrade\\\')}</span>'
);

// We replace just with ${t('colTrade')} instead of adding hardcoded arrows to keep it clean.
// Or we can add an arrow: '<span class="tbtn">${t(\\\'colTrade\\\')} &rarr;</span>'
// Wait, the original was 'تداول ←' which has an arrow pointing left (RTL).
// RTL users expect left arrow for "go forward". LTR users expect right arrow.
// A safe way is to just use CSS or rely on the text 'Trade' which is clear enough,
// but let's just use '${t(\\\'colTrade\\\')} &rarr;' and it will be fine.
text = text.replace(
    '<span class="tbtn">${t(\\\'colTrade\\\')}</span>',
    '<span class="tbtn">${t(\\\'colTrade\\\')}</span>'
); // keeping it safe

// 3. Ensure default language is English by replacing any fallback to 'ar'
text = text.replace(/localStorage\.getItem\(['"]lang['"]\)\s*\|\|\s*['"]ar['"]/g, "localStorage.getItem('lang') || 'en'");
text = text.replace(/let\s+cLang\s*=\s*['"]ar['"]/, "let cLang = 'en'");

fs.writeFileSync('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', text, 'utf8');
console.log('Update complete.');
