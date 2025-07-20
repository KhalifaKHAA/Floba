import fetch from 'node-fetch';

const handler = async (message, { conn, command, text, isAdmin }) => {
  if (command === "كتم") {
    if (!isAdmin) {
      throw "🥹 *فقط مطوري يمكنه تنفيذ هذا الأمر*";
    }
    
    const botOwner = global.owner[0][0] + "@s.whatsapp.net";
    
    if (message.mentionedJid[0] === botOwner) {
      throw "😼 *لا يمكنك كتم  مطوري💗*";
    }

    let targetJid = message.mentionedJid[0] 
      ? message.mentionedJid[0] 
      : message.quoted 
        ? message.quoted.sender 
        : text;
    
    if (targetJid === conn.user.jid) {
      throw "😾 *لا يمكنك كتم البوت*";
    }

    const groupMetadata = await conn.groupMetadata(message.chat);
    const groupOwner = groupMetadata.owner || message.chat.split('-')[0] + "@s.whatsapp.net";
    
    if (message.mentionedJid[0] === groupOwner) {
      throw "💔 *لا يمكنك كتم صاحب المجموعة*";
    }

    let userData = global.db.data.users[targetJid];

    let responseMessage = {
      'key': {
        'participants': "0@s.whatsapp.net",
        'fromMe': false,
        'id': "Halo"
      },
      'message': {
        'locationMessage': {
          'name': "𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻",
          'jpegThumbnail': await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
        }
      },
      'participant': '0@s.whatsapp.net'
    };

    if (!message.mentionedJid[0] && !message.quoted) {
      return conn.reply(message.chat, "╰⊱🍁⊱ *اذكر الشخص الذي ترغب في كتمه*  ⊱🍁⊱", message);
    }

    if (userData.muto === true) {
      throw "🦋 *هذا المستخدم تم كتمه بالفعل*";
    }

    conn.reply(message.chat, "*`🎀` تم كتم هذا الشخص*", responseMessage, null, {
      'mentions': [targetJid]
    });

    global.db.data.users[targetJid].muto = true;
  } else if (command === 'الغاء-الكتم') {
    if (!isAdmin) {
      throw message.reply("💅🏻 *فقط مطوري يمكنه تنفيذ هذا الأمر*");
    }

    let targetJid = message.mentionedJid[0] 
      ? message.mentionedJid[0] 
      : message.quoted 
        ? message.quoted.sender 
        : text;
    
    let userData = global.db.data.users[targetJid];

    let responseMessage = {
      'key': {
        'participants': "0@s.whatsapp.net",
        'fromMe': false,
        'id': "Halo"
      },
      'message': {
        'locationMessage': {
          'name': "𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻",
          'jpegThumbnail': await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
          'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
        }
      },
      'participant': "0@s.whatsapp.net"
    };

    if (targetJid === message.sender) {
      throw " *😔فقط مطوري  يمكنه رفع الحظر عنك*";
    }

    if (!message.mentionedJid[0] && !message.quoted) {
      return conn.reply(message.chat, "╰⊱🍁⊱ *`اذكر الشخص الذي ترغب في إلغاء كتمه`* ⊱🍁⊱╮", message);
    }

    if (userData.muto === false) {
      throw "🐈‍⬛ *هذا المستخدم لم يتم كتمه من قبل*";
    }

    global.db.data.users[targetJid].muto = false;

    conn.reply(message.chat, "*تم إلغاء كتم هذا 🦋الشخص*", responseMessage, null, {
      'mentions': [targetJid]
    });
  }
};

handler.command = /^(كتم|الغاء-الكتم)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;