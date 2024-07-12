module.exports.config = {
  name: "noti", // Command name
  prefix: true, // Whether the command requires a prefix
  accessableby: 1, // Level of access required to use this command
  description: "Send a notification to all groups.", // Description of the command's functionality
  usage: "[msg]" // Usage information for the command
};

module.exports.start = async function({ api, event, text }) {
  // Combine the text array into a single message string
  const message = text.join(" ");
  let groupCount = 0; // Initialize group count

  try {
    // Retrieve the list of threads (conversations) from the inbox
    const threadList = await api.getThreadList(200, null, ["INBOX"]);

    // Iterate through each thread
    for (const thread of threadList) {
      if (thread.isGroup) { // Check if the thread is a group
        groupCount++; // Increment the group count

        const threadName = thread.name || ""; // Get the thread name, or an empty string if it doesn't exist
        const msg = `🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍\n━━━━━━━━━━━━━━━━━━\nNotification for group: ${threadName}\n━━━━━━━━━━━━━━━━━━\n💌 Message: ${message}\n━━━━━━━━━━━━━━━━━━`; // Construct the notification message

        // Send the notification message to the current thread
        await api.sendMessage(msg, thread.threadID);
      }
    }

    // Send a confirmation message indicating the number of groups notified
    await api.sendMessage(`Notification sent to ${groupCount} groups`, event.threadID, event.messageID);

  } catch (error) {
    // Log and handle errors
    console.error('Error occurred:', error);
    await api.sendMessage('An error occurred while sending notifications. Please try again later.', event.threadID, event.messageID);
  }
};
