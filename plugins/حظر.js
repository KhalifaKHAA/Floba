const handler = async (m, {text, conn, usedPrefix, command}) => {
    const why = `*⚠️ مثال على الاستخدام:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`;
    
    const who = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : text 
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
        : false;

    if (!who) conn.reply(m.chat, why, m, {mentions: [m.sender]});
    
    const res = [];
    
    switch (command) {
        case 'حظر': case 'block':
            if (who) {
                await conn.updateBlockStatus(who, 'block').then(() => {
                    res.push(who);
                });
            } else {
                conn.reply(m.chat, why, m, {mentions: [m.sender]});
            }
            break;
            
        case 'إلغاء_الحظر': case 'unblock':
            if (who) {
                await conn.updateBlockStatus(who, 'unblock').then(() => {
                    res.push(who);
                });
            } else {
                conn.reply(m.chat, why, m, {mentions: [m.sender]});
            }
            break;
    }
    
    if (res[0]) {
        conn.reply(
            m.chat, 
            `*المستخدم ${res ? `${res.map((v) => '@' + v.split('@')[0])}` : ''} تم ${command} بنجاح ✅*`, 
            m, 
            {mentions: res}
        );
    }
};

handler.help = ["حظر", "إلغاء_الحظر"];
handler.tags = ["المالك"];
handler.command = /^(حظر|إلغاء_الحظر|block|unblock)$/i;
handler.rowner = true;

export default handler;