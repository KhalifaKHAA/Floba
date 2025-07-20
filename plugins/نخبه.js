import fs from 'fs'

import { join } from 'path'

const ELITE_FILE = join(process.cwd(), 'elite.json')

if (!fs.existsSync(ELITE_FILE))

  fs.writeFileSync(ELITE_FILE, JSON.stringify([

    ['218927472437', 'المطور'],

    ['212694682412', 'البوت']

  ], null, 2))

const loadElite = () => JSON.parse(fs.readFileSync(ELITE_FILE))

const saveElite = data => fs.writeFileSync(ELITE_FILE, JSON.stringify(data, null, 2))

const getNumber = jid => jid?.split('@')[0] || ''

const isElite = jid => loadElite().some(([id]) => id === getNumber(jid))

/* ──────── أمر الإضافة ──────── */

async function addElite(m, { args }) {

  if (!isElite(m.sender)) return m.reply('❌ فقط النخبة يمكنهم إضافة نخبة.')

  const number = args[0]

  const name = args.slice(1).join(' ') || 'نخبة'

  if (!number || !/^\d+$/.test(number)) return m.reply('📌 الصيغة:\n.اضف_نخبة 201234567890 الاسم')

  const list = loadElite()

  if (list.some(([id]) => id === number)) return m.reply('✅ الرقم موجود بالفعل.')

  list.push([number, name])

  saveElite(list)

  m.reply(`✅ تم إضافة ${number} إلى النخبة باسم: ${name}`)

}

/* ──────── أمر الحذف ──────── */

async function removeElite(m, { args }) {

  if (!isElite(m.sender)) return m.reply('❌ فقط النخبة يمكنهم الحذف.')

  const number = args[0]

  if (!number || !/^\d+$/.test(number)) return m.reply('📌 الصيغة:\n.حذف_نخبة 201234567890')

  const list = loadElite()

  const index = list.findIndex(([id]) => id === number)

  if (index === -1) return m.reply('❌ الرقم غير موجود.')

  list.splice(index, 1)

  saveElite(list)

  m.reply(`✅ تم حذف ${number} من قائمة النخبة.`)

}

/* ──────── أمر العرض ──────── */

async function listElite(m) {

  const list = loadElite()

  if (!list.length) return m.reply('🚫 لا يوجد أي نخبة حالياً.')

  const text = list.map(([id, name], i) =>

    `🔹 ${i + 1}. wa.me/${id} ${name ? `(${name})` : ''}`

  ).join('\n')

  m.reply(`📜 *قائمة النخبة:*\n\n${text}`)

}

export const handler = async (m, data) => {

  const command = data.command.toLowerCase()

  switch (command) {

    case 'اضف_نخبة':

      return addElite(m, data)

    case 'حذف_نخبة':

      return removeElite(m, data)

    case 'النخبة':

      return listElite(m, data)

  }

}

handler.command = ['اضف_نخبة', 'حذف_نخبة', 'النخبة']
handler.owner = true 
handler.group = false