import makeWASocket, { useSingleFileAuthState, fetchLatestBaileysVersion } from '@fizzxydev/baileys-pro';
import fs from 'fs';

const { state, saveState } = useSingleFileAuthState('./auth.json');
let bannedUsers = new Set();

try {
  bannedUsers = new Set(JSON.parse(fs.readFileSync('./banned.json')));
} catch {
  bannedUsers = new Set();
}

function saveBannedUsers() {
  fs.writeFileSync('./banned.json', JSON.stringify([...bannedUsers]));
}

const startSock = async () => {
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    const sender = m.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const text = m.message.conversation || m.message.extendedTextMessage?.text;

    if (bannedUsers.has(sender)) return;

    if (text?.startsWith('.اسكت')) {
      const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
      if (!mentioned) return sock.sendMessage(sender, { text: 'منشن شخص' }, { quoted: m });

      bannedUsers.add(mentioned);
      saveBannedUsers();
      return sock.sendMessage(sender, { text: 'تم حظره من استخدام البوت ✅' }, { quoted: m });
    }

    if (text?.startsWith('.فك')) {
      const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
      if (!mentioned) return;

      bannedUsers.delete(mentioned);
      saveBannedUsers();
      return sock.sendMessage(sender, { text: 'تم فك الحظر ✅' }, { quoted: m });
    }

    if (text?.startsWith('.تجربه')) {
      return sock.sendMessage(sender, { text: 'رد البوت: تمام 👍' }, { quoted: m });
    }
  });
};

startSock();