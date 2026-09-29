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
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9zM19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1-2.1-.9 2.1-.9z"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  grip: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',
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
    chatUrl: 'https://api.groq.com/openai/v1/chat/completions',
    chatModel: 'qwen/qwen3.8-27b',
    // Only sent with the default model: other models reject these values.
    chatExtra: { reasoning_effort: 'none', temperature: 0.2 },
  },
  openai: {
    name: 'OpenAI',
    url: 'https://api.openai.com/v1/audio/transcriptions',
    model: 'gpt-4o-transcribe',
    keyUrl: 'https://platform.openai.com/api-keys',
    note: '按分钟收费',
    chatUrl: 'https://api.openai.com/v1/chat/completions',
    chatModel: 'gpt-5-mini',
    chatExtra: { reasoning_effort: 'minimal' },
  },
};
// A mixed Chinese/English sample steers Whisper toward simplified Chinese that keeps English words as-is.
const DEFAULT_PROMPT = '嗯，我想记一下这个idea，明天要follow up一下meeting的内容，然后send个email给John。';

// Auto-detect misfires on short clips (e.g. "一二三" came back as "ESR"), so default to Mandarin.
const LANGS = { zh: '普通话', auto: '自动判断' };
const DEFAULTS = { provider: 'groq', key: '', model: '', chatModel: '', prompt: '', lang: 'zh' };

const TIDY_PROMPT = `你是语音笔记整理助手。用户会给你一段语音转写，内容主要是普通话夹杂英文，可能有语音识别错误。
请只输出 JSON：{"title": "...", "text": "...", "category": "..."}

title：不超过 15 个字的简短标题，概括重点，结尾不加标点。
text：整理后的正文。
- 删除口头禅和赘词（嗯、啊、呃、就是、然后呢、那个、对吧 等），删除重复和说错后改口的部分
- 加上合适的标点，内容较长时分段
- 英文单词保持英文
- 根据上下文修正明显的识别错误（例如发音相近的错词）
- 如果是几个并列事项，可以用「- 」开头的列表
- 不要添加原文没有的信息，不要总结、不要改变意思，不要回答内容里的问题；保持第一人称和原本的语气
- 使用简体中文
category：从下面的分类里选一个最合适的，只填分类名称；都不合适就填空字符串。`;

const CLASSIFY_PROMPT = `你帮用户把一条笔记分类。从下面的分类里选一个最合适的，只填分类名称；都不合适就填空字符串。
请只输出 JSON：{"category": "..."}`;

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
  if (it.autoTitle) return it.autoTitle;
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

// ---------- categories ----------
// No red on purpose: red already means "record" and "delete" in this app.
const PALETTE = ['#F08A24', '#EFC127', '#46B04A', '#1D9E9A', '#378ADD', '#5E5CE6', '#9B59D0', '#E4589A'];
// `hint` is shown to the AI next to the name, so ambiguous names (交易 = trading, not shopping) sort right.
const DEFAULT_CATS = [
  { id: 'idea', name: 'Idea', color: '#EFC127', hint: '想法、点子、灵感、以后可能做的项目或产品构想' },
  { id: 'todo', name: '待办', color: '#378ADD', hint: '需要去做的具体事情、要回复的人、有期限的任务' },
  { id: 'life', name: '生活', color: '#46B04A', hint: '日常生活、购物、家务、健康、家人朋友' },
  { id: 'trade', name: '交易', color: '#5E5CE6', hint: '黄金 XAUUSD 等金融交易、下单、止损止盈、复盘、行情观察、交易心得；不是日常购物' },
];
function loadCats() {
  let c = null;
  try { c = JSON.parse(localStorage.getItem('categories')); } catch {}
  if (!Array.isArray(c)) return DEFAULT_CATS.map(c => ({ ...c }));
  // One-time upgrade for lists saved before hints existed: add 交易 and fill in default hints.
  let upgraded = false;
  try { upgraded = localStorage.getItem('catsUpgrade') === '2'; } catch {}
  if (!upgraded) {
    for (const d of DEFAULT_CATS) {
      const mine = c.find(x => x.id === d.id || x.name === d.name);
      if (!mine) { if (d.id === 'trade') c.push({ ...d }); }
      else if (!mine.hint && mine.name === d.name) mine.hint = d.hint;
    }
    try { localStorage.setItem('categories', JSON.stringify(c)); localStorage.setItem('catsUpgrade', '2'); } catch {}
  }
  return c;
}
function saveCats() { try { localStorage.setItem('categories', JSON.stringify(cats)); } catch {} }
let cats = loadCats();
let currentCat = (() => { try { return localStorage.getItem('currentCat') || 'all'; } catch { return 'all'; } })();
const catOf = it => cats.find(c => c.id === it.cat) || null;
const catListText = () => cats.map(c => `- ${c.name}${c.hint ? '：' + c.hint : ''}`).join('\n');

