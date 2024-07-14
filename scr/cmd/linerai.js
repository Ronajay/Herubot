const axios = require("axios");

module.exports.config = {
  name: "linerai",
  accessableby: 0,
  author: "heru",
  description: "Query the Liner AI API",
  usage: "[prompt]",
  prefix: false
};

module.exports.start = async function ({ api, event, text }) {
  const prompt = text.join(" ");

  if (!prompt) {
    return api.sendMessage("Please provide a prompt to ask.", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://my-api-v1.onrender.com/api/liner?prompt=${encodeURIComponent(prompt)}`);
    const result = response.data.result;

    return api.sendMessage(result, event.threadID, event.messageID);
  } catch (error) {
    console.error(`Error querying the API: ${error.message}`);
    return api.sendMessage("Failed to query the API. Please try again later.", event.threadID, event.messageID);
  }
};
