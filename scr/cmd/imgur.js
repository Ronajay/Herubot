const axios = require("axios");

class Imgur {
  constructor() {
    this.clientId = "fc9369e9aea767c";
    this.client = axios.create({
      baseURL: "https://api.imgur.com/3/",
      headers: {
        Authorization: `Client-ID ${this.clientId}`
      }
    });
  }

  async uploadImage(url) {
    const response = await this.client.post("image", {
      image: url
    });
    return response.data.data.link;
  }
}

class Modules extends Imgur {
  constructor() {
    super();
  }

  get config() {
    return {
      name: "imgur",
      accessableby: 0,
      description: "Upload to imgur",
      usage: "[reply]",
      prefix: false,
    };
  }

  start = async function ({ api, event }) {
    if (event.type !== "message_reply" || event.messageReply.attachments.length === 0) {
      return api.sendMessage("Please reply with the photo/video/gif that you need to upload", event.threadID, event.messageID);
    }

    const array = [];
    for (let { url } of event.messageReply.attachments) {
      try {
        const res = await this.uploadImage(url);
        array.push(res);
      } catch (err) {
        console.log(err);
      }
    }

    return api.sendMessage(`Uploaded successfully ${array.length} image(s)\nFailed to upload: ${event.messageReply.attachments.length - array.length}\nImage link:\n${array.join("\n")}`, event.threadID, event.messageID);
  }
}

module.exports = new Modules();