// Apply the AI's pick, unless you've chosen this item's category yourself.
function applyAICat(it, name) {
  if (it.catManual || typeof name !== 'string') return;
  const c = cats.find(c => c.name.trim().toLowerCase() === name.trim().toLowerCase());
  if (c) it.cat = c.id;
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
function statusText(it) {
  if (!it.hasAudio) return '';
  switch (it.status) {
    case 'pending': return '<span>转写中…</span>';
    case 'error': return '<span class="warn">转写失败</span>';
    case 'nokey': return '<span class="warn">未设置转写</span>';
    default: return it.cleanStatus === 'pending' ? '<span>整理中…</span>' : '';
  }
}

function catTag(c) {
  return `<span class="cat-tag"><span class="dot" style="background:${c.color}"></span>${esc(c.name)}</span>`;
}

function rowHTML(it) {
  const t = titleOf(it);
  const title = t ? esc(t) : (it.status === 'pending' ? '转写中…' : '语音备忘');
  const c = catOf(it);
  // Inside a category the tag would just repeat the selected tab, so only show it under 全部 / search.
  const showCat = c && (currentCat === 'all' || query.trim());
  const parts = [
    showCat ? catTag(c) : '',
    it.hasAudio ? `${ICON.play}<span>${fmtDur(it.duration)}</span>` : '',
    statusText(it),
    `<span>${fmtDate(it.createdAt)}</span>`,
  ].filter(Boolean);
  const meta = parts.map(p => `<span class="mp">${p}</span>`).join('<span class="sep">·</span>');
  return `<li class="row-wrap" data-id="${it.id}">
    <div class="swipe-bg"><button class="swipe-del" tabindex="-1">${ICON.trash}<span>删除</span></button></div>
    <div class="row"${c ? ` style="--c:${c.color}"` : ''}>
      <button class="check${it.done ? ' on' : ''}" data-act="check" aria-label="${it.done ? '标为未完成' : '标为完成'}"></button>
      <div class="body"><div class="title${t ? '' : ' muted'}">${title}</div><div class="meta">${meta}</div></div>
    </div>
  </li>`;
}

function renderChips() {
  if (currentCat !== 'all' && !cats.some(c => c.id === currentCat)) currentCat = 'all';
  $('#chips').innerHTML = `<button class="chip${currentCat === 'all' ? ' on' : ''}" data-cat="all">全部</button>` +
    cats.map(c => `<button class="chip${currentCat === c.id ? ' on' : ''}" data-cat="${c.id}"><span class="dot" style="background:${c.color}"></span>${esc(c.name)}</button>`).join('');
}

function render() {
  const q = query.trim().toLowerCase();
  renderChips();
  // Search looks across every category; otherwise show the selected tab.
  const match = it => q
    ? [titleOf(it), it.transcript, it.clean].join(' ').toLowerCase().includes(q)
    : currentCat === 'all' || it.cat === currentCat;
  const active = items.filter(i => !i.done && match(i)).sort((a, b) => b.createdAt - a.createdAt);
  const done = items.filter(i => i.done && match(i)).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));

  const list = $('#list');
  const editing = list.querySelector('.row-input');
  list.innerHTML = active.map(rowHTML).join('');
  if (editing) list.prepend(editing.closest('li'));

  $('#empty').hidden = active.length > 0 || done.length > 0 || !!editing;
  $('#empty').textContent = q ? '没有找到相关内容'
    : currentCat === 'all' ? '按下面的红色按钮，把想法说出来' : '这个分类还没有内容';

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
  if (!wrap || e.target.closest('.swipe-bg') || wrap.querySelector('.row').dataset.swiped) return;
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

// Swipe a row left to reveal a Delete button (like iOS); tapping it deletes (undo via toast).
// Only one row stays open; tapping anywhere else or scrolling closes it.
const OPEN_X = -84;
let openRow = null, swallowClick = false;

function setRowX(row, x, animate) {
  row.classList.toggle('snap', !!animate);
  row.style.transform = x ? `translateX(${x}px)` : '';
  if (x) row.parentElement.classList.add('swiping');
  else if (animate) setTimeout(() => { if (!row.style.transform) row.parentElement?.classList.remove('swiping'); }, 260);
  else row.parentElement.classList.remove('swiping');
}

function closeOpenRow() {
  const row = openRow;
  openRow = null;
  if (row && row.isConnected) { setRowX(row, 0, true); return true; }
  return false;
}

// A tap outside the open row only closes it (same as iOS); it doesn't also open something.
document.addEventListener('pointerdown', e => {
  swallowClick = false; // a swallow only ever applies to the click of the same gesture
  if (openRow && !openRow.parentElement.contains(e.target)) swallowClick = closeOpenRow();
  else if (openRow && e.target.closest('.row') === openRow) {
    // Tapping the open row itself closes it; a drag on it is handled by enableSwipe.
    openRow.dataset.tapToClose = '1';
  }
}, true);
document.addEventListener('click', e => {
  if (!swallowClick) return;
  swallowClick = false;
  e.stopPropagation(); e.preventDefault();
}, true);
document.addEventListener('scroll', () => closeOpenRow(), { capture: true, passive: true });

