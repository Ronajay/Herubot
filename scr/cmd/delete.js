const fs = require("fs");
const path = require("path");

const adminID = "100077070762554"; // Replace with your actual admin user ID

module.exports.config = {
  name: "delete",
  accessableby: 0,
  author: "heru",
  description: "Delete a specified file",
  usage: "[filename]",
  prefix: true
};

module.exports.start = async function ({ api, event, text }) {
  const senderID = event.senderID;
  
  // Check if the sender is the admin
  if (senderID !== adminID) {
    return api.sendMessage("You do not have permission to use this command.", event.threadID, event.messageID);
  }

  const filename = text.join(" ");

  if (!filename) {
    return api.sendMessage("Please specify the file you want to delete, e.g., !delete ai.js", event.threadID, event.messageID);
  }

  const filePath = path.join(process.cwd(), filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return api.sendMessage(`File not found: ${filename}`, event.threadID, event.messageID);
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return api.sendMessage(`Failed to delete file: ${filename}`, event.threadID, event.messageID);
      }

      return api.sendMessage(`Successfully deleted file: ${filename}`, event.threadID, event.messageID);
    });
  });
};
