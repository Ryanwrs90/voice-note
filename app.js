// ---------- icons ----------
const ICON = {
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
};

// ---------- transcription providers ----------
const PROVIDERS = {
  groq: {
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/audio/transcriptions',
    model: 'whisper-large-v3',
    keyUrl: 'https://console.groq.com/keys',
    note: '有免费额度',
  },
  openai: {
    name: 'OpenAI',
    url: 'https://api.openai.com/v1/audio/transcriptions',
    model: 'gpt-4o-transcribe',
    keyUrl: 'https://platform.openai.com/api-keys',
    note: '按分钟收费',
  },
};
// A mixed Chinese/English sample steers Whisper toward simplified Chinese that keeps English words as-is.
const DEFAULT_PROMPT = '嗯，我想记一下这个idea，明天要follow up一下meeting的内容，然后send个email给John。';

// Auto-detect misfires on short clips (e.g. "一二三" came back as "ESR"), so default to Mandarin.
const LANGS = { zh: '普通话', auto: '自动判断' };
const DEFAULTS = { provider: 'groq', key: '', model: '', prompt: '', lang: 'zh' };

const settings = {
  get() {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('settings') || '{}') }; }
    catch { return { ...DEFAULTS }; }
  },
  set(v) { try { localStorage.setItem('settings', JSON.stringify(v)); } catch {} },
};

// ---------- helpers ----------
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const fmtDur = s => { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
function fmtDate(ts) {
  const d = new Date(ts), now = new Date();
  const hm = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  if (d.toDateString() === now.toDateString()) return '今天 ' + hm;
  const y = new Date(now); y.setDate(now.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return '昨天 ' + hm;
  const md = (d.getMonth() + 1) + '月' + d.getDate() + '日';
  return (d.getFullYear() === now.getFullYear() ? md : d.getFullYear() + '年' + md) + ' ' + hm;
}
function titleOf(it) {
  if (it.title) return it.title;
  if (it.transcript) return it.transcript.replace(/\s+/g, ' ').slice(0, 60);
  return '';
}
let toastTimer;
function toast(msg, action) {
  const t = $('#toast');
  t.textContent = msg;
  if (action) {
    const b = document.createElement('button');
    b.className = 'toast-act';
    b.textContent = action.label;
    b.onclick = () => { t.hidden = true; action.run(); };
    t.append(b);
  }
  t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), action ? 4500 : 2800);
}

// ---------- state ----------
let items = [];
let query = '';
let showDone = false;
let openId = null;

async function save(it) { await DB.putItem(it); }

async function loadAudio(id) {
  const rec = await DB.getAudio(id);
  if (!rec) return null;
  return rec instanceof Blob ? rec : new Blob([rec.buf], { type: rec.type });
}

async function deleteItem(id) {
  const it = items.find(i => i.id === id);
  if (!it) return;
  const audio = it.hasAudio ? await DB.getAudio(id) : null;
  items = items.filter(i => i !== it);
  await DB.deleteItem(id);
  if (audio) await DB.deleteAudio(id);
  render();
  toast('已删除', {
    label: '撤销',
    run: async () => {
      items.push(it);
      await save(it);
      if (audio) await DB.putAudio(id, audio);
      render();
    },
  });
}

// ---------- list ----------
function statusMeta(it) {
  if (!it.hasAudio) return '';
  const dur = `${ICON.play}<span>${fmtDur(it.duration)}</span>`;
  switch (it.status) {
    case 'pending': return `${dur}<span>· 转写中…</span>`;
    case 'error': return `${dur}<span class="warn">· 转写失败</span>`;
    case 'nokey': return `${dur}<span class="warn">· 未设置转写</span>`;
    default: return dur;
  }
}

