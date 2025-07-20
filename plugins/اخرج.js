let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
await conn.reply(id, 'علـــــــــــم وينفـــذ') 
await conn.groupLeave(id)}
handler.command = /^(اخرج|اطلع|غادر|خروج)$/i
handler.group = true
handler.owner = true
export default handler