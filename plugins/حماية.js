/*  ────  Protect Admins | 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻  ────  */

import fs from 'fs'
import { join } from 'path'

/* ——— 1. قاعدة البيانات ——— */
const DB_PATH = join(process.cwd(), 'pro.json')
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ groups: {}, logs: [] }, null, 2))

const loadDB = () => JSON.parse(fs.readFileSync(DB_PATH))
const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))

/* ——— 2. النخبة ——— */
const eliteNumbers = [
  ['967772645417', 'المطور'],
  ['967711516106', 'البوت']
]

const getNumber = jid => jid?.split('@')[0] || ''
const cleanNumber = jid => getNumber(jid).replace(/\D/g, '')

const isElite = jid => eliteNumbers.some(([id]) => cleanNumber(jid) === id)

const fmtTime = (d = new Date()) => ({
  date: d.toLocaleDateString('ar-EG', { timeZone: 'Africa/Tripoli' }),
  time: d.toLocaleTimeString('ar-EG', { timeZone: 'Africa/Tripoli' })
})

/* ——— 3. أمر الحماية ——— */
const handler = async (m, { conn, args, command }) => {
  if (!m.isGroup || !['الحماية', 'ح'].includes(command)) return

  const sender = cleanNumber(m.sender)
  if (!isElite(sender)) {
    const list = eliteNumbers.map(([id, name]) => `• wa.me/${id} ${name || ''}`).join('\n')
    return m.reply(`🚫 *هذا الأمر مخصص للنخبة فقط!*\n\n👑 قائمة النخبة:\n${list}`)
  }

  const db = loadDB()
  const gid = m.chat
  const sub = (args[0] || '').toLowerCase()

  if (!db.groups[gid])
    db.groups[gid] = { normal: false, fullpro: false, lastUpdate: new Date().toISOString() }

  const group = db.groups[gid]

  switch (sub) {
    case 'فتح':
      group.normal = true
      group.fullpro = false
      group.lastUpdate = new Date().toISOString()
      saveDB(db)
      return m.reply(
`╭── ⌈ 🛡️ الحماية ⌋
│ ✅ تم *تفعيل الحماية العادية*
│ ❎ تم *تعطيل الحماية المطلقة*
╰── ⌈ 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ⌋`)

    case 'قفل':
      group.normal = false
      group.fullpro = false
      group.lastUpdate = new Date().toISOString()
      saveDB(db)
      return m.reply(
`╭── ⌈ 🛡️ الحماية ⌋
│ ❌ تم *تعطيل جميع أنواع الحماية*
╰── ⌈ 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ⌋`)

    case 'مطلقة':
      if (args[1] === 'فتح') {
        group.fullpro = true
        group.normal = false
        group.lastUpdate = new Date().toISOString()
        saveDB(db)
        return m.reply(
`╭── ⌈ ⚜️ الحماية المطلقة ⌋
│ ✅ *مفعّلة*
│ ❎ *الحماية العادية مغلقة*
╰── ⌈ 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ⌋`)
      } else if (args[1] === 'قفل') {
        group.fullpro = false
        group.lastUpdate = new Date().toISOString()
        saveDB(db)
        return m.reply(
`╭── ⌈ ⚜️ الحماية المطلقة ⌋
│ ❌ *تم تعطيلها*
╰── ⌈ 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ⌋`)
      } else {
        return m.reply('❗ استخدم: *الحماية مطلقة فتح* أو *الحماية مطلقة قفل*')
      }

    case 'حالة':
    default: {
      const { date, time } = fmtTime(new Date(group.lastUpdate))
      return m.reply(
`╭── ⌈ 📊 حالة الحماية ⌋
│ 🛡️ العادية: ${group.normal ? '✅' : '❌'}
│ ⚜️ المطلقة: ${group.fullpro ? '✅' : '❌'}
│ ⏱️ آخر تحديث: ${date} - ${time}
╰── ⌈ 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 ⌋`)
    }
  }
}

/* ——— 4. الحماية الخلفية والتحقق من الأرقام ——— */
handler.before = async (m, { conn }) => {
  if (!m.isGroup || !m.messageStubType || !m.messageStubParameters?.length) return

  const db = loadDB()
  const cfg = db.groups[m.chat]
  if (!cfg?.normal && !cfg?.fullpro) return

  const actor = cleanNumber(m.sender)
  const target = cleanNumber(m.messageStubParameters[0])
  const { date, time } = fmtTime()

  const groupMetadata = await conn.groupMetadata(m.chat)
  const participants = groupMetadata.participants
  const groupOwner = cleanNumber(groupMetadata.owner)
  const botNumber = cleanNumber(conn.user.id)

  const isSafe = (n) => [groupOwner, botNumber].includes(n) || isElite(n)
  const isActorAllowed = () => isSafe(actor)

  const demoteAll = async () => {
    const toDemote = participants
      .filter(p => (p.admin === 'admin' || p.admin === 'superadmin'))
      .map(p => cleanNumber(p.id))
      .filter(n => !isSafe(n))

    const jids = toDemote.map(n => `${n}@s.whatsapp.net`)
    if (jids.length)
      await conn.groupParticipantsUpdate(m.chat, jids, 'demote').catch(() => {})
    return jids
  }

  if ([29, 30].includes(m.messageStubType)) {
    if (!isActorAllowed()) {
      const demoted = await demoteAll()
      await conn.sendMessage(m.chat, {
        text:
`🚫 *محاولة إدارة غير مصرح بها!*

👤 من: @${actor}
🎯 على: @${target}
🕒 ${date} - ${time}
⚠️ تم سحب الإشراف من الجميع غير الموثوقين.

🔐 𝑩𝒂𝒃𝒚𝒍𝒐𝒏⦓🍁⦔𝑩𝑶𝑻 🔥`,
        mentions: [m.sender, `${target}@s.whatsapp.net`, ...demoted.map(n => `${n}@s.whatsapp.net`)]
      })

      // تبليغ المطور والمؤسس والنخبة
      const notifyJids = [
        '967772645417@s.whatsapp.net',
        `${groupOwner}@s.whatsapp.net`,
        ...eliteNumbers.map(([id]) => `${id}@s.whatsapp.net`)
      ]

      for (const jid of notifyJids) {
        await conn.sendMessage(jid, {
          text:
`🚨 *تبليغ أمني*

📍 المجموعة: ${groupMetadata.subject}
👤 من: @${actor}
🎯 إلى: @${target}
🕒 ${date} - ${time}
❗ تم سحب الإشراف بسبب محاولة غير مصرح بها.`,
          mentions: [`${actor}@s.whatsapp.net`, `${target}@s.whatsapp.net`]
        }).catch(() => {})
      }
    }
  }
}

/* ——— 5. خصائص البلوجن ——— */
handler.help = ['الحماية <فتح|قفل|مطلقة فتح|مطلقة قفل|حالة>']
handler.tags = ['group']
handler.command = ['الحماية', 'ح']
handler.group = true
handler.botAdmin = true
handler.owner = true

export default handler