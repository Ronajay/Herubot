module.exports.config = {

  name: "editimg",

  prefix: false,

  accessableby: 0,

  description: "Edit image by AI",

  usage: "[text]"

}

module.exports.start = async function({ event, text, react, reply }) {

  try {
    const prompt = text.join(' ')
    const { Prodia } = require("prodia.js");

    const prodia = new Prodia("70b8b086-24d8-4b14-b870-39efe453e5d3");

    const axios = require("axios"), fs = require('fs');

    let url;

    if (event.type == "message_reply") {

      if (event.messageReply.attachments.length < 0) return reply("No image found.");

      if (event.messageReply.attachments[0].type !== "photo") return reply("Only image can be converted.");

      if (!prompt) return reply('Please enter a prompt');

      url = event.messageReply.attachments[0].url;

      react("⏳");

      reply("Processing...");

      const generate = await prodia.transformImage({
        imageUrl: url,
        prompt,
        model: "absolutereality_v181.safetensors [3d9d4d2b]",
        negative_prompt: "BadDream, (UnrealisticDream:1.3)",
        sampler: "DPM++ SDE Karras",
        cfg_scale: 9,
        steps: 30,
        width: 512,
        height: 768
      })


      while (generate.status !== "succeeded" && generate.status !== "failed") {

        new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {

          let img = (await axios.get(job.imageUrl, { responseType: "arraybuffer" })).data;

          let path = __dirname + '/cache/gen.png';

          fs.writeFileSync(path, Buffer.from(img, "utf-8"))

          return reply({ attachment: fs.createReadStream(path) });

        }

      }

    } else {

      return reply("Please reply to an image.");

    }

  } catch (e) {

    return reply(e.message)

  }

}