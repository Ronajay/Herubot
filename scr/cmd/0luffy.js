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
      return reply("✅ + 𝙲𝚑𝚊𝚛𝚊𝚌𝚝𝚎𝚛 𝙰𝚒\n━━━━━━━━━━━━━━━━━━\n" +rest.result + '\n━━━━━━━━━━━━━━━━━━\nType «clear» to clear the conversation');
    } catch (e) {
      return reply(e.message);
    }
  }
};