function rowHTML(it) {
  const t = titleOf(it);
  const title = t ? esc(t) : (it.status === 'pending' ? '转写中…' : '语音备忘');
  const meta = [statusMeta(it), `<span>${it.hasAudio ? '· ' : ''}${fmtDate(it.createdAt)}</span>`].join('');
  return `<li class="row-wrap" data-id="${it.id}">
    <div class="swipe-bg" aria-hidden="true">${ICON.trash}<span>删除</span></div>
    <div class="row">
      <button class="check${it.done ? ' on' : ''}" data-act="check" aria-label="${it.done ? '标为未完成' : '标为完成'}"></button>
      <div class="body"><div class="title${t ? '' : ' muted'}">${title}</div><div class="meta">${meta}</div></div>
    </div>
  </li>`;
}

function render() {
  const q = query.trim().toLowerCase();
  const match = it => !q || (titleOf(it) + ' ' + (it.transcript || '')).toLowerCase().includes(q);
  const active = items.filter(i => !i.done && match(i)).sort((a, b) => b.createdAt - a.createdAt);
  const done = items.filter(i => i.done && match(i)).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));

  const list = $('#list');
  const editing = list.querySelector('.row-input');
  list.innerHTML = active.map(rowHTML).join('');
  if (editing) list.prepend(editing.closest('li'));

  $('#empty').hidden = active.length > 0 || done.length > 0 || !!editing;
  $('#empty').textContent = q ? '没有找到相关内容' : '按下面的红色按钮，把想法说出来';

  const toggle = $('#done-toggle');
  toggle.hidden = done.length === 0;
  toggle.classList.toggle('open', showDone || !!q);
  toggle.innerHTML = `${ICON.chevron}<span>已完成 ${done.length}</span>`;
  const dl = $('#done-list');
  dl.hidden = !(showDone || q) || done.length === 0;
  dl.innerHTML = done.map(rowHTML).join('');
}

function onListClick(e) {
  const wrap = e.target.closest('[data-id]');
  if (!wrap || wrap.querySelector('.row').dataset.swiped) return;
  const it = items.find(i => i.id === wrap.dataset.id);
  if (!it) return;
  if (e.target.closest('[data-act="check"]')) {
    it.done = !it.done;
    it.doneAt = it.done ? Date.now() : null;
    save(it);
    if (it.done) {
      e.target.closest('.check').classList.add('on');
      setTimeout(render, 450);
    } else render();
    return;
  }
  openDetail(it.id);
}

// Swipe a row to the right to delete it (undo via toast).
function enableSwipe(list) {
  let s = null;
  list.addEventListener('pointerdown', e => {
    const row = e.target.closest('.row');
    if (!row || !row.parentElement.dataset.id || e.button > 0) return;
    s = { row, x0: e.clientX, y0: e.clientY, dx: 0, mode: null, pid: e.pointerId };
  });
  list.addEventListener('pointermove', e => {
    if (!s || e.pointerId !== s.pid) return;
    const dx = e.clientX - s.x0, dy = e.clientY - s.y0;
    if (!s.mode) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      s.mode = dx > 0 && Math.abs(dx) > Math.abs(dy) ? 'swipe' : 'none';
      if (s.mode === 'swipe') {
        s.row.setPointerCapture(e.pointerId);
        s.row.classList.remove('snap');
      }
    }
    if (s.mode !== 'swipe') return;
    s.dx = Math.max(0, dx);
    s.row.style.transform = `translateX(${s.dx}px)`;
  });
  const end = e => {
    if (!s || e.pointerId !== s.pid) return;
    const { row, dx, mode } = s;
    s = null;
    if (mode !== 'swipe') return;
    row.dataset.swiped = '1';
    setTimeout(() => delete row.dataset.swiped, 300);
    row.classList.add('snap');
    if (dx > row.offsetWidth * 0.35) {
      row.style.transform = 'translateX(100%)';
      setTimeout(() => deleteItem(row.parentElement.dataset.id), 180);
    } else row.style.transform = '';
  };
  list.addEventListener('pointerup', end);
  list.addEventListener('pointercancel', end);
}

