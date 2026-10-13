import { useEffect, useRef, useState } from 'react'
import { exportPng } from '../utils/exportImage.js'
import { shrink } from '../utils/shrinkImage.js'
import { Ic } from './Icons.jsx'

const COLORS = [['Yashil', '#17a368'], ["Ko'k", '#2563eb'], ['Burgundy', '#a3203f'], ['Navy', '#2a3f8f'], ['Black', '#374151'], ['Gold', '#b8892b'], ['Rose', '#d9648a'], ['Lavender', '#7a63c9']]
const OK = ['image/jpeg', 'image/png', 'image/webp']
const blankJob = { dates: '', title: '', company: '', desc: '' }
const blankEdu = { dates: '', school: '', degree: '' }
const DEF = {
  name: 'Elyor Karimov', role: 'Frontend dasturchi',
  phone: '+998 90 123 45 67', email: 'elyor@example.com', address: "Toshkent, O'zbekiston", telegram: '@elyor_dev',
  about: "3 yildan ortiq amaliy tajribaga ega frontend dasturchi. React va zamonaviy CSS bilan tez, qulay va chiroyli veb-ilovalar yarataman.",
  skills: 'JavaScript, React, TypeScript, HTML, CSS, Git, REST API',
  langs: "O'zbek tili (Ona tili)\nIngliz tili (B1)\nRus tili (Muloqot)",
  links: 'https://elyor-dev.uz',
  jobs: [
    { dates: '2023 - Hozirgacha', title: 'Frontend dasturchi', company: 'Tech LLC', desc: "Katta hajmdagi veb-ilovaning UI komponentlarini ishlab chiqdim va yuklanish tezligini 30% ga oshirdim." },
    { dates: '2021 - 2023', title: 'Web dizayner', company: 'Studio Nur', desc: "10 dan ortiq mijoz uchun sayt va landing sahifalar yaratdim." },
  ],
  edu: [{ dates: '2017 - 2021', school: 'Toshkent Axborot Texnologiyalari Universiteti', degree: 'Dasturiy injiniring, Bakalavr' }],
  color: '#17a368',
}

const lines = (s) => s.split('\n').map((x) => x.trim()).filter(Boolean)

