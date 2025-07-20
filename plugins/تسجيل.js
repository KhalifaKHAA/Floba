const handler = async (m, { conn, text }) => {

  try {

    // بيانات المستخدم

    let user = global.db.data.users[m.sender];

    let level = user.level;

    let money = user.money;

    // النص الذي سيظهر للمستخدم

    const caption = `*⊱───═⪨༻【🍁】༺⪩═───⊰*\n\n*مرحب حبيب القلب  ⌊ ${m.pushName} ⌉ هنا يتم تسجيلك بوت` +

                 `\n *⊱───═⪨༻【🍁】༺⪩═───⊰*`;

    await conn.sendMessage(

      m.chat,

      {

        text: caption,

        footer: "𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻",

        buttons: [

          {

            buttonId: `@verify`,

            buttonText: { displayText: "⌬ ❛╏تــــســــــــجـيل ⚜️" },

          },

        ],

        viewOnce: true ,
          

      },

      { quoted: m }

    );
await conn.sendMessage(m.chat, { react: { text: "🍁", key: m.key } });
  } catch (err) {

    console.error(err);

    m.reply(`*An error occurred!* 😭\n${err.message || err}`);

  }

};

handler.help = ["group"];

handler.command = ['reg','تسجيل','سجل'];

export default handler;