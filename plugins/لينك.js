import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@fizzxydev/baileys-pro';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const device = await getDevice(m.key.id);
    const mentionId = m.key.participant || m.key.remoteJid;

    let group = m.chat;
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);

    // محاولة الحصول على صورة الروم
    let groupMetadata = await conn.groupMetadata(group);
    let groupImage;

    try {
        // التحقق مما إذا كانت صورة المجموعة موجودة
        groupImage = await conn.profilePictureUrl(m.chat, 'image'); // المحاولة للحصول على صورة المجموعة مباشرة
    } catch (e) {
        groupImage = null; // في حالة عدم وجود صورة
    }

    // إذا كانت صورة الروم غير موجودة، استخدم الصورة الافتراضية
    let imageUrl = groupImage ? groupImage : 'https://chat.whatsapp.com/HoVrDIr0weD9mmPuY7McSW';

    // إعداد الصورة التي سيتم إرسالها
    var imageMedia = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

    if (device !== 'desktop' && device !== 'web') {
        // إعداد الرسالة التفاعلية
        const interactiveMessage = {
            body: { text: `*⌬═━━━═⌬┋⊰ ⊱┋⌬═━━━═⌬*`.trim() },
            footer: { text: `𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ❞┊`.trim() },
            header: {
                title: `مـرحـبـا يـا: @${mentionId.split('@')[0]}`,
                subtitle: `*هذه صورة مع زر النسخ*`,
                hasMediaAttachment: true,
                imageMessage: imageMedia.imageMessage, // إضافة الصورة هنا
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'cta_copy',
                        buttonParamsJson: JSON.stringify({
                            display_text: '┊انـسـخ الـرابـط┊',
                            copy_code: link
                        })
                    }
                ],
                messageParamsJson: ''
            }
        };

        // إنشاء الرسالة
        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m });

        // إضافة المعلومات حول المرسل
        msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: [mentionId] };
        
        // إرسال الرسالة
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        // في حال كان الجهاز سطح مكتب أو ويب، إرسال الصورة الافتراضية فقط
        await conn.sendFile(m.chat, ' https://i.postimg.cc/d1LW67hm/file-00000000c0ec622f8bff523637740179.png', 'image.jpg', 'الصورة الافتراضية', m);
    }
};

handler.help = ['sendImageWithCopyButton'];
handler.tags = ['For Test'];
handler.command = ['لينك'];
export default handler;