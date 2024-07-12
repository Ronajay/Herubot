module.exports = {
  config: {
    name: "blackbox",
    description: "Talk to Blackbox AI (conversational)",
    prefix: false,
    usage: "[ask]",
    accessableby: 0
  },
  start: async function ({ text, reply, react, event }) {
    let p = text.join(' '), uid = event.senderID;
    const axios = require('axios');
    if (!p) return reply('Please enter a prompt.');
    react('🖤');
    try {
      const r = (await axios.get(`https://joshweb.click/api/blackboxai?q=${p}&uid=${uid}`)).data;
      return reply("✅ + 𝙱𝚕𝚊𝚌𝚔𝚋𝚘𝚡 𝙰𝙸 𝙲𝚘𝚗𝚝𝚒𝚗𝚞𝚎𝚜 𝙲𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗𝚊𝚕\n━━━━━━━━━━━━━━━━━━\n" + r.result + "\n━━━━━━━━━━━━━━━━━━\nType “blackbox clear” if you want to clear the conversations");
    } catch (g) {
      return reply(g.message);
    }
  }
                   }
