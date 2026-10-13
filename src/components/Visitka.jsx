import { useEffect, useMemo, useRef, useState } from 'react'
import { exportPng } from '../utils/exportImage.js'
import { shrink } from '../utils/shrinkImage.js'
import { qrSvg, qrText } from '../utils/qr.js'
import { Ic } from './Icons.jsx'

const COLORS = [['Yashil', '#0f7a55'], ['Navy', '#2a3f8f'], ['Burgundy', '#8a1f3a'], ['Black', '#1b1d22'], ['Gold', '#b8892b'], ['Rose', '#d9648a'], ['Lavender', '#7a63c9'], ["Ko'k", '#2563eb']]
const STYLES = [['split', 'Rangli'], ['dark', 'Qora'], ['light', 'Oq'], ['gradient', 'Gradient']]
const OK = ['image/jpeg', 'image/png', 'image/webp']
const DEF = {
  name: 'Elyor Karimov', role: 'Frontend dasturchi', company: 'Tech LLC', tagline: 'Zamonaviy veb-yechimlar',
  phone: '+998 90 123 45 67', email: 'elyor@example.com', site: 'elyor-dev.uz', address: "Toshkent, O'zbekiston", telegram: '@elyor_dev',
  qr: true, style: 'split', color: '#0f7a55',
}

