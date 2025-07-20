import fs from 'fs';
import similarity from 'similarity';
const threshold = 0.72;
const { generateWAMessageFromContent, prepareWAMessageMedia } = (await import('@fizzxydev/baileys-pro')).default;

const participants = {};
const activeGames = {};
const tekateki = global.tekateki = {};

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const id = m.chat;
  const sender = m.sender;

  if (command === 'ابدا_مسابقه') {
    if (activeGames[id]) return m.reply('❗ توجد مسابقة بالفعل. اكتب ".انهاء" لإنهائها أولاً.');
    activeGames[id] = { players: {}, current: null, round: 0, owner: sender };
    return m.reply('✨ تم بدء المسابقة! كل مشارك يكتب .دخول + لقبه للانضمام.');
  }

  if (command === 'دخول') {
    if (!activeGames[id]) return m.reply('❗ لا توجد مسابقة مفعلة. اكتب ".ابدا_مسابقه" أولاً.');
    if (!args[0]) return m.reply('❗ اكتب اللقب مثل: .دخول نينجا');
    activeGames[id].players[sender] = { name: args.join(" "), points: 0 };
    return m.reply(`✅ تم تسجيلك بلقب: ${args.join(" ")}`);
  }

  if (command === 'ابدا') {
    if (!activeGames[id]) return m.reply('❗ لا توجد مسابقة مفعلة.');
    if (sender !== activeGames[id].owner) return m.reply('❗ فقط من بدأ المسابقة يمكنه إرسال الأسئلة.');
    if (activeGames[id].current) return m.reply('❗ يوجد سؤال قيد الإجابة.');

    let questions = JSON.parse(fs.readFileSync(`./src/game/كت.json`));
    let q = questions[Math.floor(Math.random() * questions.length)];

    activeGames[id].current = {
      question: q.question,
      answer: q.response.toLowerCase(),
      from: sender
    };

    let caption = `*❖ السؤال:* ${q.question}\n⏱ لديك 60 ثانية للإجابة.`;

    let sentMsg = await conn.sendMessage(id, { text: caption });

    tekateki[id] = [
      sentMsg.key,
      q,
      1,
      setTimeout(() => {
        if (tekateki[id]) {
          conn.sendMessage(id, { text: `⏰ انتهى الوقت!\nالإجابة كانت: ${q.response}` });
          delete tekateki[id];
          activeGames[id].current = null;
        }
      }, 60000)
    ];

    return;
  }

  if (command === 'انهاء') {
    if (!activeGames[id]) return m.reply('❗ لا توجد مسابقة مفعلة.');
    if (sender !== activeGames[id].owner) return m.reply('❗ فقط من بدأ المسابقة يمكنه إنهاؤها.');

    let result = Object.entries(activeGames[id].players)
      .map(([jid, data]) => `🎖️ ${data.name}: ${data.points} نقطة`)
      .join('\n');

    delete activeGames[id];
    return m.reply(`🏁 تم إنهاء المسابقة.\n\n${result}`);
  }
};

handler.before = async function (m) {
  const id = m.chat;
  if (!tekateki[id]) return !0;

  let json = JSON.parse(JSON.stringify(tekateki[id][1]));
  let correct = json.response.toLowerCase().trim();
  let userAnswer = m.text.toLowerCase().trim();

  if (!(global.db.data.users[m.sender])) global.db.data.users[m.sender] = { exp: 0 };
  if (!(activeGames[id]?.players[m.sender])) return;

  if (userAnswer === correct) {
    activeGames[id].players[m.sender].points += 1;
    global.db.data.users[m.sender].exp += tekateki[id][2];

    const { imageMessage } = await prepareWAMessageMedia(
      { image: { url: 'https://files.catbox.moe/mm3lpg.jpg' } },
      { upload: this.waUploadToServer }
    );

    const content = {
      buttonsMessage: {
        contentText: `✅ *إجابة صحيحة من:* @${m.sender.split('@')[0]}\n🧠 *الجواب:* ${correct}\n✨ *نقاطه الآن:* ${activeGames[id].players[m.sender].points}`,
        footerText: '🧚🏻‍♀️ 𝙼𝙸𝙺𝙾 𝙶𝙰𝙼𝙴 🧚🏻‍♀️',
        buttons: [
          { buttonId: '.ابدا', buttonText: { displayText: '✨ سؤال جديد' }, type: 1 },
          { buttonId: '.انهاء', buttonText: { displayText: '🛑 إنهاء' }, type: 1 }
        ],
        headerType: 4,
        imageMessage
      }
    };

    const msg = generateWAMessageFromContent(
      id,
      { ephemeralMessage: { message: content } },
      { userJid: this.user.id }
    );

    await this.relayMessage(id, msg.message, { messageId: msg.key.id });

    clearTimeout(tekateki[id][3]);
    delete tekateki[id];
    activeGames[id].current = null;

  } else if (similarity(userAnswer, correct) >= threshold) {
    m.reply(`*❍━━━══━━❪🧚🏻‍♀️❫━━══━━━❍*\n*｢🍬｣⇇اقـتـربـت مـن الاجـابـه*\n*❍━━━══━━❪🧚🏻‍♀️❫━━══━━━❍*`);
  } else {
    m.reply(`*❍━━━══━━❪🧚🏻‍♀️❫━━══━━━❍*\n*｢🍬｣⇇الاجـابـه خـلـط*\n*❍━━━══━━❪🧚🏻‍♀️❫━━══━━━❍*`);
  }

  return !0;
};

handler.command = /^(ابدا_مسابقه|دخول|ابدا|انهاء)$/;
handler.group = true;

export default handler;