export default function Resume({ tab }) {
  const [d, setD] = useState(() => { try { return { ...DEF, ...JSON.parse(localStorage.getItem('invitex-cv4') || '{}') } } catch { return DEF } })
  const [photo, setPhoto] = useState(() => { try { return localStorage.getItem('invitex-cv-photo') || '' } catch { return '' } })
  const [err, setErr] = useState('')
  const file = useRef(null)
  const ref = useRef(null)
  const set = (k) => (e) => setD((s) => ({ ...s, [k]: e.target.value }))
  useEffect(() => { try { localStorage.setItem('invitex-cv4', JSON.stringify(d)) } catch {} }, [d])
  useEffect(() => { try { photo ? localStorage.setItem('invitex-cv-photo', photo) : localStorage.removeItem('invitex-cv-photo') } catch {} }, [photo])

  const upload = async (e) => {
    const f = e.target.files[0]; e.target.value = ''
    if (!f) return
    if (!OK.includes(f.type)) return setErr("Bu rasm formatini qo'llab-quvvatlab bo'lmaydi.")
    if (f.size > 8 * 1024 * 1024) return setErr('Rasm juda katta. 8 MB dan kichik rasm tanlang.')
    try { setPhoto(await shrink(f)); setErr('') } catch { setErr("Rasmni o'qib bo'lmadi.") }
  }
  const download = async () => { try { await exportPng(ref.current, 'rezyume.png', '#ffffff') } catch (e) { console.error(e); alert('Yuklab olishda xatolik.') } }

  const upd = (key, i, f, v) => setD((s) => ({ ...s, [key]: s[key].map((x, j) => (j === i ? { ...x, [f]: v } : x)) }))
  const add = (key, blank) => setD((s) => ({ ...s, [key]: [...s[key], { ...blank }] }))
  const del = (key, i) => setD((s) => ({ ...s, [key]: s[key].filter((_, j) => j !== i) }))
  const F = ([k, label, area]) => <label key={k}>{label}{area ? <textarea rows="3" value={d[k]} onChange={set(k)} /> : <input value={d[k]} onChange={set(k)} />}</label>
  const Ef = (key, i, f, label, area) => (
    <label key={f}>{label}{area
      ? <textarea rows="2" value={d[key][i][f]} onChange={(e) => upd(key, i, f, e.target.value)} />
      : <input value={d[key][i][f]} onChange={(e) => upd(key, i, f, e.target.value)} />}</label>
  )

  const skills = d.skills.split(',').map((x) => x.trim()).filter(Boolean)
  const langs = lines(d.langs), links = lines(d.links)
  const jobs = d.jobs.filter((j) => j.title || j.company || j.dates || j.desc)
  const edus = d.edu.filter((x) => x.school || x.degree || x.dates)
  const Head = ({ icon, title }) => <h4><Ic n={icon} s={15} />{title}</h4>

  return (
    <main className={`layout show-${tab}`}>
      <aside className="left"><div className="editor">
        <section className="sec"><h3>Rasm</h3><p className="hint">Ixtiyoriy · JPG, PNG, WEBP</p>
          {photo ? <div className="thumb"><img src={photo} alt="Rezyume rasmi" /><button className="btn" onClick={() => setPhoto('')}>O'chirish</button></div>
            : <button className="drop" onClick={() => file.current.click()}><span>⬆</span>Rasm qo'shish<small>Ixtiyoriy</small></button>}
          <input ref={file} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={upload} />
          {err && <p className="err" role="alert">{err}</p>}
        </section>
        <section className="sec"><h3>Shaxsiy ma'lumotlar</h3>{[['name', 'Ism familiya'], ['role', 'Lavozim']].map(F)}</section>
        <section className="sec"><h3>Aloqa</h3>{[['phone', 'Telefon'], ['email', 'Email'], ['address', 'Manzil'], ['telegram', 'Telegram']].map(F)}</section>
        <section className="sec"><h3>Men haqimda</h3>{F(['about', 'Qisqacha', true])}</section>
        <section className="sec"><h3>Ko'nikmalar</h3><p className="hint">Vergul bilan ajrating</p>{F(['skills', "Ko'nikmalar"])}</section>
        <section className="sec"><h3>Tillar</h3><p className="hint">Har qatorga bitta til</p>{F(['langs', 'Tillar', true])}</section>
        <section className="sec"><h3>Havolalar</h3><p className="hint">Har qatorga bitta havola</p>{F(['links', 'Havolalar', true])}</section>
        <section className="sec"><h3>Ish tajribasi</h3>
          {d.jobs.map((j, i) => (
            <div className="entry" key={i}>
              <div className="entry-h"><b>{i + 1}-ish joyi</b><button className="link-btn" onClick={() => del('jobs', i)}>O'chirish</button></div>
              {Ef('jobs', i, 'title', 'Lavozim')}{Ef('jobs', i, 'company', 'Kompaniya')}{Ef('jobs', i, 'dates', 'Yillar (2021 - 2023)')}{Ef('jobs', i, 'desc', 'Qisqa tavsif', true)}
            </div>
          ))}
          <button className="btn" onClick={() => add('jobs', blankJob)}>+ Ish joyi qo'shish</button>
        </section>
        <section className="sec"><h3>Ta'lim</h3>
          {d.edu.map((x, i) => (
            <div className="entry" key={i}>
              <div className="entry-h"><b>{i + 1}-o'quv yurti</b><button className="link-btn" onClick={() => del('edu', i)}>O'chirish</button></div>
              {Ef('edu', i, 'school', "O'quv yurti")}{Ef('edu', i, 'degree', 'Yo\'nalish, daraja')}{Ef('edu', i, 'dates', 'Yillar (2017 - 2021)')}
            </div>
          ))}
          <button className="btn" onClick={() => add('edu', blankEdu)}>+ O'quv yurti qo'shish</button>
        </section>
        <section className="sec"><h3>Rang</h3>
          <div className="swatches">{COLORS.map(([n, c]) => <button key={n} className={`sw ${d.color === c ? 'on' : ''}`} style={{ background: c }} title={n} aria-label={n} onClick={() => setD((x) => ({ ...x, color: c }))} />)}
            <label className="sw pick" title="Boshqa rang">+<input type="color" value={d.color} onChange={set('color')} aria-label="Boshqa rang" /></label></div></section>
        <button className="btn ghost wide-btn" onClick={() => { setD(DEF); setPhoto('') }}>Tozalash</button>
      </div></aside>

      <section className="right" aria-label="Rezyume ko'rinishi">
        <div className="stage">
          <article className="cv3" ref={ref} style={{ '--ac': d.color }}>
            <header className="cv3-head">
              <div className="cv3-id">
                <h1>{d.name}</h1>
                {d.role && <p className="role">{d.role}</p>}
                <ul className="contacts">
                  {d.phone && <li><Ic n="phone" />{d.phone}</li>}
                  {d.email && <li><Ic n="mail" />{d.email}</li>}
                  {d.address && <li><Ic n="pin" />{d.address}</li>}
                  {d.telegram && <li><Ic n="tg" />{d.telegram}</li>}
                </ul>
              </div>
              {photo && <img className="cv3-photo" src={photo} alt="Rezyume egasining rasmi" />}
            </header>
            <div className="cv3-body">
              <div className="cv3-side">
                {d.about.trim() && <section><Head icon="user" title="Men haqimda" /><p>{d.about}</p></section>}
                {skills.length > 0 && <section><Head icon="code" title="Ko'nikmalar" /><div className="chips2">{skills.map((s, i) => <span key={i}>{s}</span>)}</div></section>}
                {langs.length > 0 && <section><Head icon="lang" title="Tillar" /><ul className="dots">{langs.map((l, i) => <li key={i}>{l}</li>)}</ul></section>}
                {links.length > 0 && <section><Head icon="globe" title="Havolalar" /><ul className="links">{links.map((l, i) => <li key={i}>{l}</li>)}</ul></section>}
              </div>
              <div className="cv3-main">
                {jobs.length > 0 && <section><Head icon="work" title="Ish tajribasi" />
                  {jobs.map((j, i) => (
                    <div className="job" key={i}>
                      <div className="job-h"><b>{j.title}</b>{j.dates && <span className="pill">{j.dates}</span>}</div>
                      {j.company && <div className="co">{j.company}</div>}
                      {j.desc && <p>{j.desc}</p>}
                    </div>
                  ))}</section>}
                {edus.length > 0 && <section><Head icon="edu" title="Ta'lim" />
                  {edus.map((x, i) => (
                    <div className="job" key={i}>
                      <div className="job-h"><b>{x.school}</b>{x.dates && <span className="yrs">{x.dates}</span>}</div>
                      {x.degree && <p>{x.degree}</p>}
                    </div>
                  ))}</section>}
              </div>
            </div>
          </article>
        </div>
        <div className="actions"><button className="btn gold big" onClick={download}>⬇ Yuklab olish</button><button className="btn" onClick={() => window.print()}>Chop etish</button></div>
      </section>
    </main>
  )
}
