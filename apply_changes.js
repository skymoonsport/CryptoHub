const fs = require('fs');
let html = fs.readFileSync('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', 'utf8');

// 1. Hide ASK icon
html = html.replace('<button class="ai-fab" id="aiFab" title="Ask">', '<button class="ai-fab" id="aiFab" title="Ask" style="display:none!important;">');

// 2. Add openLegal / closeLegal
const legalScript = `
    function openLegal(id) { document.getElementById(id).classList.add('active'); }
    function closeLegal(id) { document.getElementById(id).classList.remove('active'); }
`;
if (!html.includes('function openLegal')) {
    html = html.replace('<script>', '<script>\n' + legalScript);
}

// 3. SEO Meta Tags & Google AdSense
const seoTags = `
  <meta name="description" content="CryptoHub provides real-time cryptocurrency prices, market analysis, exchange reviews, and AI-powered insights. Track Bitcoin, Ethereum, and thousands of altcoins.">
  <meta name="keywords" content="crypto, cryptocurrency, bitcoin, ethereum, altcoins, crypto prices, market analysis, crypto exchanges, cryptohub, أسعار العملات الرقمية, بيتكوين, إيثريوم, منصات تداول">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossorigin="anonymous"></script>
`;
if (!html.includes('name="description"')) {
    html = html.replace('</title>', '</title>\n' + seoTags);
}

// 4. Code Protection (prevent right click, F12, Ctrl+U)
const protectionScript = `
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U') || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
      }
    });
`;
if (!html.includes('contextmenu')) {
    html = html.replace('<script>', '<script>\n' + protectionScript);
}

fs.writeFileSync('c:/Users/DECRYPT/Downloads/New folder (3)/index.html', html, 'utf8');
console.log('Changes applied successfully');
