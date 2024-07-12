module.exports = {
  config: {
    name: "help",
    accessableby: 0,
    usage: "[page]",
    prefix: true
  },
  start: async function ({ text, reply }) {
    const fs = require("fs");
    try {
      const path = process.cwd() + "/scr/cmd";
      const files = fs.readdirSync(path);
      const commands = files
        .filter(file => file.endsWith(".js"))
        .map(file => require(`${path}/${file}`).config);

      let page;
      let commandsPerPage;
      
      if (text[0] === "all") {
        page = 1;
        commandsPerPage = commands.length;
      } else {
        page = parseInt(text[0], 10) || 1;
        commandsPerPage = 10;
      }
      
      const totalPages = Math.ceil(commands.length / commandsPerPage);

      if (page < 1 || page > totalPages) return reply("Invalid page number.");

      const startIndex = (page - 1) * commandsPerPage;
      const commandList = commands.slice(startIndex, startIndex + commandsPerPage);

      let output = "━━𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂━━\n";
      commandList.forEach((command, index) => {
        output += ` ⊂⊃ ➥ ${command.name}\n`;
      });
      output += "━━━━━━━━━━━━━━━\n";
      output += `━━𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙿𝙰𝙶𝙴 : <${page}/${totalPages}>━━\n`;
      output += "━━HERU CHATBOT AI━━\n";
      output += `Total commands: ${commands.length}\n`;
      output += `Type "help all" to see all commands.`;

      return reply({ body: output });
    } catch (error) {
      return reply(error.message);
    }
  }
};