// ---------- new text item ----------
function addText() {
  if ($('#list .row-input')) return $('#list .row-input').focus();
  const li = document.createElement('li');
  li.className = 'row-wrap';
  li.innerHTML = '<div class="row"><span class="check"></span><input class="row-input" placeholder="新想法" enterkeyhint="done"></div>';
  $('#list').prepend(li);
  $('#empty').hidden = true;
  const input = li.querySelector('input');
  let committed = false;
  const commit = async () => {
    if (committed) return;
    committed = true;
    const text = input.value.trim();
    li.remove();
    if (text) {
      const it = { id: uid(), createdAt: Date.now(), title: text, hasAudio: false, done: false };
      items.push(it);
      await save(it);
    }
    render();
  };
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } });
  input.addEventListener('blur', commit);
  input.focus();
}

// ---------- recording ----------
let rec = null, recStream = null, recChunks = [], recStart = 0, recTimer = null;

function pickMime() {
  if (!window.MediaRecorder) return '';
  return ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'].find(t => MediaRecorder.isTypeSupported(t)) || '';
}

async function startRec() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return toast('这个浏览器不支持录音');
  try {
    recStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  } catch (err) {
    return toast(err.name === 'NotAllowedError' ? '没有麦克风权限，请在设置里允许' : '无法开始录音');
  }
  const mime = pickMime();
  rec = new MediaRecorder(recStream, mime ? { mimeType: mime } : undefined);
  recChunks = [];
  rec.ondataavailable = e => e.data.size && recChunks.push(e.data);
  rec.start(1000);
  recStart = Date.now();
  $('#rec-time').textContent = '0:00';
  recTimer = setInterval(() => ($('#rec-time').textContent = fmtDur((Date.now() - recStart) / 1000)), 250);
  $('#bar').hidden = true;
  $('#rec-panel').hidden = false;
  if (navigator.vibrate) navigator.vibrate(10);
}

async function stopRec(keep) {
  if (!rec) return;
  clearInterval(recTimer);
  const duration = (Date.now() - recStart) / 1000;
  await new Promise(r => { rec.onstop = r; rec.stop(); });
  recStream.getTracks().forEach(t => t.stop());
  const type = rec.mimeType || pickMime() || 'audio/mp4';
  const chunks = recChunks;
  rec = null; recStream = null; recChunks = [];
  $('#rec-panel').hidden = true;
  $('#bar').hidden = false;
  if (!keep) return;
  if (duration < 0.8) return toast('录音太短，没有保存');

  const blob = new Blob(chunks, { type });
  const it = { id: uid(), createdAt: Date.now(), hasAudio: true, duration, done: false, status: 'pending' };
  // Stored as ArrayBuffer: more reliable than Blob in Safari's IndexedDB.
  await DB.putAudio(it.id, { type: blob.type, buf: await blob.arrayBuffer() });
  items.push(it);
  await save(it);
  render();
  transcribe(it);
}

// ---------- transcription ----------
function extFor(type) {
  if (type.includes('webm')) return 'webm';
  if (type.includes('ogg')) return 'ogg';
  if (type.includes('wav')) return 'wav';
  return 'm4a';
}

async function transcribe(it) {
  const s = settings.get();
  if (!s.key) {
    it.status = 'nokey';
    await save(it); render(); refreshDetail(it.id);
    return;
  }
  const p = PROVIDERS[s.provider] || PROVIDERS.groq;
  it.status = 'pending'; it.error = '';
  await save(it); render(); refreshDetail(it.id);
  try {
    const blob = await loadAudio(it.id);
    if (!blob) throw new Error('找不到录音文件');
    const fd = new FormData();
    fd.append('file', blob, 'memo.' + extFor(blob.type));
    fd.append('model', s.model.trim() || p.model);
    fd.append('prompt', s.prompt.trim() || DEFAULT_PROMPT);
    if (s.lang !== 'auto') fd.append('language', s.lang);
    fd.append('response_format', 'json');
    const r = await fetch(p.url, { method: 'POST', headers: { Authorization: 'Bearer ' + s.key.trim() }, body: fd });
    if (!r.ok) {
      let msg = r.status + '';
      try { const j = await r.json(); msg = j.error?.message || msg; } catch {}
      if (r.status === 401) msg = 'API key 不正确';
      throw new Error(msg);
    }
    const j = await r.json();
    it.transcript = (j.text || '').trim();
    it.status = 'done';
  } catch (err) {
    it.status = 'error';
    it.error = navigator.onLine === false ? '没有网络' : (err.message || String(err));
  }
  if (!items.includes(it)) return;
  await save(it); render(); refreshDetail(it.id);
}