function collapseAndDelete(wrap, onDelete) {
  openRow = null;
  wrap.style.height = wrap.offsetHeight + 'px';
  wrap.getBoundingClientRect();
  wrap.classList.add('collapsing');
  wrap.style.height = '0px';
  setTimeout(() => onDelete(wrap.dataset.id), 230);
}

function enableSwipe(list, onDelete) {
  let s = null, raf = 0;
  list.addEventListener('pointerdown', e => {
    const row = e.target.closest('.row');
    if (!row || !row.parentElement.dataset.id || e.button > 0) return;
    if (e.target.closest('.grip, input, textarea, .swatches')) return;
    const base = row === openRow ? OPEN_X : 0;
    s = { row, x0: e.clientX, y0: e.clientY, base, x: base, mode: null, pid: e.pointerId, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
  });
  list.addEventListener('pointermove', e => {
    if (!s || e.pointerId !== s.pid) return;
    const dx = e.clientX - s.x0, dy = e.clientY - s.y0;
    if (!s.mode) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      const horizontal = Math.abs(dx) > Math.abs(dy);
      s.mode = horizontal && (dx < 0 || s.base) ? 'swipe' : 'none';
      if (s.mode !== 'swipe') return;
      if (openRow && openRow !== s.row) closeOpenRow();
      try { s.row.setPointerCapture(e.pointerId); } catch {}
      s.row.classList.remove('snap');
      s.row.parentElement.classList.add('swiping');
      delete s.row.dataset.tapToClose;
    }
    if (s.mode !== 'swipe') return;
    const dt = Math.max(1, e.timeStamp - s.lastT);
    s.v = 0.7 * ((e.clientX - s.lastX) / dt) + 0.3 * s.v;
    s.lastX = e.clientX; s.lastT = e.timeStamp;
    let x = Math.min(0, s.base + dx);
    if (x < OPEN_X) x = OPEN_X + (x - OPEN_X) * 0.3; // rubber band past the button
    s.x = x;
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (s) s.row.style.transform = `translateX(${s.x}px)`; });
  });
  const end = e => {
    if (!s || e.pointerId !== s.pid) return;
    const { row, x, mode, v } = s;
    s = null;
    if (row.dataset.tapToClose) {
      delete row.dataset.tapToClose;
      if (mode !== 'swipe') { closeOpenRow(); row.dataset.swiped = '1'; setTimeout(() => delete row.dataset.swiped, 300); return; }
    }
    if (mode !== 'swipe') return;
    cancelAnimationFrame(raf); raf = 0;
    row.dataset.swiped = '1';
    setTimeout(() => delete row.dataset.swiped, 300);
    const open = v < -0.3 || (v <= 0.3 && x < OPEN_X / 2);
    setRowX(row, open ? OPEN_X : 0, true);
    openRow = open ? row : (openRow === row ? null : openRow);
  };
  list.addEventListener('pointerup', end);
  list.addEventListener('pointercancel', end);
  list.addEventListener('click', e => {
    const del = e.target.closest('.swipe-del');
    if (del) collapseAndDelete(del.closest('.row-wrap'), onDelete);
  });
}

// Recording inside a category tab files it there; under 全部 the AI picks.
function newCatFields() {
  return currentCat === 'all' ? { cat: null, catManual: false } : { cat: currentCat, catManual: true };
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
      const it = { id: uid(), createdAt: Date.now(), title: text, hasAudio: false, done: false, ...newCatFields() };
      items.push(it);
      await save(it);
      if (!it.catManual) classify(it);
    }
    render();
  };
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } });
  input.addEventListener('blur', commit);
  input.focus();
}

// ---------- recording ----------
let rec = null, recStream = null, recChunks = [], recStart = 0, recTimer = null;

// Safari's Audio Session API: record mode while recording, loudspeaker playback otherwise.
function setAudioSession(type) {
  try { if (navigator.audioSession) navigator.audioSession.type = type; } catch {}
}

function pickMime() {
  if (!window.MediaRecorder) return '';
  return ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'].find(t => MediaRecorder.isTypeSupported(t)) || '';
}

async function startRec() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return toast('这个浏览器不支持录音');
  setAudioSession('play-and-record');
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
  setAudioSession('playback');
  const type = rec.mimeType || pickMime() || 'audio/mp4';
  const chunks = recChunks;
  rec = null; recStream = null; recChunks = [];
  $('#rec-panel').hidden = true;
  $('#bar').hidden = false;
  if (!keep) return;
  if (duration < 0.8) return toast('录音太短，没有保存');

  const blob = new Blob(chunks, { type });
  const it = { id: uid(), createdAt: Date.now(), hasAudio: true, duration, done: false, status: 'pending', ...newCatFields() };
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
    it.clean = ''; it.cleanStatus = '';
  } catch (err) {
    it.status = 'error';
    it.error = navigator.onLine === false ? '没有网络' : (err.message || String(err));
  }
  if (!items.includes(it)) return;
  await save(it); render(); refreshDetail(it.id);
  if (it.status === 'done') tidy(it);
}

