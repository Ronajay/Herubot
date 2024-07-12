module.exports.config = {
  name: "st",
  accessableby: 0,
  author: "Deku",
  description: "Get sticker ID",
  usage: "[reply]",
  prefix: true
};

module.exports.start = async function ({ api, event, text }) {
  if (event.type === "message_reply") {
    const attachment = event.messageReply.attachments[0];
    if (attachment && attachment.type === "sticker") {
      return api.sendMessage({
        body: `ID: ${attachment.ID}\nCaption: ${attachment.description || 'No description'}`
      }, event.threadID, event.messageID);
    } else {
      return api.sendMessage("Please reply to a sticker.", event.threadID, event.messageID);
    }
  } else if (text[0]) {
    return api.sendMessage({ sticker: text[0] }, event.threadID, event.messageID);
  } else {
    return api.sendMessage("Please reply to a sticker or provide a sticker ID.", event.threadID, event.messageID);
  }
};