// ---------- sheet (detail + settings) ----------
let audioEl = null, audioUrl = null;

function openSheet(html) {
  const sheet = $('#sheet');
  sheet.innerHTML = '<div class="grab"></div>' + html;
  sheet.style.transform = '';
  $('#sheet-overlay').hidden = false;
  enableSwipeClose(sheet);
}

function closeSheet() {
  $('#sheet-overlay').hidden = true;
  $('#sheet').innerHTML = '';
  openId = null;
  if (audioEl) { audioEl.pause(); audioEl = null; }
  if (audioUrl) { URL.revokeObjectURL(audioUrl); audioUrl = null; }
}

function enableSwipeClose(sheet) {
  const grab = sheet.querySelector('.grab');
  let y0 = null, dy = 0;
  const start = e => { y0 = (e.touches ? e.touches[0] : e).clientY; dy = 0; sheet.style.transition = 'none'; };
  const move = e => {
    if (y0 === null) return;
    dy = Math.max(0, (e.touches ? e.touches[0] : e).clientY - y0);
    sheet.style.transform = `translateY(${dy}px)`;
  };
  const end = () => {
    if (y0 === null) return;
    y0 = null; sheet.style.transition = '';
    if (dy > 90) { sheet.style.transform = 'translateY(100%)'; setTimeout(closeSheet, 180); }
    else sheet.style.transform = '';
  };
  grab.addEventListener('touchstart', start, { passive: true });
  grab.addEventListener('touchmove', move, { passive: true });
  grab.addEventListener('touchend', end);
}

function transcriptStatusHTML(it) {
  if (it.status === 'pending') return '<p class="status-note">转写中…</p>';
  if (it.status === 'nokey') return '<p class="status-note err">还没设置转写服务。点右上角齿轮，填入 API key。</p>';
  if (it.status === 'error') return `<p class="status-note err">转写失败：${esc(it.error)}</p>`;
  return '';
}

