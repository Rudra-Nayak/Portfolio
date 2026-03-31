const si = require('react-icons/si');
const fa = require('react-icons/fa');

const icons = ['SiScikitlearn', 'SiPandas', 'SiTensorflow', 'SiMysql', 'SiPowerbi'];
icons.forEach(i => {
  if (!si[i]) console.log('Missing SI:', i);
});

const faIcons = ['FaReact', 'FaNodeJs', 'FaHtml5', 'FaPython', 'FaJava', 'FaCss3Alt'];
faIcons.forEach(i => {
  if (!fa[i]) console.log('Missing FA:', i);
});
