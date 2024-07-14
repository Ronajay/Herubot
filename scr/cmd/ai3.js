const axios = require("axios");

module.exports.config = {
  name: "ai3",
  accessableby: 0,
  author: "heru",
  description: "Query the GPT-4 API",
  usage: "[question]",
  prefix: false
};

module.exports.start = async function ({ api, event, text }) {
  const query = text.join(" ");

  if (!query) {
    return api.sendMessage("Please provide a question to ask.", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://my-api-v1.onrender.com/api/v1/gpt4?ask=${encodeURIComponent(query)}`);
    const answer = response.data.answer;

    return api.sendMessage("🤖 | 𝙶𝚙𝚝4 (𝚗𝚘𝚗-𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗𝚊𝚕)\n━━━━━━━━━━━━━━━━━━\n" + answer, event.threadID, event.messageID);
  } catch (error) {
    console.error(`Error querying the API: ${error.message}`);
    return api.sendMessage("Failed to query the API. Please try again later.", event.threadID, event.messageID);
  }
};