async function openDetail(id) {
  const it = items.find(i => i.id === id);
  if (!it) return;
  openId = id;
  const speeds = [1, 1.5, 2];
  openSheet(`
    <textarea class="title-input" id="d-title" rows="1" placeholder="${it.hasAudio ? '加标题' : '想法'}">${esc(it.title || '')}</textarea>
    <p class="sub-time">${fmtDate(it.createdAt)}</p>
    ${it.hasAudio ? `
    <div class="player">
      <button class="play-btn" id="d-play" aria-label="播放">${ICON.play}</button>
      <input type="range" id="d-seek" min="0" max="1000" value="0" step="1" aria-label="进度">
      <span class="time" id="d-time">${fmtDur(it.duration)}</span>
      <button class="speed" id="d-speed">1x</button>
    </div>
    <div class="section-label"><span>转写文字</span>
      <button class="text-btn with-icon" id="d-retry">${ICON.refresh}<span>重新转写</span></button></div>
    <textarea class="transcript" id="d-transcript" placeholder="${it.status === 'pending' ? '转写中…' : ''}">${esc(it.transcript || '')}</textarea>
    <div id="d-status">${transcriptStatusHTML(it)}</div>` : ''}
    <div class="sheet-actions">
      <button class="danger-btn" id="d-delete">${ICON.trash}<span>删除</span></button>
      <button class="text-btn" id="d-close">完成</button>
    </div>`);

  const title = $('#d-title');
  const grow = el => { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; };
  grow(title);
  title.addEventListener('input', () => { grow(title); it.title = title.value.trim(); save(it); render(); });
  title.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); title.blur(); } });
  $('#d-close').onclick = closeSheet;
  $('#d-delete').onclick = () => { closeSheet(); deleteItem(id); };
  if (!it.hasAudio) { if (!it.title) title.focus(); return; }

  const tr = $('#d-transcript');
  tr.addEventListener('input', () => { it.transcript = tr.value; if (it.status !== 'done') it.status = 'done'; save(it); render(); });
  $('#d-retry').onclick = () => transcribe(it);

  const blob = await loadAudio(id);
  if (!blob || openId !== id) return;
  audioUrl = URL.createObjectURL(blob);
  audioEl = new Audio(audioUrl);
  audioEl.preload = 'auto';
  let si = 0;
  const total = () => (isFinite(audioEl.duration) && audioEl.duration > 0 ? audioEl.duration : it.duration);
  const playBtn = $('#d-play'), seek = $('#d-seek'), time = $('#d-time');
  let dragging = false;
  audioEl.ontimeupdate = () => {
    if (dragging) return;
    seek.value = Math.round((audioEl.currentTime / total()) * 1000);
    time.textContent = fmtDur(audioEl.currentTime);
  };
  audioEl.onplay = () => { playBtn.innerHTML = ICON.pause; playBtn.setAttribute('aria-label', '暂停'); };
  audioEl.onpause = () => { playBtn.innerHTML = ICON.play; playBtn.setAttribute('aria-label', '播放'); };
  audioEl.onended = () => { playBtn.innerHTML = ICON.play; seek.value = 0; time.textContent = fmtDur(it.duration); };
  playBtn.onclick = () => (audioEl.paused ? audioEl.play().catch(() => toast('无法播放')) : audioEl.pause());
  seek.oninput = () => { dragging = true; time.textContent = fmtDur((seek.value / 1000) * total()); };
  seek.onchange = () => { audioEl.currentTime = (seek.value / 1000) * total(); dragging = false; };
  $('#d-speed').onclick = e => {
    si = (si + 1) % speeds.length;
    audioEl.playbackRate = speeds[si];
    e.currentTarget.textContent = speeds[si] + 'x';
  };
}

function refreshDetail(id) {
  if (openId !== id) return;
  const it = items.find(i => i.id === id);
  const st = $('#d-status'), tr = $('#d-transcript');
  if (!it || !st) return;
  st.innerHTML = transcriptStatusHTML(it);
  if (document.activeElement !== tr) {
    tr.value = it.transcript || '';
    tr.placeholder = it.status === 'pending' ? '转写中…' : '';
  }
}

