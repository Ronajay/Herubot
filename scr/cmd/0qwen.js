module["exports"] = class {
  static config = {
    name: "qwen",
    description: "Talk to Qwen AI (conversational)",
    prefix: false,
    accessableby: 0,
    author: "Deku",
  };
  static async start({ reply, text, react, event }) {
    const { get } = require("axios");
    try {
      let ask = text.join(" ");
      if (!ask) return reply("Missing prompt!");
      react("⏳");
      const rest = (
        await get("https://joshweb.click" + "/ai/qwen1.5-14b?q=" + encodeURI(ask) + '&uid=' + event.senderID)
      ).data;
     react('❤️');
      return reply("🌺 | 𝚀𝚠𝚎𝚗 𝙲𝚘𝚗𝚝𝚒𝚗𝚞𝚎𝚜 𝙰𝚒\n━━━━━━━━━━━━━━━━━━\n" +rest.result + '\n━━━━━━━━━━━━━━━━━━\nType “qwen clear” if you want to clear the conversations');
    } catch (e) {
      return reply(e.message);
    }
  }
};
