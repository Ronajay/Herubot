module.exports.config = {
  name: "out",
  accessableby: 0,
  author: "heru",
  description: "Kick user from group",
  usage: "[mention user]",
  prefix: true
};

module.exports.start = async function ({ api, event }) {
  // Check if the message contains mentions
  if (!event.mentions || Object.keys(event.mentions).length === 0) {
    return api.sendMessage("Please mention the user you want to kick.", event.threadID, event.messageID);
  }

  // Extract the first mentioned user ID
  const mentionedUserId = Object.keys(event.mentions)[0];

  // Attempt to remove the mentioned user from the group
  try {
    await api.removeUserFromGroup(mentionedUserId, event.threadID);
    return api.sendMessage(`Successfully kicked the user from the group.`, event.threadID, event.messageID);
  } catch (error) {
    return api.sendMessage(`Failed to kick the user. Error: ${error.message}`, event.threadID, event.messageID);
  }
};
