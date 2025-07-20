import { prepareWAMessageMedia, generateWAMessageFromContent } from '@fizzxydev/baileys-pro';

const handler = async (m, { conn }) => {
    const imageUrl = "https://i.postimg.cc/d1LW67hm/file-00000000c0ec622f8bff523637740179.png"; // رابط الصورة المصغرة
    const link1 = "https://wa.me/967772645417"; // الرابط الأول (اتصال مع المطور)
    const link2 = "https://whatsapp.com/channel/0029Vb65tqt4yltWT7Qrjm1F"; // الرابط الثاني (القناة)

    // تجهيز الصورة المصغرة
    const media = await prepareWAMessageMedia(
        { image: { url: imageUrl } },
        { upload: conn.waUploadToServer }
    );

    // إنشاء الرسالة التفاعلية
    const interactiveMessage = {
        body: { text: "مـرحـبـا اسـمـي،بـــــابـــليون مـطـوري زاوفــــــان الاذاعـه اسـتـخـدم امـر (.اوامـر) لطلب القائمة" },
        footer: { text: "｢┆𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻┆｣" },
        header: { 
            title: "❪┇𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻┇❫", 
            hasMediaAttachment: true, 
            imageMessage: media.imageMessage 
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "｢🐦‍🔥┊لـلـمـطـور┊🐦‍🔥｣",
                        url: link1
                    })
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "｢🍁┊القناة┊🍁｣",
                        url: link2
                    })
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "⌈🚀╎اوامر╎🚀⌋",
                        id: ".اوامر"
                    })
                }
            ]
        }
    };

    // إرسال الرسالة
    let msg = generateWAMessageFromContent(
        m.chat,
        { viewOnceMessage: { message: { interactiveMessage } } },
        { userJid: conn.user.jid, quoted: m }
    );

    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = /^بوت$/i; // تشغيل الكود عند كتابة ".بوت"

export default handler;