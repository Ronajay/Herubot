module.exports = {
  'config': {
    'name': "adm",
    'prefix': false,
    'description': "Add, remove, view bot admin list",
    'usage': "[add/remove/list]",
    'accessableby': 0x0
  },
  'start': async function ({
    api: _0x136fa7,
    event: _0x171ea6,
    text: _0x4b0d3b,
    reply: _0x30acce
  }) {
    try {
      const _0x48e8fa = require('fs');
      const _0x13ab9c = require("axios");
      let _0x348c8 = process.cwd() + "/config.json";
      let _0x519d7 = JSON.parse(_0x48e8fa.readFileSync(_0x348c8));
      let _0x4d795e = _0x4b0d3b[0x0];
      let _0x1a3d09 = _0x4b0d3b[0x1];
      if (_0x4d795e === "list") {
        if (_0x519d7.ADMINBOT.length === 0x0) {
          return _0x136fa7.sendMessage("There's no admin to display.", _0x171ea6.threadID, _0x171ea6.messageID);
        }
        let _0x18739b = '';
        let _0x13ed47 = '';
        let _0x2776b7 = 0x0;
        var _0x586ca5 = [];
        for (let _0x2f8c28 = 0x0; _0x2f8c28 < _0x519d7.ADMINBOT.length; _0x2f8c28++) {
          const _0x5489d9 = (await _0x136fa7.getUserInfo(_0x519d7.ADMINBOT[_0x2f8c28])).name;
          let _0x2846b4 = __dirname + ("/cache/" + _0x2f8c28 + ".png");
          const _0x5a90b7 = (await _0x13ab9c.get("https://graph.facebook.com/" + _0x519d7.ADMINBOT[_0x2f8c28] + "/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
            'responseType': "arraybuffer"
          })).data;
          _0x48e8fa.writeFileSync(_0x2846b4, Buffer.from(_0x5a90b7, "utf-8"));
          _0x586ca5.push(_0x48e8fa.createReadStream(_0x2846b4));
          _0x2776b7 += 0x1;
          _0x18739b += _0x2776b7 + ". Name: " + _0x5489d9 + "\n[ f ]: https://facebook.com/" + _0x519d7.ADMINBOT[_0x2f8c28] + "\n\n";
        }
        _0x13ed47 += "[ ADMIN LIST ]\n\n" + _0x18739b;
        return _0x136fa7.sendMessage({
          'body': _0x13ed47,
          'attachment': _0x586ca5
        }, _0x171ea6.threadID, _0x171ea6.messageID);
      }
      if (_0x4d795e === 'add' || _0x4d795e === '-a' || _0x4d795e === 'a') {
        if (!'100077070762554'.includes(_0x171ea6.senderID)) {
          return _0x136fa7.sendMessage("You don't have permission to this command.", _0x171ea6.threadID, _0x171ea6.messageID);
        }
        _0x519d7.ADMINBOT.push(_0x1a3d09);
        _0x48e8fa.writeFileSync(_0x348c8, JSON.stringify(_0x519d7, null, 0x2));
        return _0x136fa7.sendMessage("Admin added successfully.", _0x171ea6.threadID, _0x171ea6.messageID);
      }
      if (_0x4d795e === "remove" || _0x4d795e === '-r' || _0x4d795e === 'r') {
        if (!'100055943906136'.includes(_0x171ea6.senderID)) {
          return _0x136fa7.sendMessage("You don't have permission to this command.", _0x171ea6.threadID, _0x171ea6.messageID);
        }
        if (_0x519d7.ADMINBOT.length === 0x0) {
          return _0x136fa7.sendMessage("There's no admin to remove.", _0x171ea6.threadID, _0x171ea6.messageID);
        }
        _0x519d7.ADMINBOT.splice(_0x519d7.ADMINBOT.indexOf(_0x1a3d09), 0x1);
        _0x48e8fa.writeFileSync(_0x348c8, JSON.stringify(_0x519d7, null, 0x2));
        return _0x136fa7.sendMessage("Admin removed successfully.", _0x171ea6.threadID, _0x171ea6.messageID);
      } else {
        return _0x136fa7.sendMessage("Invalid use of command.", _0x171ea6.threadID, _0x171ea6.messageID);
      }
    } catch (_0x4e22ab) {
      return _0x30acce(_0x4e22ab.message);
    }
  }
};