export default function Visitka({ tab }) {
  const [d, setD] = useState(() => { try { return { ...DEF, ...JSON.parse(localStorage.getItem('invitex-card2') || '{}') } } catch { return DEF } })
  const [flip, setFlip] = useState(false)
  const [photo, setPhoto] = useState(() => { try { return localStorage.getItem('invitex-card-photo') || '' } catch { return '' } })
  const [err, setErr] = useState('')
  const front = useRef(null)
  const back = useRef(null)
  const file = useRef(null)
  const set = (k) => (e) => setD((s) => ({ ...s, [k]: e.target.value }))
  useEffect(() => { try { localStorage.setItem('invitex-card2', JSON.stringify(d)) } catch {} }, [d])
  useEffect(() => { try { photo ? localStorage.setItem('invitex-card-photo', photo) : localStorage.removeItem('invitex-card-photo') } catch {} }, [photo])
  const qr = useMemo(() => (d.qr ? qrSvg(qrText(d)) : ''), [d.qr, d.site, d.email, d.phone])

  const upload = async (e) => {
    const f = e.target.files[0]; e.target.value = ''
    if (!f) return
    if (!OK.includes(f.type)) return setErr("Bu rasm formatini qo'llab-quvvatlab bo'lmaydi.")
    if (f.size > 8 * 1024 * 1024) return setErr('Rasm juda katta. 8 MB dan kichik rasm tanlang.')
    try { setPhoto(await shrink(f)); setErr(''); setFlip(true) } catch { setErr("Rasmni o'qib bo'lmadi.") }
  }
  const save = async (el, name) => { try { await exportPng(el, name) } catch (e) { console.error(e); alert('Yuklab olishda xatolik.') } }
  const both = async () => { await save(front.current, 'visitka-old-tomon.png'); await save(back.current, 'visitka-orqa-tomon.png') }

  const F = ([k, label]) => <label key={k}>{label}<input value={d[k]} onChange={set(k)} /></label>
  const initials = d.name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('')
  const vars = { '--ac': d.color }

  return (
    <main className={`layout show-${tab}`}>
      <aside className="left"><div className="editor">
        <section className="sec"><h3>Rasm (orqa tomon)</h3><p className="hint">Ixtiyoriy · dumaloq shaklda chiqadi · JPG, PNG, WEBP</p>
          {photo ? <div className="thumb"><img src={photo} alt="Visitka rasmi" style={{ borderRadius: '50%' }} /><button className="btn" onClick={() => setPhoto('')}>O'chirish</button></div>
            : <button className="drop" onClick={() => file.current.click()}><span>⬆</span>Rasm qo'shish<small>Ixtiyoriy</small></button>}
          <input ref={file} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={upload} />
          {err && <p className="err" role="alert">{err}</p>}
        </section>
        <section className="sec"><h3>Ma'lumotlar</h3>{[['name', 'Ism familiya'], ['role', 'Lavozim'], ['company', 'Kompaniya'], ['tagline', 'Shior']].map(F)}</section>
        <section className="sec"><h3>Aloqa</h3>{[['phone', 'Telefon'], ['email', 'Email'], ['site', 'Sayt'], ['address', 'Manzil'], ['telegram', 'Telegram']].map(F)}
          <label className="toggle"><input type="checkbox" checked={d.qr} onChange={(e) => setD((s) => ({ ...s, qr: e.target.checked }))} /> QR kod <small>(sayt, bo'lmasa email yoki telefon)</small></label>
        </section>
        <section className="sec"><h3>Uslub</h3>
          <div className="chips">{STYLES.map(([id, l]) => <button key={id} className={`chip ${d.style === id ? 'on' : ''}`} onClick={() => setD((s) => ({ ...s, style: id }))}>{l}</button>)}</div></section>
        <section className="sec"><h3>Rang</h3>
          <div className="swatches">{COLORS.map(([n, c]) => <button key={n} className={`sw ${d.color === c ? 'on' : ''}`} style={{ background: c }} title={n} aria-label={n} onClick={() => setD((s) => ({ ...s, color: c }))} />)}
            <label className="sw pick" title="Boshqa rang">+<input type="color" value={d.color} onChange={set('color')} aria-label="Boshqa rang" /></label></div></section>
        <button className="btn ghost wide-btn" onClick={() => { setD(DEF); setPhoto('') }}>Tozalash</button>
      </div></aside>

      <section className="right" aria-label="Visitka ko'rinishi">
        <div className="stage vc-stage">
          <div className="vc-flip" role="button" tabIndex={0} aria-label="Visitkani aylantirish" onClick={() => setFlip((f) => !f)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlip((f) => !f) } }}>
            <div className={`vc-flip-in ${flip ? 'flipped' : ''}`}>
              <div ref={front} className={`vc front vc-${d.style}`} style={vars}>
                <i className="vc-orb" aria-hidden="true" />
                <div className="vc-in">
                  <div className="vc-top">
                    <div className="vc-who">
                      {d.company && <small className="co">{d.company}</small>}
                      <h2>{d.name}</h2>
                      {d.role && <p className="role">{d.role}</p>}
                    </div>
                    {qr && <div className="vc-qr" role="img" aria-label="QR kod" dangerouslySetInnerHTML={{ __html: qr }} />}
                  </div>
                  <div className="vc-rows">
                    {d.phone && <div className="vc-row"><span className="ico"><Ic n="phone" s="100%" /></span><span className="txt">{d.phone}</span></div>}
                    {d.email && <div className="vc-row"><span className="ico"><Ic n="mail" s="100%" /></span><span className="txt">{d.email}</span></div>}
                    {(d.address || d.telegram) && <div className="vc-row">
                      {d.address && <><span className="ico"><Ic n="pin" s="100%" /></span><span className="txt">{d.address}</span></>}
                      {d.telegram && <span className="tag">{d.telegram}</span>}
                    </div>}
                  </div>
                </div>
              </div>
              <div ref={back} className={`vc back vc-${d.style}`} style={vars}>
                <i className="vc-orb" aria-hidden="true" /><i className="vc-frame" aria-hidden="true" />
                <div className="vc-in center">
                  {photo ? <img className="vc-ph" src={photo} alt="Visitka egasining rasmi" /> : <div className="vc-mark">{initials}</div>}
                  <h2>{d.name}</h2>
                  {d.role && <p className="role">{d.role}</p>}
                  {d.site && <span className="site">{d.site}</span>}
                  {(d.company || d.tagline) && <div className="vc-end">{d.company && <b>{d.company}</b>}{d.tagline && <span>{d.tagline}</span>}</div>}
                </div>
              </div>
            </div>
          </div>
          <p className="vc-hint">{flip ? 'Orqa tomon' : 'Old tomon'} · aylantirish uchun kartani bosing ↻</p>
        </div>
        <div className="actions">
          <button className="btn gold big" onClick={both}>⬇ Ikkalasini yuklab olish</button>
          <button className="btn" onClick={() => save(front.current, 'visitka-old-tomon.png')}>Old tomon</button>
          <button className="btn" onClick={() => save(back.current, 'visitka-orqa-tomon.png')}>Orqa tomon</button>
          <button className="btn" onClick={() => setFlip((f) => !f)}>↻ Aylantirish</button>
          <button className="btn" onClick={() => window.print()}>Chop etish</button>
        </div>
      </section>
    </main>
  )
}
