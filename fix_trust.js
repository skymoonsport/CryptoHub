const fs = require('fs');
let text = fs.readFileSync('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', 'utf8');

// 1. Add trustScore to _K
text = text.replace('siteTitle,exchanges,recommendedExchanges,live,', 'siteTitle,exchanges,recommendedExchanges,live,trustScore,');

// 2. Add trustScore translation to all T objects
const translations = {
    'ar': 'الثقة', 'en': 'Trust', 'zh': '信任', 'es': 'Confianza', 'pt': 'Confiança',
    'fr': 'Confiance', 'de': 'Vertrauen', 'it': 'Fiducia', 'ru': 'Доверие', 'tr': 'Güven',
    'ja': '信頼', 'ko': '신뢰', 'hi': 'विश्वास', 'nl': 'Vertrouwen', 'pl': 'Zaufanie',
    'th': 'ความน่าเชื่อถือ', 'vi': 'Độ tin cậy', 'id': 'Kepercayaan', 'uk': 'Довіра', 'fa': 'اعتماد',
    'he': 'אמון', 'cs': 'Důvěra', 'ro': 'Încredere', 'el': 'Εμπιστοσύνη', 'sv': 'Förtroende',
    'da': 'Tillid', 'fi': 'Luottamus', 'ms': 'Kepercayaan', 'bn': 'বিশ্বাস', 'sw': 'Uaminifu'
};

for (const [lang, trans] of Object.entries(translations)) {
    if (['cs', 'ro', 'el', 'sv', 'da', 'fi', 'ms', 'bn', 'sw'].includes(lang)) {
        text = text.replace(`T.${lang} = {`, `T.${lang} = { trustScore: '${trans}', `);
    } else {
        text = text.replace(`\n      ${lang}: {`, `\n      ${lang}: { trustScore: '${trans}',`);
    }
}

// 3. Use it in buildExG
text = text.replace(
    '<span class="text-xs" style="color:${tc}">${ex.t}/10 • ${tl}</span>',
    '<span class="text-xs" style="color:${tc}">${t("trustScore")} ${ex.t}/10 • ${tl}</span>'
);

// 4. Use it in _buildMtlEx
text = text.replace(
    '<div class="mtlex-trust" style="background:${trustGrad}">${ex.t}/10</div>',
    '<div class="mtlex-trust" style="background:${trustGrad}">${t("trustScore")} ${ex.t}/10</div>'
);

fs.writeFileSync('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', text, 'utf8');
console.log('Update complete.');
