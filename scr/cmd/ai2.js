const axios = require('axios');

module.exports = {
  config: {
    name: "ai2",
    description: "Talk to GPT (conversational)",
    prefix: false,
    usage: "[ask]",
    accessableby: 0
  },
  start: async function ({ text, reply, react, event }) {
    try {
      const response = await axios.post('https://joshweb.click/new/gpt-3_5-turbo', { prompt: text });
      if (response.data && response.data.reply) {
        await reply(response.data.reply);
      } else {
        await reply("No response received from the AI.");
      }
    } catch (error) {
      console.error(error);
      await reply("There was an error communicating with the AI.");
    }
  }
};
