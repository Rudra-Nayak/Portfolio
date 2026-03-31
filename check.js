const lucide = require('lucide-react');
const icons = ['Github', 'Linkedin', 'Mail', 'ExternalLink', 'Menu', 'X', 'ChevronDown', 'Monitor', 'Code', 'Database', 'Terminal', 'FileText', 'Settings', 'Rocket', 'Briefcase'];
icons.forEach(icon => {
  if (!lucide[icon]) {
    console.log(`Missing icon: ${icon}`);
  }
});
