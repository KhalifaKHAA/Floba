import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    await m.react('🐦‍🔥');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);

    // إرسال القران
    let audioUrl = 'https://files.catbox.moe/s7dv2h.m4a';
    await conn.sendMessage(m.chat, { 
        audio: { url: audioUrl }, 
        mimetype: 'audio/mp4', 
        ptt: false 
    }, { quoted: m });

    // تأخير 3 ثوانٍ قبل إرسال جهة الاتصال
    setTimeout(async () => {
        // VCARD
        let list = [{
            displayName: "｢🐦‍🔥┊𝒁𝒂𝒐𝒇𝒂𝒏 ┊🐦‍🔥｣",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:｢🐦‍🔥┊𝒁𝒂𝒐𝒇𝒂𝒏 ┊🐦‍🔥｣
TEL;type=CELL;waid=967772645417:+967 772 645 541
EMAIL;type=INTERNET:khalifaalialtaheri@gmail.com
URL:https://instagram.com/khalifaalialtahery
ADR:;;اليمن;;;;
END:VCARD`,
        }];

        await conn.sendMessage(m.chat, {
            contacts: {
                displayName: `${list.length} جهة اتصال`,
                contacts: list
            },
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'مرحبا، هذا هو مطور البوت',
                    body: 'للتواصل مع المطور مباشرة',
                    thumbnailUrl: 'https://i.postimg.cc/SQWjrK4t/95f0d09047c51a20433d991660c67bc7.jpg',
                    sourceUrl: null,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m
        });

        let txt = `👋 *مرحبًا \`${username}\` هذا هو*\n*جهة اتصال مطور البوت*`;

        await conn.sendMessage(m.chat, {
            text: txt,
            footer: '｢🐦‍🔥┊𝒁𝒂𝒐𝒇𝒂𝒏 ┊🐦‍🔥｣',
            buttons: [
                {
                    buttonId: ".menu",
                    buttonText: {
                        displayText: 'قائمة البوت'
                    },
                    type: 1
                }
            ],
            viewOnce: true,
            headerType: 1
        }, { quoted: m });

    }, 3000); // تأخير لمدة 3 ثواني
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|مطور1|dueño)$/i;

export default handler;