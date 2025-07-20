import fs from 'fs';
import axios from 'axios';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

const handler = async (m, { conn, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'يرجى تحديد الملف الذي تود استخراج النص منه.\n> مثال: ' + usedPrefix + command + ' ريبلي الملف';
    
    const media = await q.download();
    const { ext, mime: fileMime } = await fileTypeFromBuffer(media);
    
    try {
        const link = await uploadToCatbox(media);
        const text = await extractTextFromMedia(link);
        await conn.sendMessage(m.chat, { text: text || 'لم يتم العثور على نص في الملف.' }, { quoted: m });
    } catch (error) {
        await conn.sendMessage(m.chat, { text: `حدث خطأ: ${error.message}` }, { quoted: m });
    }
};

handler.help = ['لنص <رد على ملف>'];
handler.tags = ['ادوات'];
handler.command = ['تحليل'];

export default handler;

const uploadToCatbox = async (buffer) => {
    const { ext } = await fileTypeFromBuffer(buffer);
    const form = new FormData();
    form.append('fileToUpload', buffer, `file.${ext}`);
    form.append('reqtype', 'fileupload');
    
// ⛔ حقوق Itadori-Dev 
// 🍼 يا طفلل لا تسرق الكود وتغير حقوق دليل فشلك 
// ⚠️ احترم تعب غيرك  
// ✅ ابدأ من الصفر يا بطل وجرب تعمل حاجه بي نفسك بدل ما انت بتسرق 
    try {
        const response = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form });
        const text = await response.text();
        if (text.startsWith('https://')) return text;
        else throw new Error('فشل في رفع الملف إلى Catbox: ' + text);
    } catch (error) {
        throw new Error(`فشل في رفع الملف: ${error.message}`);
    }
};

const extractTextFromMedia = async (url) => {
    try {
        const res = await fetch(`https://the-end-api.vercel.app/home/sections/Ai/api/convert?url=${encodeURIComponent(url)}`, {
            method: 'GET',
            timeout: 10000 
        });
        
        if (!res.ok) {
            throw new Error(`خطأ في استجابة الخادم: ${res.status}`);
        }
        
        const data = await res.json();
        return data.message || 'لم يتم العثور على نص.';
    } catch (error) {
        throw new Error(`خطأ أثناء استخراج النص: ${error.message}`);
    }
};