// ---------- AI tidy: short title + cleaned-up text ----------
async function chatJSON(system, user) {
  const s = settings.get();
  const p = PROVIDERS[s.provider] || PROVIDERS.groq;
  const model = s.chatModel.trim() || p.chatModel;
  const r = await fetch(p.chatUrl, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + s.key.trim(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      response_format: { type: 'json_object' },
      ...(model === p.chatModel ? p.chatExtra : {}),
    }),
  });
  if (!r.ok) {
    let msg = r.status + '';
    try { const j = await r.json(); msg = j.error?.message || msg; } catch {}
    if (r.status === 401) msg = 'API key 不正确';
    throw new Error(msg);
  }
  const content = (await r.json()).choices?.[0]?.message?.content || '';
  return JSON.parse(content.slice(content.indexOf('{'), content.lastIndexOf('}') + 1));
}

async function tidy(it) {
  if (!settings.get().key || !it.transcript?.trim()) return;
  it.cleanStatus = 'pending'; it.cleanError = '';
  await save(it); render(); refreshDetail(it.id);
  try {
    const out = await chatJSON(`${TIDY_PROMPT}\n分类（名称：说明）：\n${catListText()}`, it.transcript);
    if (typeof out.text !== 'string' || !out.text.trim()) throw new Error('结果格式不对');
    it.clean = out.text.trim();
    it.autoTitle = typeof out.title === 'string' ? out.title.trim().slice(0, 30) : '';
    applyAICat(it, out.category);
    it.cleanStatus = 'done';
  } catch (err) {
    it.cleanStatus = 'error';
    it.cleanError = navigator.onLine === false ? '没有网络' : (err.message || String(err));
  }
  if (!items.includes(it)) return;
  await save(it); render(); refreshDetail(it.id);
}

// Text notes skip transcription/tidy, so they only need a category.
async function classify(it) {
  if (!settings.get().key || !cats.length) return;
  try {
    const out = await chatJSON(`${CLASSIFY_PROMPT}\n分类（名称：说明）：\n${catListText()}`, titleOf(it));
    applyAICat(it, out.category);
  } catch { return; }
  if (!items.includes(it)) return;
  await save(it); render(); refreshDetail(it.id);
}

// ---------- sheet (detail + settings) ----------
let audioEl = null, audioUrl = null;

let closeTimer = null;

function openSheet(html) {
  if (closeTimer) finishClose();
  const sheet = $('#sheet'), o = $('#sheet-overlay');
  sheet.innerHTML = '<div class="grab"></div>' + html;
  sheet.style.transition = '';
  sheet.style.transform = '';
  sheet.scrollTop = 0;
  if (o.hidden) lockScroll();
  setDim(1);
  o.hidden = false;
  fitOverlay();
}

// Slide the sheet down and fade the backdrop, then tear down.
function closeSheet() {
  const o = $('#sheet-overlay'), sheet = $('#sheet');
  if (o.hidden || closeTimer) return;
  if (document.activeElement) document.activeElement.blur();
  if (audioEl) audioEl.pause();
  openId = null;
  sheet.style.transition = 'transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)';
  sheet.style.transform = 'translateY(100%)';
  o.classList.remove('dragging');
  setDim(0);
  closeTimer = setTimeout(finishClose, 240);
}

function finishClose() {
  clearTimeout(closeTimer);
  closeTimer = null;
  $('#sheet-overlay').hidden = true;
  $('#sheet').innerHTML = '';
  unlockScroll();
  if (audioEl) { audioEl.pause(); audioEl = null; }
  if (audioUrl) { URL.revokeObjectURL(audioUrl); audioUrl = null; }
}

function setDim(k) {
  $('#sheet-overlay').style.setProperty('--dim', Math.max(0, Math.min(1, k)));
}

// While a sheet is open, pin the page underneath so swipes inside the sheet
// can't scroll the list behind it (iOS ignores overflow:hidden on its own).
let lockedY = 0;
function lockScroll() {
  lockedY = window.scrollY;
  document.documentElement.classList.add('locked');
  document.body.style.top = `-${lockedY}px`;
  // The sticky header would ride up with the pinned body; hold it at the top.
  $('#head').style.transform = `translateY(${lockedY}px)`;
}
function unlockScroll() {
  if (!document.documentElement.classList.contains('locked')) return;
  document.documentElement.classList.remove('locked');
  document.body.style.top = '';
  $('#head').style.transform = '';
  window.scrollTo(0, lockedY);
}

// Keep the sheet above the iOS keyboard: size the overlay to the visible viewport.
function fitOverlay() {
  const vv = window.visualViewport, o = $('#sheet-overlay');
  if (!vv || o.hidden) return;
  o.style.top = vv.offsetTop + 'px';
  o.style.height = vv.height + 'px';
}

