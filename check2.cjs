const lucide = require('lucide-react');
const keys = Object.keys(lucide);
console.log('GitHub related:', keys.filter(k => k.toLowerCase().includes('github')));
console.log('LinkedIn related:', keys.filter(k => k.toLowerCase().includes('linkedin')));
console.log('Mail related:', keys.filter(k => k.toLowerCase().includes('mail')));
