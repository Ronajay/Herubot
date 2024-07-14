const axios = require("axios");

module.exports.config = {
  name: "imgur",
  accessableby: 0,
  author: "Deku",
  description: "Upload a photo to Imgur and return the link",
  usage: "[reply to a photo]",
  prefix: true
};

module.exports.start = async function ({ api, event }) {
  const clientId = "fc9369e9aea767c"; // Replace with your actual Imgur client ID

  if (event.type !== "message_reply" || !event.messageReply.attachments.length || event.messageReply.attachments[0].type !== "photo") {
    return api.sendMessage("Please reply to a photo that you want to upload to Imgur.", event.threadID, event.messageID);
  }

  const imageUrl = event.messageReply.attachments[0].url;

  try {
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      {
        image: imageUrl,
      },
      {
        headers: {
          Authorization: `Client-ID ${clientId}`
        }
      }
    );

    const imgurLink = response.data.data.link;

    return api.sendMessage(`Uploaded successfully: ${imgurLink}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(`Error uploading to Imgur: ${error.message}`);
    return api.sendMessage("Failed to upload the photo to Imgur. Please try again later.", event.threadID, event.messageID);
  }
};
