import moment from 'moment-timezone';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@fizzxydev/baileys-pro';

let usageLimits = {};

let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  let groupId = m.chat;
  let senderId = m.sender;
  let usageKey = `${groupId}:${command}`;

  if (command === 'تحديد_منشن') {
    if (!isOwner) {
      m.reply('❌ هذا الأمر متاح فقط للمطور.');
      return;
    }
    let limit = parseInt(args[0]);
    if (isNaN(limit) || limit <= 0) {
      m.reply('❌ الرجاء إدخال رقم صحيح كحد للاستخدام.');
      return;
    }
    usageLimits[groupId] = limit;
    m.reply(`🌏 تم تعيين الحد الأقصى لاستخدام أوامر المنشن إلى *${limit}* مرة 🌏`);
    return;
  }

  if (!usageLimits[groupId]) usageLimits[groupId] = 3;
  if (usageLimits[usageKey] === undefined) usageLimits[usageKey] = usageLimits[groupId];

  if (usageLimits[usageKey] <= 0) {
    m.reply('❌ تم استنفاد الحد الأقصى لاستخدام هذا الأمر في المجموعة. الرجاء التواصل مع المطور لإعادة التعيين.');
    return;
  }

  let pesan = args.join` `;
  let time = moment.tz('Asia/Riyadh').format('hh:mm A');
  let date = moment.tz('Asia/Riyadh').format('YYYY/MM/DD');
  let groupName = m.chat;

  let filteredParticipants =
    command === 'منشن_اعضاء'
      ? participants.filter(p => !p.admin)
      : command === 'منشن_مشرفين'
      ? participants.filter(p => p.admin)
      : participants;

  let teks = `
╭── 🌏 ｡･ﾟﾟ･ ${command === 'منشن_اعضاء' ? '🌟 *أعــضــاء الــجــروب*' : command === 'منشن_مشرفين' ? '👑 *مــشــرفــي الــجــروب*' : '💖 *جــمــيــع الأعــضــاء*'} ･ﾟﾟ･｡ 🌏 ──╮

💌 *اســم الــجــروب:* 『 ${groupName} 』
📝 *الــرســالــة:* 『 ${pesan || '❌ لا توجد رسالة محددة ❌'} 』
📅 *الــتــاريــخ:* 『 ${date} 』
⏰ *الــوقــت:* 『 ${time} 』
👥 *عــدد المــســتــهــدفــيــن:* 『 ${filteredParticipants.length} 』

╰── 🌏 ｡･ﾟﾟ･ 😼 ･ﾟﾟ･｡ 🌏 ──╯

╭── 🌏 *قــائــمــة الأعــضــاء* 🌏 ──╮
${filteredParticipants.map(mem => `💠 @${mem.id.split('@')[0]}`).join('\n')}
╰──  𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻  ──╯

╭── 🌏 *مــســؤول المــنــشــن* 🌏 ──╮
🌏 @${m.sender.split('@')[0]}
╰──  𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻  ──╯

╭── 🌏 *شــكــرًا لاســتــخــدام الــبــوت!* 🌏 ──╮
🌏 *فــوريـنـا دائمًا هنا لي مساعدتك دوماً!* 🌏
╰──  𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻  ──╯
`;

  // ✅ تحميل الصورة قبل إرسالها
  const media = await prepareWAMessageMedia(
    { image: { url: 'https://i.postimg.cc/d1LW67hm/file-00000000c0ec622f8bff523637740179.png' } },
    { upload: conn.waUploadToServer }
  );

  conn.sendMessage(m.chat, {
    text: teks,
    mentions: filteredParticipants.map(a => a.id),
    image: media.imageMessage
  });

  usageLimits[usageKey] -= 1;
};

handler.help = ['منشن_اعضاء <message>', 'منشن_مشرفين <message>', 'منشن_الكل <message>', 'تحديد_منشن <عدد>', 'منشن'];
handler.tags = ['group'];
handler.command = /^(منشن_اعضاء|منشن_مشرفين|منشن_الكل|تحديد_منشن)$/i;
handler.admin = true;
handler.group = true;

export default handler;