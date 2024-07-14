module["exports"] = class {
  static config = {
    name: "luffy",
    description: "Talk to Luffy AI",
    prefix: false,
    accessableby: 0,
    author: "Deku",
  };
  static async start({ reply, text, react, event }) {
    const { get } = require("axios");
    try {
      let ask = text.join(" ");
      if (!ask) return reply("Missing prompt!");
      react("😁");
      const rest = (
        await get("https://joshweb.click" + "/pai/luffy?q=" + encodeURI(ask) + '&uid=' + event.senderID)
      ).data;
     react('👊');
      return reply("😁 | 𝙻𝚞𝚏𝚏𝚢 𝙲𝚘𝚗𝚝𝚒𝚗𝚞𝚎𝚜 𝙰𝚒\n━━━━━━━━━━━━━━━━━━\n" +rest.result + '\n━━━━━━━━━━━━━━━━━━\nType “luffy clear” if you want to clear the conversations');
    } catch (e) {
      return reply(e.message);
    }
  }
};
