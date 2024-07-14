module.exports = {
  config: {
    name: "ai2",
    description: "Talk to GPT (conversational)",
    prefix: false,
    usage: "[ask]",
    accessableby: 0
  },
  start: async function ({ text, reply, react, event}) {
    let p = text.join(' '), uid = event.senderID;
    const axios = require('axios');
    if (!p) return reply('Please enter a prompt.');
    react('🤖');
    try {
      const r = (await axios.get(`https://markdevs-api.onrender.com/gpt3?prompt=${p}&uid=${uid}`)).data;
      return reply("🌟 | 𝙶𝚙𝚝3 𝙲𝚘𝚗𝚝𝚒𝚗𝚞𝚎𝚜 𝙰𝚒\n━━━━━━━━━━━━━━━━━━\n" + r.gpt3 + "\n━━━━━━━━━━━━━━━━━━\nType “ai clear” if you want to clear the conversations");
    } catch (g) {
      return reply(g.message);
    }
  }
}
