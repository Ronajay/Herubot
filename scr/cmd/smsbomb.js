const axios = require("axios");

module.exports.config = {
  name: "smsbomb",
  accessableby: 0,
  author: "heru",
  description: "Send multiple SMS messages to a number",
  usage: "[number] [amount] [delay]",
  prefix: false
};

module.exports.start = async function ({ api, event, text }) {
  // Check if the user provided the required parameters
  if (text.length < 3) {
    return api.sendMessage("Please provide all required parameters: [number] [amount] [delay]", event.threadID, event.messageID);
  }

  const [number, amount, delay] = text;

  try {
    const response = await axios.get(`https://joshweb.click/smsb`, {
      params: {
        number,
        amount,
        delay
      }
    });

    const result = response.data; // Assuming the API returns a result indicating success or failure

    if (result.success) {
      return api.sendMessage(`SMS bomb sent successfully to ${number}`, event.threadID, event.messageID);
    } else {
      return api.sendMessage(`Failed to send SMS bomb to ${number}: ${result.message}`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(`Error sending SMS bomb: ${error.message}`);
    return api.sendMessage("Failed to send SMS bomb. Please try again later.", event.threadID, event.messageID);
  }
};
