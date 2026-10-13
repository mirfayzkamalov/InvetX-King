import qrcode from 'qrcode-generator'

// Matndan QR kod yasaydi va SVG qatori qaytaradi (rangi CSS orqali beriladi).
export function qrSvg(text) {
  if (!text) return ''
  try {
    const q = qrcode(0, 'M')
    q.addData(text)
    q.make()
    const n = q.getModuleCount()
    let d = ''
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path d="${d}" fill="#111"/></svg>`
  } catch { return '' }
}

// QR ichiga nima yoziladi: avval sayt, keyin email, keyin telefon.
export function qrText({ site, email, phone }) {
  const s = (site || '').trim(), e = (email || '').trim(), p = (phone || '').replace(/\s+/g, '')
  if (s) return /^https?:\/\//i.test(s) ? s : `https://${s}`
  if (e) return `mailto:${e}`
  if (p) return `tel:${p}`
  return ''
}
