/*import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command }) => {
let res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/anime-hinata.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
//conn.sendFile(m.chat, url, 'error.jpg', `_*هـيـنـاتـا 😽*_`, m)}
conn.sendButton(m.chat, "𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ❞┊", author, url, [['⚽ التالي', `${usedPrefix + command}`]], m)}
handler.help = ['anna']
handler.tags = ['internet']
handler.command = /^()$/i
export default handler