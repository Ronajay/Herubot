const axios = require('axios');

module.exports = {
  config: {
    name: "ai",
    description: "Talk to GPT (conversational)",
    prefix: false,
    usage: "[ask]",
    accessableby: 0
  },
  start: async function ({ text, reply, react, event }) {
    let prompt = text.join(' ');
    let uid = event.senderID;

    if (!prompt) {
      return reply('Please enter a prompt.');
    }

    react('✨');

    try {
      const response = await axios.get(`https://joshweb.click/api/gpt-4o`, {
        params: { q: prompt, uid: uid }
      });
      const { gpt4 } = response.data;
      return reply(`${gpt4}\n\nTpye “ai clear” to clear the conversation history`);
    } catch (error) {
      return reply(error.message);
    }
  }
};