// Drag the sheet down to close, like a native iOS sheet: works from anywhere (text boxes
// included, unless you're typing in one) once the content is scrolled to the top.
// A quick flick closes it too.
function enableSwipeClose(sheet) {
  const o = $('#sheet-overlay');
  let t = null;
  sheet.addEventListener('touchstart', e => {
    t = null;
    if (e.touches.length > 1 || closeTimer || e.target.closest('.grip')) return;
    const f = e.target.closest('input, textarea, select');
    if (f && (f.type === 'range' || f === document.activeElement)) return;
    const y = e.touches[0].clientY;
    t = { y0: y, lastY: y, lastT: e.timeStamp, v: 0, dy: 0, dragging: false };
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!t) return;
    const y = e.touches[0].clientY;
    const dt = Math.max(1, e.timeStamp - t.lastT);
    const movingDown = y > t.lastY;
    t.v = 0.7 * ((y - t.lastY) / dt) + 0.3 * t.v;
    t.lastY = y; t.lastT = e.timeStamp;
    if (!t.dragging) {
      if (!(movingDown && sheet.scrollTop <= 0 && e.cancelable)) return;
      t.dragging = true;
      t.y0 = y;
      sheet.style.transition = 'none';
      o.classList.add('dragging');
    }
    e.preventDefault();
    t.dy = Math.max(0, y - t.y0);
    sheet.style.transform = `translateY(${t.dy}px)`;
    setDim(1 - t.dy / sheet.offsetHeight);
  }, { passive: false });
  const end = e => {
    if (!t) return;
    const { dragging, dy, lastT } = t;
    const v = e.timeStamp - lastT > 80 ? 0 : t.v;
    t = null;
    if (!dragging) return;
    if (dy > Math.min(140, sheet.offsetHeight * 0.3) || (v > 0.45 && dy > 16)) return closeSheet();
    o.classList.remove('dragging');
    sheet.style.transition = 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)';
    sheet.style.transform = '';
    setDim(1);
  };
  sheet.addEventListener('touchend', end);
  sheet.addEventListener('touchcancel', end);
}

// Text boxes grow with their content so the sheet is the only thing that scrolls.
function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function transcriptStatusHTML(it) {
  if (it.status === 'pending') return '<p class="status-note">转写中…</p>';
  if (it.status === 'nokey') return '<p class="status-note err">还没设置转写服务。点右上角齿轮，填入 API key。</p>';
  if (it.status === 'error') return `<p class="status-note err">转写失败：${esc(it.error)}</p>`;
  return '';
}

function cleanStatusHTML(it) {
  if (it.status !== 'done') return transcriptStatusHTML(it);
  if (it.cleanStatus === 'pending') return '<p class="status-note">整理中…</p>';
  if (it.cleanStatus === 'error') return `<p class="status-note err">整理失败：${esc(it.cleanError)}</p>`;
  if (!it.clean) return '<p class="status-note">这条还没整理。按右上的"整理"。</p>';
  return '';
}

// Which text the detail sheet shows: AI-cleaned ("clean") or the raw transcript ("orig").
// Once you pick a tab yourself, a finished tidy won't yank you off it.
let detailView = 'clean', detailViewPicked = false;

// Sync the text section (tab, action button, text box, status) with the item.
function renderTextSection(it) {
  const tr = $('#d-transcript');
  if (!tr) return;
  const clean = detailView === 'clean';
  $('#d-view').innerHTML = `<button data-v="clean" class="${clean ? 'on' : ''}">整理后</button><button data-v="orig" class="${clean ? '' : 'on'}">原文</button>`;
  const busy = it.status === 'pending' || (clean && it.cleanStatus === 'pending');
  $('#d-action').innerHTML = `${ICON.refresh}<span>${clean ? (it.clean ? '重新整理' : '整理') : '重新转写'}</span>`;
  $('#d-action').hidden = busy || (clean && it.status !== 'done');
  $('#d-status').innerHTML = clean ? cleanStatusHTML(it) : transcriptStatusHTML(it);
  if (document.activeElement !== tr) {
    tr.value = (clean ? it.clean : it.transcript) || '';
    tr.hidden = clean && !it.clean;
    autoGrow(tr);
  }
  const sparkle = $('#d-sparkle');
  if (sparkle) sparkle.hidden = !!it.title || !it.autoTitle;
}

