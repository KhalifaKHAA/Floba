let handler = async (m, { conn }) => {
  let audio = 'https://files.catbox.moe/bq9io7.mp3'
  let thumbnail = await (await fetch('https://i.postimg.cc/d1LW67hm/file-00000000c0ec622f8bff523637740179.png')).buffer()

  await conn.sendMessage(m.chat, {
    audio: { url: audio },
    mimetype: 'audio/mp4',
    ptt: true,
    fileName: 'forina.mp3',
    contextInfo: {
      externalAdReply: {
        title: "𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻",
        body: "𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻",
        thumbnail: thumbnail,
        mediaType: 1,
        renderLargerThumbnail: true,
        mediaUrl: "https://wa.me/967772645417",
        sourceUrl: "https://wa.me/967772645417"
      }
    }
  }, {
    quoted: m,
    buttons: [
      { buttonId: '.الاوامر', buttonText: { displayText: '🧾 عرض الأوامر' }, type: 1 }
    ],
    headerType: 1
  });
};

handler.customPrefix = /^(بوت|يا بوت)$/i;
handler.command = new RegExp;
export default handler;