import re

with open('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add trustScore to _K
text = text.replace('siteTitle,exchanges,recommendedExchanges,live,', 'siteTitle,exchanges,recommendedExchanges,live,trustScore,')

# 2. Add trustScore translation to all T objects
translations = {
    'ar': 'الثقة', 'en': 'Trust', 'zh': '信任', 'es': 'Confianza', 'pt': 'Confiança',
    'fr': 'Confiance', 'de': 'Vertrauen', 'it': 'Fiducia', 'ru': 'Доверие', 'tr': 'Güven',
    'ja': '信頼', 'ko': '신뢰', 'hi': 'विश्वास', 'nl': 'Vertrouwen', 'pl': 'Zaufanie',
    'th': 'ความน่าเชื่อถือ', 'vi': 'Độ tin cậy', 'id': 'Kepercayaan', 'uk': 'Довіра', 'fa': 'اعتماد',
    'he': 'אמון', 'cs': 'Důvěra', 'ro': 'Încredere', 'el': 'Εμπιστοσύνη', 'sv': 'Förtroende',
    'da': 'Tillid', 'fi': 'Luottamus', 'ms': 'Kepercayaan', 'bn': 'বিশ্বাস', 'sw': 'Uaminifu'
}

for lang, trans in translations.items():
    if lang in ['cs', 'ro', 'el', 'sv', 'da', 'fi', 'ms', 'bn', 'sw']:
        pattern = rf'T\.{lang}\s*=\s*{{'
        repl = f'T.{lang} = {{ trustScore: \'{trans}\', '
        text = re.sub(pattern, repl, text)
    else:
        pattern = rf'(?<!T\.){lang}:\s*{{'
        repl = f'{lang}: {{ trustScore: \'{trans}\', '
        text = re.sub(pattern, repl, text)

# 3. Use it in buildExG
text = text.replace(
    '<span class="text-xs" style="color:${tc}">${ex.t}/10 • ${tl}</span>',
    '<span class="text-xs" style="color:${tc}">${t(\'trustScore\')} ${ex.t}/10 • ${tl}</span>'
)

# 4. Use it in _buildMtlEx
text = text.replace(
    '<div class="mtlex-trust" style="background:${trustGrad}">${ex.t}/10</div>',
    '<div class="mtlex-trust" style="background:${trustGrad}">${t(\'trustScore\')} ${ex.t}/10</div>'
)

with open('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