async function openDetail(id) {
  const it = items.find(i => i.id === id);
  if (!it) return;
  openId = id;
  detailView = it.clean ? 'clean' : 'orig';
  detailViewPicked = false;
  const speeds = [1, 1.5, 2];
  openSheet(`
    <div class="title-row">
      ${it.hasAudio ? `<span class="sparkle" id="d-sparkle" title="AI 起的标题">${ICON.sparkle}</span>` : ''}
      <textarea class="title-input" id="d-title" rows="1" placeholder="${it.hasAudio ? '加标题' : '想法'}">${esc(it.title || it.autoTitle || '')}</textarea>
    </div>
    <div class="sub-row"><span>${fmtDate(it.createdAt)}</span><span>·</span><button class="cat-btn" id="d-cat"></button></div>
    <div class="cat-pick" id="d-catpick" hidden></div>
    ${it.hasAudio ? `
    <div class="player">
      <button class="play-btn" id="d-play" aria-label="播放">${ICON.play}</button>
      <input type="range" id="d-seek" min="0" max="1000" value="0" step="1" aria-label="进度">
      <span class="time" id="d-time">${fmtDur(it.duration)}</span>
      <button class="speed" id="d-speed">1x</button>
    </div>
    <div class="section-label">
      <div class="seg small" id="d-view"></div>
      <button class="text-btn with-icon" id="d-action"></button>
    </div>
    <textarea class="transcript" id="d-transcript"></textarea>
    <div id="d-status"></div>` : ''}
    <div class="sheet-actions">
      <button class="danger-btn" id="d-delete">${ICON.trash}<span>删除</span></button>
      <button class="text-btn" id="d-close">完成</button>
    </div>`);

  const title = $('#d-title');
  autoGrow(title);
  title.addEventListener('input', () => {
    autoGrow(title);
    // A title you type always wins; clearing it falls back to the AI title.
    it.title = title.value.trim() === it.autoTitle ? '' : title.value.trim();
    save(it); render(); renderTextSection(it);
  });
  title.addEventListener('blur', () => { if (!title.value.trim() && it.autoTitle) { title.value = it.autoTitle; autoGrow(title); } });
  title.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); title.blur(); } });
  $('#d-close').onclick = () => closeSheet();
  $('#d-delete').onclick = () => { closeSheet(); deleteItem(id); };
  renderDetailCat(it);
  $('#d-cat').onclick = () => { $('#d-catpick').hidden = !$('#d-catpick').hidden; };
  $('#d-catpick').onclick = e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    it.cat = b.dataset.cat || null;
    it.catManual = true;
    save(it); render(); renderDetailCat(it);
    $('#d-catpick').hidden = true;
  };
  if (!it.hasAudio) { if (!it.title) title.focus(); return; }

  renderTextSection(it);
  $('#d-view').onclick = e => {
    const b = e.target.closest('[data-v]');
    if (!b || b.dataset.v === detailView) return;
    detailView = b.dataset.v;
    detailViewPicked = true;
    $('#d-transcript').blur();
    renderTextSection(it);
  };
  $('#d-action').onclick = () => (detailView === 'clean' ? tidy(it) : transcribe(it));
  const tr = $('#d-transcript');
  tr.addEventListener('input', () => {
    autoGrow(tr);
    if (detailView === 'clean') it.clean = tr.value;
    else { it.transcript = tr.value; if (it.status !== 'done') it.status = 'done'; }
    save(it); render();
  });

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
    seek.style.setProperty('--p', seek.value / 10 + '%');
    time.textContent = fmtDur(audioEl.currentTime);
  };
  audioEl.onplay = () => { playBtn.innerHTML = ICON.pause; playBtn.setAttribute('aria-label', '暂停'); };
  audioEl.onpause = () => { playBtn.innerHTML = ICON.play; playBtn.setAttribute('aria-label', '播放'); };
  audioEl.onended = () => { playBtn.innerHTML = ICON.play; seek.value = 0; seek.style.setProperty('--p', '0%'); time.textContent = fmtDur(it.duration); };
  playBtn.onclick = () => {
    if (!audioEl.paused) return audioEl.pause();
    setAudioSession('playback');
    audioEl.play().catch(() => toast('无法播放'));
  };
  seek.oninput = () => { dragging = true; seek.style.setProperty('--p', seek.value / 10 + '%'); time.textContent = fmtDur((seek.value / 1000) * total()); };
  seek.onchange = () => { audioEl.currentTime = (seek.value / 1000) * total(); dragging = false; };
  $('#d-speed').onclick = e => {
    si = (si + 1) % speeds.length;
    audioEl.playbackRate = speeds[si];
    e.currentTarget.textContent = speeds[si] + 'x';
  };
}

function renderDetailCat(it) {
  const c = catOf(it);
  $('#d-cat').innerHTML = (c ? `<span class="dot" style="background:${c.color}"></span>${esc(c.name)}` : '未分类') + ICON.chevronDown;
  $('#d-catpick').innerHTML = cats.map(x =>
    `<button class="chip${x.id === it.cat ? ' on' : ''}" data-cat="${x.id}"><span class="dot" style="background:${x.color}"></span>${esc(x.name)}</button>`
  ).join('') + `<button class="chip${c ? '' : ' on'}" data-cat="">不分类</button>`;
}

