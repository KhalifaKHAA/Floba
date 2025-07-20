import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { savetube } from '../lib/yt-savetube.js';
import { ogmp3 } from '../lib/youtubedl.js';
import { amdl, ytdown } from '../lib/scraper.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ytmp3, ytmp4 } = require('@hiudyy/ytdl');

const userRequests = {};

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args[0]) throw '*📌 ماذا تبحث؟ أدخل رابط يوتيوب لتحميل الصوت أو الفيديو*';

  const sendType = command.includes('doc') ? 'document' : command.includes('mp3') ? 'audio' : 'video';
  const yt_play = await search(args.join(' '));
  let youtubeLink = '';

  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    const index = parseInt(args[0]) - 1;
    if (index >= 0 && Array.isArray(global.videoList)) {
      const matchingItem = global.videoList.find(item => item.from === m.sender);
      if (matchingItem && index < matchingItem.urls.length) {
        youtubeLink = matchingItem.urls[index];
      } else {
        throw `⚠️ لم يتم العثور على رابط لهذا الرقم. الرجاء اختيار رقم بين 1 و ${matchingItem.urls.length}`;
      }
    }
  }

  if (userRequests[m.sender]) return m.reply('⏳ يتم تحميل الملف الآن. الرجاء الانتظار حتى ينتهي التحميل.');
  userRequests[m.sender] = true;

  try {
    if (/ytmp3|fgmp3|ytmp3doc/i.test(command)) {
      m.reply(['🎵 جاري تحميل الصوت، انتظر قليلًا...', '🔄 المعالجة قيد التنفيذ، يرجى الانتظار...', '📥 يتم تحميل الملف الصوتي...'].getRandom());
      try {
        const result = await savetube.download(args[0], 'mp3');
        await conn.sendMessage(m.chat, { [sendType]: { url: result.result.download }, mimetype: 'audio/mpeg', fileName: 'audio.mp3' }, { quoted: m });
      } catch {
        try {
          const res = await ogmp3.download(yt_play[0].url, '320', 'audio');
          await conn.sendMessage(m.chat, { [sendType]: { url: res.result.download }, mimetype: 'audio/mpeg', fileName: 'audio.mp3' }, { quoted: m });
        } catch {
          try {
            const audiodlp = await ytmp3(args);
            conn.sendMessage(m.chat, { [sendType]: audiodlp, mimetype: 'audio/mpeg' }, { quoted: m });
          } catch (e) {
            m.reply('❌ حدث خطأ أثناء محاولة تحميل الصوت.');
          }
        }
      }
    }

    if (/ytmp4|fgmp4|ytmp4doc/i.test(command)) {
      m.reply(['🎬 جاري تحميل الفيديو، انتظر قليلًا...', '🔄 المعالجة قيد التنفيذ، يرجى الانتظار...', '📥 يتم تحميل الفيديو...'].getRandom());
      try {
        const result = await savetube.download(args[0], '720');
        const data = result.result;
        await conn.sendMessage(m.chat, {
          [sendType]: { url: data.download },
          mimetype: 'video/mp4',
          fileName: `${data.title}.mp4`,
          caption: `🎞️ تم تحميل الفيديو بنجاح\n🎬 العنوان: ${data.title}`
        }, { quoted: m });
      } catch {
        try {
          const video = await ytmp4(args);
          await conn.sendMessage(m.chat, {
            [sendType]: { url: video },
            fileName: `video.mp4`,
            mimetype: 'video/mp4',
            caption: `🎞️ تم تحميل الفيديو بنجاح`
          }, { quoted: m });
        } catch (e) {
          m.reply('❌ حدث خطأ أثناء محاولة تحميل الفيديو.');
        }
      }
    }
  } catch (err) {
    console.error(err);
    m.react('❌');
  } finally {
    delete userRequests[m.sender];
  }
};

handler.help = ['ytmp3', 'ytmp4'];
handler.tags = ['downloader'];
handler.command = /^ytmp3|ytmp4|fgmp4|audio|fgmp3|dlmp3|ytmp4doc|ytmp3doc?$/i;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'ar', gl: 'EG', ...options });
  return search.videos;
}

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

async function ytMp3(url) {
  const info = await ytdl.getInfo(url);
  const format = info.formats.find(f => f.mimeType.includes('audio'));
  const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${format.url}`);
  return {
    title: info.videoDetails.title,
    result: tiny.data,
    thumb: info.videoDetails.thumbnails[0].url
  };
}

async function ytMp4(url) {
  const info = await ytdl.getInfo(url);
  const format = info.formats.find(f => f.container === 'mp4' && f.hasAudio && f.hasVideo);
  const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${format.url}`);
  return {
    title: info.videoDetails.title,
    result: tiny.data,
    thumb: info.videoDetails.thumbnails[0].url
  };
}