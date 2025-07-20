function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@fizzxydev/baileys-pro';
const { generateWAMessageFromContent, prepareWAMessageMedia } = pkg;

const handler = async (m, { conn }) => {
    try {
        let d = new Date(Date.now() + 3600000);
        let locale = 'ar';
        let uptime = clockString(process.uptime() * 1000);
        let user = global.db.data.users[m.sender] || {};
        let name = conn.getName(m.sender);
        let { role, level } = user;
        let mentionId = m.key.participant || m.key.remoteJid;
        let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });

        const Elsony = 'https://i.postimg.cc/d1LW67hm/file-00000000c0ec622f8bff523637740179.png';
        const media = await prepareWAMessageMedia({ image: { url: Elsony } }, { upload: conn.waUploadToServer });

        let message = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: { title: "gataVidMenu" },
                        body: { text: `╭────────────── ⪩  
┃   ســـــــلام عــلــيــكــم يــا حبيب   
╰────────────── ⪨  
╭────────── ⪩  
┃  أهـــــلًا وســــهـــلًا بــــك يــا:  
┃ ⌜ @${mentionId.split('@')[0]} ⌟  
╰────────── ⪨  
╭═══════ ⌈   مــعــلــومــات الــبــوت   ⌋ ═══════╮  
┃ 🩵❥ *اســــــم الــــبــــوت*: 『 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻』  
┃ 💫❥ *الــــمــــطــــور*: 『  』  
┃ 🎙❥ *رقــــم الــــمــــطــــور*: 『 wa.me/967772645417 📞』  
╭═══════ ⌈  مــعــلــومــاتــك  ⌋ ═══════╮  
┃ ❥ *مــســتــواك*: 『 ${level}  』  
┃ 💰❥ *فــلــوســك*: 『 ${user.money || 0} 🪙 』  
┃ 🎙❥ *رتــبــتــك*: 『 ${role}  』  
┃ ❤️❥ *صــحــتــك*: 『 ${user.health || 100} / 1000 🚑』  
${user.boosts && Object.keys(user.boosts).length > 0 ? `┃ 🌏❥ *تــأثــيــراتــك الــنــشــطــة*:  
${user.boosts.xpMultiplier ? `┃  💡 زيادة XP: +${(user.boosts.xpMultiplier - 1) * 100}%` : ''}  
${user.boosts.healthShield ? `┃  🛡️ درع الحماية: ${user.boosts.healthShield} ضربات متبقية` : ''}  
` : ''}  
╭──  ⌈ 𝑵𝑶𝑻𝑬 ⌋  ──╮  
┃ * اضغط الأزرار لعرض القائمة *  
┃ *💬 للشكاوى أو الاقتراحات استخدم: .ابلاغ *  
┃ *ممنوع سب البوت*  
╰──  ⌈ 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ⌋  ──╯ `, subtitle: "Elsony" },
                        header: { hasMediaAttachment: true, ...media },
                        contextInfo: { mentionedJid: [m.sender], isForwarded: false },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'single_select',
                                    buttonParamsJson: JSON.stringify({
                                        title: '⌈┊اوامر┊🍬⌋',
                                        sections: [
                                            {
                                                title: '❪🐣┊مـهـام_الـبـوت┊❫',
                                                highlight_label: '𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻',
                                                rows: [
                                                    { header: '👑┊القـ👑ـسـم الأول', title: '🍫┊「قـسـم_الألـعـاب」', id: '.ق1' },
                                                    { header: '🐦‍🌏┊القـ🐦‍🌏ـسـم الثاني', title: '🍨┊「قـسـم_الـمـشـرفـيـن」🍨', id: '.ق3' },
                                                    { header: '👑┊القـ👑ـسـم الثالث', title: '🍨┊「قـسـم_الادوات」🍬', id: '.ق4' },
                                                    { header: '🛡┊القـ🛡ـسـم الرابع', title: '🍬┊「قـسـم_الـتـحـمـيـل」🍨', id: '.ق5' },
                                                    { header: '🕹┊القـ🕹ـسـم الخامس', title: '🍬┊「قـسـم_الـبـنـك」🍨', id: '.ق6' },
                                                    { header: '🌀┊القـ🌀ـسـم السادس', title: '🍬┊「قـسـم_الــAI」🍨', id: '.ق7' },
                                                          { header: '🤖┊القـ🤖ـسـم السابع', title: '🍬┊「قـسـم_الـتـسـلـيـه」🍨', id: '.ق9' },
                                    
                                                    { header: '🕋┊القـ📿ـسـم الثامن', title: '🍬┊「قــســم_الـديـن」🍨', id: '.ق10' },
                
                                                                                             { header: '🖌️┊القـ🖌️ـسـم التاسع', title: '🍬┊「قــســم_الـزخــارف」🍨', id: '.ق11' },
                                                                                                      { header: '⚔️┊القـ⚜️ـسـم العاشر', title: '🍬┊「قــســم_الـنـقـابـات」🍨', id: '.ق12' },  
                                                                                                      { header: '🗾┊القـ🌅ـسـم 11', title: '🍬┊「قــســم_الـصــور」🍨', id: '. ق13' },
                                                                                                                                                                        { header: '👨🏻‍💻┊القـ👨🏻‍💻ـسـم خاص', title: '🍬┊「 القوانين 」🍨', id: '.القواعد' }
                                                ]
                                            }
                                        ]
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: '{"display_text":"⌈📩╎شات البوت╎📩⌋","url":"https://chat.whatsapp.com/LlzskYV7LbOGX8uR3fPAKf"}'
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: '{"display_text":"⌈🌟╎تقييم╎🌟⌋","id":".تقيم"}'
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الـمـطـور╎📲⌋","url":"https://whatsapp.com/channel/0029Vb6eZjRCBtxL6IbWdS2Y"}'
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: '{"display_text":"⌈🚀╎المطور╎🚀⌋","id":".المطور"}'
                                }
                            ]
                        }
                    }
                }
            }
        };

        await conn.relayMessage(m.chat, message, {});
    } catch (err) {
        console.error(err);
        await conn.sendMessage(m.chat, { text: '❌ حدث خطأ أثناء تنفيذ الأمر.' }, { quoted: m });
    }
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['menu', 'مهام', 'اوامر', 'الاوامر', 'قائمة', 'القائمة'];

export default handler;