function refreshDetail(id) {
  if (openId !== id) return;
  const it = items.find(i => i.id === id);
  if (!it || !$('#d-transcript')) return;
  // A fresh cleaned version arrived: switch to it.
  if (it.cleanStatus === 'done' && it.clean && detailView === 'orig' && !detailViewPicked && document.activeElement !== $('#d-transcript')) detailView = 'clean';
  const title = $('#d-title');
  if (document.activeElement !== title && !it.title) { title.value = it.autoTitle || ''; autoGrow(title); }
  renderDetailCat(it);
  renderTextSection(it);
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
    <div class="sheet-head"><h2>设置</h2><button class="icon-btn" id="s-close" aria-label="关闭">${ICON.x}</button></div>
    <p class="sec-title">分类</p>
    <ul class="list cat-list" id="s-cats"></ul>
    <div class="cat-actions">
      <button class="text-btn with-icon" id="s-cat-add">${ICON.plus}<span>新增分类</span></button>
      <button class="text-btn quiet" id="s-cat-reset">恢复默认</button>
    </div>
    <p class="sec-title">转写和整理</p>
    <div class="field"><label>转写服务</label><div class="seg" id="s-prov">${provHTML(s.provider)}</div>
      <p class="hint" id="s-hint">${hintHTML(s.provider)}</p></div>
    <div class="field"><label>说话语言</label><div class="seg" id="s-lang">${langHTML(s.lang)}</div>
      <p class="hint">中文夹英文选普通话，英文单词会保留。</p></div>
    <div class="field"><label for="s-key">API key</label>
      <input id="s-key" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="gsk_…" value="${esc(s.key)}">
      <p class="hint">只保存在这台手机的浏览器里。</p></div>
    <details class="adv"><summary>进阶</summary>
      <div class="field"><label for="s-model">转写模型（留空用默认）</label><input id="s-model" placeholder="${esc(PROVIDERS[s.provider].model)}" value="${esc(s.model)}"></div>
      <div class="field"><label for="s-chat">整理模型（留空用默认）</label><input id="s-chat" placeholder="${esc(PROVIDERS[s.provider].chatModel)}" value="${esc(s.chatModel)}"></div>
      <div class="field"><label for="s-prompt">提示句（帮助识别中英混说和专有名词）</label><textarea id="s-prompt" placeholder="${esc(DEFAULT_PROMPT)}">${esc(s.prompt)}</textarea></div>
    </details>
    <button class="primary-btn" id="s-save">保存</button>
    <p class="version">版本 v${esc(loadedVersion || '')}</p>`);
  let provider = s.provider;
  $('#s-prov').onclick = e => {
    const b = e.target.closest('[data-p]');
    if (!b) return;
    provider = b.dataset.p;
    $('#s-prov').innerHTML = provHTML(provider);
    $('#s-hint').innerHTML = hintHTML(provider);
    $('#s-model').placeholder = PROVIDERS[provider].model;
    $('#s-chat').placeholder = PROVIDERS[provider].chatModel;
    $('#s-key').placeholder = provider === 'groq' ? 'gsk_…' : 'sk-…';
  };
  let lang = s.lang;
  $('#s-lang').onclick = e => {
    const b = e.target.closest('[data-l]');
    if (!b) return;
    lang = b.dataset.l;
    $('#s-lang').innerHTML = langHTML(lang);
  };
  setupCatEditor();
  $('#s-close').onclick = () => closeSheet();
  $('#s-save').onclick = () => {
    settings.set({ provider, lang, key: $('#s-key').value.trim(), model: $('#s-model').value.trim(), chatModel: $('#s-chat').value.trim(), prompt: $('#s-prompt').value.trim() });
    closeSheet();
    toast('已保存');
    // Retry memos that were waiting for a key.
    items.filter(i => i.status === 'nokey').forEach(transcribe);
  };
}

// ---------- category editor (in settings) ----------
// Edits save immediately; the 保存 button only covers the transcription fields.
let openCatId = null;

function catRowHTML(c) {
  const open = c.id === openCatId;
  return `<li class="row-wrap" data-id="${c.id}">
    <div class="swipe-bg"><button class="swipe-del" tabindex="-1">${ICON.trash}<span>删除</span></button></div>
    <div class="row cat-row${open ? ' open' : ''}">
      <span class="dot big" style="background:${c.color}"></span>
      ${open ? `<input class="cat-name" value="${esc(c.name)}" maxlength="12" enterkeyhint="done">` : `<span class="cat-label">${esc(c.name)}</span>`}
      <span class="grip" aria-label="拖动排序">${ICON.grip}</span>
      ${open ? `<label class="cat-hint-wrap"><span>给 AI 的说明（选填）</span>
        <textarea class="cat-hint" rows="1" placeholder="这个分类放什么，例如：黄金、下单、复盘" enterkeyhint="done">${esc(c.hint || '')}</textarea></label>` : ''}
      ${open ? `<div class="swatches">${PALETTE.map(col =>
        `<button class="swatch${col === c.color ? ' on' : ''}" data-color="${col}" style="background:${col}" aria-label="颜色"></button>`).join('')}</div>` : ''}
    </div>
  </li>`;
}

function renderCatList() {
  const ul = $('#s-cats');
  if (!ul) return;
  ul.innerHTML = cats.map(catRowHTML).join('');
  ul.querySelectorAll('.cat-hint').forEach(autoGrow);
}

function catsChanged() { saveCats(); render(); }

async function deleteCat(id) {
  const idx = cats.findIndex(c => c.id === id);
  if (idx < 0) return;
  const cat = cats[idx];
  const moved = items.filter(i => i.cat === id);
  cats.splice(idx, 1);
  moved.forEach(i => { i.cat = null; save(i); });
  catsChanged(); renderCatList();
  toast(`已删除「${cat.name}」`, {
    label: '撤销',
    run: () => {
      cats.splice(idx, 0, cat);
      moved.forEach(i => { i.cat = id; save(i); });
      catsChanged(); renderCatList();
    },
  });
}

function setupCatEditor() {
  openCatId = null;
  renderCatList();
  const ul = $('#s-cats');
  enableSwipe(ul, deleteCat);

  ul.addEventListener('click', e => {
    const li = e.target.closest('[data-id]');
    if (!li || e.target.closest('.swipe-bg') || li.querySelector('.row').dataset.swiped) return;
    const c = cats.find(x => x.id === li.dataset.id);
    const sw = e.target.closest('[data-color]');
    if (sw) {
      c.color = sw.dataset.color;
      li.querySelector('.dot').style.background = c.color;
      li.querySelectorAll('.swatch').forEach(b => b.classList.toggle('on', b === sw));
      catsChanged();
      return;
    }
    if (e.target.closest('input, textarea, label, .grip, .swatches')) return;
    openCatId = openCatId === c.id ? null : c.id;
    renderCatList();
  });
  ul.addEventListener('input', e => {
    const c = cats.find(x => x.id === e.target.closest('[data-id]')?.dataset.id);
    if (!c) return;
    if (e.target.matches('.cat-name') && e.target.value.trim()) { c.name = e.target.value.trim(); catsChanged(); }
    if (e.target.matches('.cat-hint')) { autoGrow(e.target); c.hint = e.target.value.replace(/\s*\n\s*/g, ' ').trim(); saveCats(); }
  });
  ul.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.matches('.cat-name, .cat-hint')) { e.preventDefault(); e.target.blur(); }
  });
  ul.addEventListener('focusout', e => {
    if (!e.target.matches('.cat-name')) return;
    const c = cats.find(x => x.id === e.target.closest('[data-id]').dataset.id);
    if (c && !e.target.value.trim()) e.target.value = c.name;
  });

  // Drag the grip to reorder.
  ul.addEventListener('pointerdown', e => {
    const grip = e.target.closest('.grip');
    if (!grip) return;
    e.preventDefault();
    const li = grip.closest('.row-wrap');
    const pid = e.pointerId;
    li.classList.add('lifted');
    const move = ev => {
      if (ev.pointerId !== pid) return;
      const after = [...ul.children].filter(x => x !== li)
        .find(x => { const r = x.getBoundingClientRect(); return ev.clientY < r.top + r.height / 2; });
      if (after) { if (li.nextElementSibling !== after) ul.insertBefore(li, after); }
      else if (ul.lastElementChild !== li) ul.appendChild(li);
    };
    const up = ev => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      li.classList.remove('lifted');
      cats = [...ul.children].map(x => cats.find(c => c.id === x.dataset.id));
      catsChanged();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  });

  $('#s-cat-add').onclick = () => {
    const used = new Set(cats.map(c => c.color));
    const c = { id: uid(), name: '新分类', color: PALETTE.find(x => !used.has(x)) || PALETTE[0] };
    cats.push(c);
    openCatId = c.id;
    catsChanged(); renderCatList();
    const input = $(`#s-cats [data-id="${c.id}"] .cat-name`);
    input.focus(); input.select();
  };
  $('#s-cat-reset').onclick = () => {
    const before = cats, beforeCats = new Map(items.map(i => [i, i.cat]));
    cats = DEFAULT_CATS.map(c => ({ ...c }));
    items.forEach(i => { if (i.cat && !cats.some(c => c.id === i.cat)) { i.cat = null; save(i); } });
    openCatId = null;
    catsChanged(); renderCatList();
    toast('已恢复默认分类', {
      label: '撤销',
      run: () => {
        cats = before;
        items.forEach(i => { if (beforeCats.has(i) && i.cat !== beforeCats.get(i)) { i.cat = beforeCats.get(i); save(i); } });
        catsChanged(); renderCatList();
      },
    });
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
  enableSwipe($('#list'), deleteItem);
  enableSwipe($('#done-list'), deleteItem);
  $('#chips').onclick = e => {
    const b = e.target.closest('[data-cat]');
    if (!b || b.dataset.cat === currentCat) return;
    currentCat = b.dataset.cat;
    try { localStorage.setItem('currentCat', currentCat); } catch {}
    render();
    $(`#chips [data-cat="${currentCat}"]`).scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  };
  $('#update').onclick = () => location.reload();
  enableSwipeClose($('#sheet'));
  window.visualViewport?.addEventListener('resize', fitOverlay);
  window.visualViewport?.addEventListener('scroll', fitOverlay);
  // iOS only shows :active pressed states when the page has a touch listener.
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && checkUpdate());
  checkUpdate();
  $('#done-toggle').onclick = () => { showDone = !showDone; render(); };
  $('#sheet-overlay').onclick = e => { if (e.target.id === 'sheet-overlay') closeSheet(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#sheet-overlay').hidden) closeSheet(); });

  items = await DB.allItems();
  render();
  // Memos left "pending" were interrupted (app closed mid-request): try again.
  items.filter(i => i.status === 'pending').forEach(transcribe);
  items.filter(i => i.status === 'done' && i.cleanStatus === 'pending').forEach(tidy);

  if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
init();
