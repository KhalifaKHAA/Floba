const handler = async function(m, { conn }) {
  const groupId = m.chat;
  const groupMetadata = await conn.groupMetadata(groupId);
  const participants = groupMetadata.participants.map(p => p.id);

  let registeredCount = 0;
  let unregisteredUsers = [];
  let nicknames = {};

  for (let key in global.db.data.users) {
    const user = global.db.data.users[key];
    if (user.groups && user.groups[groupId] && user.groups[groupId].name) {
      const firstLetter = user.groups[groupId].name.charAt(0).toUpperCase();
      if (!nicknames[firstLetter]) nicknames[firstLetter] = [];
      nicknames[firstLetter].push({ name: user.groups[groupId].name, jid: key });
      registeredCount++;
    } else if (participants.includes(key)) {
      unregisteredUsers.push(key);
    }
  }

  const groupName = groupMetadata.subject;
  const memberCount = participants.length;
  const unregisteredCount = unregisteredUsers.length;
  let mentions = unregisteredUsers;

  let text = `مرحبـا @${m.sender.split('@')[0]}.\n\n`;
  text += `مجمـوعة : ${groupName}\n`;
  text += `عـدد الأعضـاء : ${memberCount}\n`;
  text += `عـدد الألقـاب : ${registeredCount}\n`;
  text += `نـاس غيـر مسجـلين : ${unregisteredCount}\n\n`;
  text += 'دول المـوجودة فكـروب :\n\n';

  text += '○ الالقـاب :\n\n';

  for (const letter in nicknames) {
    text += `⊹⊱≼━━━⌬〔 ${letter} 〕⌬━━━≽⊰⊹\n\n`;
    nicknames[letter].forEach(user => {
      text += `- ${user.name} : @${user.jid.split('@')[0]}\n`;
      mentions.push(user.jid);
    });
    text += '\n';
  }

  text += '⊹⊱≼━━━⌬〔 غيـر مسـجلين 〕⌬━━━≽⊰⊹\n\n';
  unregisteredUsers.forEach(jid => {
    text += `- @${jid.split('@')[0]}\n`;
  });

  await conn.reply(m.chat, text, m, { mentions });
};

handler.admin = true;
handler.command = /^(الالقاب|nicknames)$/i;

export default handler;