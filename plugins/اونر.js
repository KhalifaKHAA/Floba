const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  
  const usageMessage = `*❗ استخدام الأمر:* \n\n◉ ${usedPrefix + command} @${m.sender.split('@')[0]}\n◉ ${usedPrefix + command} ${m.sender.split('@')[0]}\n◉ ${usedPrefix + command} <الرد على الشخص>`;
  
  // تنظيف الرقم مع الحفاظ على علامة +
  let cleanNumber = text ? text.replace(/[^\d+]/g, '') : '';
  if (cleanNumber && !cleanNumber.startsWith('+')) {
    cleanNumber = '+' + cleanNumber;
  }

  const who = (m.mentionedJid && m.mentionedJid[0]) 
    || (m.quoted ? m.quoted.sender : cleanNumber ? cleanNumber + '@s.whatsapp.net' : false);

  if (!who) return conn.reply(m.chat, usageMessage, m, { mentions: [m.sender] });

  switch (command) {
    
    case 'لاونر': {
      const newName = await conn.getName(who);
      const newNumber = who.split('@')[0].trim();
      
      const index = global.owner.findIndex(owner => owner[0] === newNumber);
      
      if (index === -1) {
        global.owner.push([newNumber, newName]);
        await conn.reply(m.chat, `✔️ تم إضافة (${newName}) (@${newNumber}) إلى قائمة المالكين بنجاح.`, m, { mentions: [who] });
      } else {
        await conn.reply(m.chat, `⚠️ هذا الشخص موجود في قائمة المالكين.`, m);
      }
      break;
    }
      
    case 'لمطور': {
      const newName = await conn.getName(who);
      const newNumber = who.split('@')[0].trim();
      
      const index = global.rowner.findIndex(owner => owner[0] === newNumber);
      
      if (index === -1) {
        global.rowner.push([newNumber, newName]);
        await conn.reply(m.chat, `✔️ تم إضافة (${newName}) (@${newNumber}) إلى قائمة المطورين بنجاح.`, m, { mentions: [who] });
      } else {
        await conn.reply(m.chat, `⚠️ هذا الشخص موجود في قائمة المطورين.`, m);
      }
      break;
    }
      
    case 'ليوسر': {
      const uNumber = who.split('@')[0].trim();
      
      const userIndex = global.owner.findIndex(owner => owner[0] === uNumber);
      if (userIndex !== -1) {
        const [removedNumber, removedName] = global.owner.splice(userIndex, 1)[0];
        await conn.reply(m.chat, `✔️ تم إزالة (${removedName}) (@${removedNumber}) من قائمة المالكين.`, m, { mentions: [who] });
      } else {
        const userIndex2 = global.rowner.findIndex(owner => owner[0] === uNumber);
        if (userIndex2 !== -1) {
          const [removedNumber, removedName] = global.rowner.splice(userIndex2, 1)[0];
          await conn.reply(m.chat, `✔️ تم إزالة (${removedName}) (@${removedNumber}) من قائمة المطورين.`, m, { mentions: [who] });
        } else {
          await conn.reply(m.chat, `⚠️ لم يتم العثور على هذا الشخص في قائمة المالكين أو المطورين.`, m);
        }
      }
      break;
    }
  }
};

handler.command = /^(لاونر|لمطور|ليوسر)$/i;
handler.owner = true;
export default handler;