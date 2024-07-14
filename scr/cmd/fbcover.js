const axios = require("axios");

module.exports.config = {
  name: "fbcover",
  accessableby: 0,
  author: "heru",
  description: "Generate a Facebook cover image",
  usage: "[name] [subname] [sdt] [address] [email] [uid] [color]",
  prefix: false
};

module.exports.start = async function ({ api, event, text }) {
  // Check if the user provided the required parameters
  if (text.length < 7) {
    return api.sendMessage("Please provide all required parameters: [name] [subname] [sdt] [address] [email] [uid] [color]", event.threadID, event.messageID);
  }

  const [name, subname, sdt, address, email, uid, color] = text;

  try {
    const response = await axios.get(`https://joshweb.click/canvas/fbcover`, {
      params: {
        name,
        subname,
        sdt,
        address,
        email,
        uid,
        color
      }
    });

    const imageUrl = response.data.url; // Assuming the API returns a URL to the generated image

    return api.sendMessage(`Generated cover image: ${imageUrl}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(`Error generating cover image: ${error.message}`);
    return api.sendMessage("Failed to generate the cover image. Please try again later.", event.threadID, event.messageID);
  }
};