function openSettings() {
  const s = settings.get();
  const provHTML = cur => Object.entries(PROVIDERS)
    .map(([k, p]) => `<button data-p="${k}" class="${k === cur ? 'on' : ''}">${p.name}</button>`).join('');
  const hintHTML = k => {
    const p = PROVIDERS[k];
    return `${p.note}。<a href="${p.keyUrl}" target="_blank" rel="noopener">去 ${p.name} 拿 API key</a>`;
  };
  const langHTML = cur => Object.entries(LANGS)
    .map(([k, name]) => `<button data-l="${k}" class="${k === cur ? 'on' : ''}">${name}</button>`).join('');
  openSheet(`
    <div class="sheet-head"><h2>转写设置</h2><button class="icon-btn" id="s-close" aria-label="关闭">${ICON.x}</button></div>
    <div class="field"><label>转写服务</label><div class="seg" id="s-prov">${provHTML(s.provider)}</div>
      <p class="hint" id="s-hint">${hintHTML(s.provider)}</p></div>
    <div class="field"><label>说话语言</label><div class="seg" id="s-lang">${langHTML(s.lang)}</div>
      <p class="hint">中文夹英文选普通话，英文单词会保留。</p></div>
    <div class="field"><label for="s-key">API key</label>
      <input id="s-key" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="gsk_…" value="${esc(s.key)}">
      <p class="hint">只保存在这台手机的浏览器里。</p></div>
    <details class="adv"><summary>进阶</summary>
      <div class="field"><label for="s-model">模型（留空用默认）</label><input id="s-model" placeholder="${esc(PROVIDERS[s.provider].model)}" value="${esc(s.model)}"></div>
      <div class="field"><label for="s-prompt">提示句（帮助识别中英混说和专有名词）</label><textarea id="s-prompt" placeholder="${esc(DEFAULT_PROMPT)}">${esc(s.prompt)}</textarea></div>
    </details>
    <button class="primary-btn" id="s-save">保存</button>`);
  let provider = s.provider;
  $('#s-prov').onclick = e => {
    const b = e.target.closest('[data-p]');
    if (!b) return;
    provider = b.dataset.p;
    $('#s-prov').innerHTML = provHTML(provider);
    $('#s-hint').innerHTML = hintHTML(provider);
    $('#s-model').placeholder = PROVIDERS[provider].model;
    $('#s-key').placeholder = provider === 'groq' ? 'gsk_…' : 'sk-…';
  };
  let lang = s.lang;
  $('#s-lang').onclick = e => {
    const b = e.target.closest('[data-l]');
    if (!b) return;
    lang = b.dataset.l;
    $('#s-lang').innerHTML = langHTML(lang);
  };
  $('#s-close').onclick = closeSheet;
  $('#s-save').onclick = () => {
    settings.set({ provider, lang, key: $('#s-key').value.trim(), model: $('#s-model').value.trim(), prompt: $('#s-prompt').value.trim() });
    closeSheet();
    toast('已保存');
    // Retry memos that were waiting for a key.
    items.filter(i => i.status === 'nokey').forEach(transcribe);
  };
}

// ---------- version / update ----------
// version.json is the single source: the value seen at launch is "this" version;
// a different value on a later check means a newer build is on the server.
let loadedVersion = null;
async function checkUpdate() {
  let v;
  try { v = (await (await fetch('version.json', { cache: 'no-store' })).json()).version; } catch { return; }
  if (!v) return;
  if (!loadedVersion) {
    loadedVersion = v;
    $('#version').textContent = 'v' + v;
  } else if (v !== loadedVersion) {
    $('#update').textContent = `新版本 v${v} · 点击更新`;
    $('#update').hidden = false;
  }
}

// ---------- search ----------
function openSearch() {
  $('#search').hidden = false;
  $('#search-input').focus();
}
function closeSearch() {
  $('#search').hidden = true;
  $('#search-input').value = '';
  query = '';
  render();
}

// ---------- init ----------
async function init() {
  $('#btn-settings').innerHTML = ICON.gear;
  $('#btn-add').innerHTML = ICON.plus;
  $('#btn-search').innerHTML = ICON.search;
  $('#btn-cancel').innerHTML = ICON.x;

  $('#btn-rec').onclick = startRec;
  $('#btn-stop').onclick = () => stopRec(true);
  $('#btn-cancel').onclick = () => stopRec(false);
  $('#btn-add').onclick = addText;
  $('#btn-search').onclick = openSearch;
  $('#search-close').onclick = closeSearch;
  $('#search-input').oninput = e => { query = e.target.value; render(); };
  $('#btn-settings').onclick = openSettings;
  $('#list').onclick = onListClick;
  $('#done-list').onclick = onListClick;
  enableSwipe($('#list'));
  enableSwipe($('#done-list'));
  $('#update').onclick = () => location.reload();
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && checkUpdate());
  checkUpdate();
  $('#done-toggle').onclick = () => { showDone = !showDone; render(); };
  $('#sheet-overlay').onclick = e => { if (e.target.id === 'sheet-overlay') closeSheet(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#sheet-overlay').hidden) closeSheet(); });

  items = await DB.allItems();
  render();
  // Memos left "pending" were interrupted (app closed mid-request): try again.
  items.filter(i => i.status === 'pending').forEach(transcribe);

  if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
init();
