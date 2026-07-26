'use strict';

const STORAGE = {
    theme: 'flow.theme',
    todos: 'flow.todos',
    planner: 'flow.planner',
    goals: 'flow.goals',
    pomodoroSessions: 'flow.pomodoroSessions',
};

/* ---------------------------------------------------------------------- */
/* UTILITIES                                                                */
/* ---------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function loadJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}
function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* ---------------------------------------------------------------------- */
/* TOAST NOTIFICATIONS                                                      */
/* ---------------------------------------------------------------------- */
function showToast(message, type = 'success') {
    const container = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 2600);
}

/* ---------------------------------------------------------------------- */
/* CONFIRM MODAL (promise-based)                                           */
/* ---------------------------------------------------------------------- */
function confirmAction(message) {
    return new Promise((resolve) => {
        const overlay = $('#confirm-modal');
        $('#confirm-message').textContent = message;
        overlay.classList.remove('hidden');

        const cleanup = (result) => {
            overlay.classList.add('hidden');
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            resolve(result);
        };
        const okBtn = $('#confirm-ok');
        const cancelBtn = $('#confirm-cancel');
        const onOk = () => cleanup(true);
        const onCancel = () => cleanup(false);
        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
    });
}

/* ---------------------------------------------------------------------- */
/* RIPPLE EFFECT ON BUTTONS                                                 */
/* ---------------------------------------------------------------------- */
function attachRipple(el) {
    el.addEventListener('click', (e) => {
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        el.style.position = el.style.position || 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
}
function initRipples() {
    $$('.btn, .icon-btn, .fab, .feature-card, .length-btn, .filter-btn').forEach(attachRipple);
}

/* ---------------------------------------------------------------------- */
/* VIEW NAVIGATION                                                          */
/* ---------------------------------------------------------------------- */
function goToView(id) {
    $$('.view').forEach((v) => v.classList.remove('view-active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('view-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeDrawer();

    // Lazy-refresh certain features when opened
    if (id === 'quotes' && !$('#quote-text').textContent) fetchQuote();
    if (id === 'weather' && $('#weather-content').classList.contains('hidden') && !weatherLoaded) loadWeather();
    if (id === 'planner') renderPlanner();
}

function initNavigation() {
    $$('.feature-card').forEach((card) => {
        card.addEventListener('click', () => goToView(card.dataset.target));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToView(card.dataset.target);
            }
        });
    });
    $$('[data-back]').forEach((btn) => btn.addEventListener('click', () => goToView('dashboard')));
    $$('#mobile-drawer li').forEach((li) => li.addEventListener('click', () => goToView(li.dataset.target)));
}

/* ---------------------------------------------------------------------- */
/* MOBILE HAMBURGER DRAWER                                                  */
/* ---------------------------------------------------------------------- */
function closeDrawer() {
    $('#mobile-drawer').classList.remove('open');
}
function initDrawer() {
    $('#hamburger').addEventListener('click', () => $('#mobile-drawer').classList.toggle('open'));
    document.addEventListener('click', (e) => {
        const drawer = $('#mobile-drawer');
        if (drawer.classList.contains('open') && !drawer.contains(e.target) && e.target.id !== 'hamburger') {
            closeDrawer();
        }
    });
}

/* ---------------------------------------------------------------------- */
/* THEME SWITCH                                                             */
/* ---------------------------------------------------------------------- */
function initTheme() {
    const saved = localStorage.getItem(STORAGE.theme) || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const toggle = $('#theme-toggle');
    toggle.checked = saved === 'light';
    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE.theme, theme);
    });
}

/* ---------------------------------------------------------------------- */
/* LIVE DATE & TIME + DYNAMIC BACKGROUND                                    */
/* ---------------------------------------------------------------------- */
function updateClock() {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $('#live-day').textContent = dayNames[now.getDay()];
    $('#live-date').textContent = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    $('#live-time').textContent = `${String(hours).padStart(2, '0')}:${mins}:${secs} ${ampm}`;

    applyTimeOfDay(now.getHours());
}

function applyTimeOfDay(hour) {
    let period = 'night';
    if (hour >= 5 && hour < 12) period = 'morning';
    else if (hour >= 12 && hour < 17) period = 'afternoon';
    else if (hour >= 17 && hour < 20) period = 'evening';
    if (document.body.dataset.time !== period) document.body.dataset.time = period;
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

/* ---------------------------------------------------------------------- */
/* KEYBOARD SHORTCUTS                                                       */
/* ---------------------------------------------------------------------- */
function initShortcuts() {
    document.addEventListener('keydown', (e) => {
        const tag = document.activeElement.tagName;
        const typing = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable;

        if (e.key === 'Escape') {
            goToView('dashboard');
            return;
        }
        if (typing) return;

        if (e.key.toLowerCase() === 'n') {
            const activeView = $('.view-active').id;
            if (activeView === 'todo') { e.preventDefault(); $('#todo-input').focus(); }
            else if (activeView === 'dashboard') { e.preventDefault(); goToView('todo'); setTimeout(() => $('#todo-input').focus(), 200); }
        }
        if (e.key === '/') {
            if ($('.view-active').id === 'todo') { e.preventDefault(); $('#todo-search').focus(); }
        }
    });
}

/* ==========================================================================
   FEATURE 1 — TODO LIST
   ========================================================================== */
let todos = loadJSON(STORAGE.todos, []);
let todoFilter = 'all';
let todoSearchTerm = '';

function saveTodos() {
    saveJSON(STORAGE.todos, todos);
    updateStats();
}

function renderTodos() {
    const list = $('#todo-list');
    let visible = todos.filter((t) => {
        if (todoFilter === 'pending' && t.completed) return false;
        if (todoFilter === 'completed' && !t.completed) return false;
        if (todoFilter === 'important' && !t.important) return false;
        if (todoSearchTerm && !t.text.toLowerCase().includes(todoSearchTerm.toLowerCase())) return false;
        return true;
    });

    list.innerHTML = '';
    $('#todo-empty').classList.toggle('hidden', visible.length !== 0);

    visible.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        li.innerHTML = `
      <button class="todo-check ${todo.completed ? 'checked' : ''}" title="Mark complete">${todo.completed ? '✓' : ''}</button>
      <span class="todo-text" data-id="${todo.id}">${escapeHTML(todo.text)}</span>
      <div class="todo-actions">
        <button class="todo-star ${todo.important ? 'active' : ''}" title="Mark important">★</button>
        <button class="todo-edit" title="Edit">✎</button>
        <button class="todo-delete" title="Delete">🗑</button>
      </div>
    `;
        list.appendChild(li);
    });
}

function addTodo(text) {
    todos.unshift({ id: uid(), text, completed: false, important: false, createdAt: Date.now() });
    saveTodos();
    renderTodos();
    showToast('Task added', 'success');
}

async function deleteTodo(id) {
    const ok = await confirmAction('Delete this task? This cannot be undone.');
    if (!ok) return;
    const el = $(`.todo-item[data-id="${id}"]`);
    if (el) {
        el.classList.add('removing');
        await new Promise((r) => setTimeout(r, 180));
    }
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
    showToast('Task deleted', 'error');
}

function toggleComplete(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
}

function toggleImportant(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) todo.important = !todo.important;
    saveTodos();
    renderTodos();
}

function editTodo(id, spanEl) {
    spanEl.contentEditable = 'true';
    spanEl.focus();
    document.execCommand('selectAll', false, null);

    const commit = () => {
        spanEl.contentEditable = 'false';
        const newText = spanEl.textContent.trim();
        const todo = todos.find((t) => t.id === id);
        if (todo && newText) {
            todo.text = newText;
            saveTodos();
            showToast('Task updated', 'success');
        }
        renderTodos();
    };
    spanEl.addEventListener('blur', commit, { once: true });
    spanEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); spanEl.blur(); }
    });
}

function initTodo() {
    $('#todo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = $('#todo-input');
        const text = input.value.trim();
        if (!text) return;
        addTodo(text);
        input.value = '';
    });

    $('#todo-search').addEventListener('input', (e) => {
        todoSearchTerm = e.target.value;
        renderTodos();
    });

    $('#todo-filters').addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        $$('.filter-btn', $('#todo-filters')).forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        todoFilter = btn.dataset.filter;
        renderTodos();
    });

    $('#todo-list').addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;
        const id = item.dataset.id;
        if (e.target.closest('.todo-check')) toggleComplete(id);
        else if (e.target.closest('.todo-star')) toggleImportant(id);
        else if (e.target.closest('.todo-delete')) deleteTodo(id);
        else if (e.target.closest('.todo-edit')) editTodo(id, $(`.todo-text[data-id="${id}"]`));
    });

    renderTodos();
}

/* ==========================================================================
   FEATURE 2 — DAILY PLANNER
   ========================================================================== */
function renderPlanner() {
    const data = loadJSON(STORAGE.planner, {});
    const container = $('#planner-list');
    container.innerHTML = '';
    const now = new Date();

    for (let hour = 6; hour <= 23; hour++) {
        const label = hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
        const row = document.createElement('div');
        row.className = `planner-row ${now.getHours() === hour ? 'current-hour' : ''}`;
        row.innerHTML = `
      <div class="planner-hour">${label}</div>
      <textarea data-hour="${hour}" placeholder="What's happening at ${label}?">${escapeHTML(data[hour] || '')}</textarea>
    `;
        container.appendChild(row);
    }

    container.removeEventListener('input', plannerInputHandler);
    container.addEventListener('input', plannerInputHandler);
}

let plannerSaveTimeout = null;
function plannerInputHandler(e) {
    const textarea = e.target.closest('textarea');
    if (!textarea) return;
    $('#planner-autosave').textContent = 'Saving…';
    clearTimeout(plannerSaveTimeout);
    plannerSaveTimeout = setTimeout(() => {
        const data = loadJSON(STORAGE.planner, {});
        data[textarea.dataset.hour] = textarea.value;
        saveJSON(STORAGE.planner, data);
        $('#planner-autosave').textContent = 'All changes saved';
    }, 500);
}

/* ==========================================================================
   FEATURE 3 — DAILY GOALS
   ========================================================================== */
let goals = loadJSON(STORAGE.goals, []);

function saveGoals() {
    saveJSON(STORAGE.goals, goals);
    updateStats();
}

function renderGoals() {
    const list = $('#goal-list');
    list.innerHTML = '';
    $('#goal-empty').classList.toggle('hidden', goals.length !== 0);

    goals.forEach((goal) => {
        const li = document.createElement('li');
        li.className = `todo-item ${goal.completed ? 'completed' : ''}`;
        li.dataset.id = goal.id;
        li.innerHTML = `
      <button class="todo-check ${goal.completed ? 'checked' : ''}" title="Mark complete">${goal.completed ? '✓' : ''}</button>
      <span class="todo-text">${escapeHTML(goal.text)}</span>
      <div class="todo-actions">
        <button class="todo-delete" title="Delete">🗑</button>
      </div>
    `;
        list.appendChild(li);
    });

    const completedCount = goals.filter((g) => g.completed).length;
    $('#goal-count').textContent = `${completedCount} / ${goals.length}`;
    const pct = goals.length ? (completedCount / goals.length) * 100 : 0;
    $('#goal-progress-fill').style.width = `${pct}%`;

    if (goals.length > 0 && completedCount === goals.length) {
        launchConfetti();
    }
    updateStats();
}

async function deleteGoal(id) {
    const ok = await confirmAction('Delete this goal?');
    if (!ok) return;
    goals = goals.filter((g) => g.id !== id);
    saveGoals();
    renderGoals();
    showToast('Goal deleted', 'error');
}

function initGoals() {
    $('#goal-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = $('#goal-input');
        const text = input.value.trim();
        if (!text) return;
        goals.push({ id: uid(), text, completed: false });
        saveGoals();
        renderGoals();
        input.value = '';
        showToast('Goal added', 'success');
    });

    $('#goal-list').addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;
        const id = item.dataset.id;
        if (e.target.closest('.todo-check')) {
            const goal = goals.find((g) => g.id === id);
            if (goal) goal.completed = !goal.completed;
            saveGoals();
            renderGoals();
        } else if (e.target.closest('.todo-delete')) {
            deleteGoal(id);
        }
    });

    renderGoals();
}

/* ==========================================================================
   FEATURE 4 — MOTIVATION QUOTES
   ========================================================================== */
const FALLBACK_QUOTES = [
    { content: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
    { content: 'Well done is better than well said.', author: 'Benjamin Franklin' },
    { content: 'Small steps every day.', author: 'Unknown' },
];

async function fetchQuote() {
    const textEl = $('#quote-text');
    const authorEl = $('#quote-author');
    const loadingEl = $('#quote-loading');
    const errorEl = $('#quote-error');

    errorEl.classList.add('hidden');
    loadingEl.classList.remove('hidden');
    textEl.classList.add('fade');
    authorEl.classList.add('fade');

    try {
        const res = await fetch('https://api.quotable.io/random');
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        setTimeout(() => {
            textEl.textContent = `“${data.content}”`;
            authorEl.textContent = `— ${data.author}`;
            loadingEl.classList.add('hidden');
            textEl.classList.remove('fade');
            authorEl.classList.remove('fade');
        }, 250);
    } catch (err) {
        const fallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        setTimeout(() => {
            textEl.textContent = `“${fallback.content}”`;
            authorEl.textContent = `— ${fallback.author}`;
            loadingEl.classList.add('hidden');
            textEl.classList.remove('fade');
            authorEl.classList.remove('fade');
            errorEl.classList.remove('hidden');
        }, 250);
    }
}

function initQuotes() {
    $('#quote-next').addEventListener('click', fetchQuote);
}

/* ==========================================================================
   FEATURE 5 — POMODORO TIMER
   ========================================================================== */
const RING_CIRCUMFERENCE = 2 * Math.PI * 90;
let pomodoroDuration = 25 * 60;
let pomodoroRemaining = pomodoroDuration;
let pomodoroInterval = null;
let pomodoroRunning = false;

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updatePomodoroDisplay() {
    $('#pomodoro-display').textContent = formatTime(pomodoroRemaining);
    const ratio = pomodoroRemaining / pomodoroDuration;
    const offset = RING_CIRCUMFERENCE * (1 - ratio);
    $('#ring-progress').style.strokeDashoffset = offset;
}

function startPomodoro() {
    if (pomodoroRunning) return; // prevent multiple intervals
    pomodoroRunning = true;
    $('#pomodoro-start').disabled = true;
    $('#pomodoro-pause').disabled = false;

    pomodoroInterval = setInterval(() => {
        pomodoroRemaining--;
        updatePomodoroDisplay();
        if (pomodoroRemaining <= 0) {
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
            $('#pomodoro-start').disabled = false;
            $('#pomodoro-pause').disabled = true;
            onPomodoroComplete();
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    $('#pomodoro-start').disabled = false;
    $('#pomodoro-pause').disabled = true;
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    pomodoroRemaining = pomodoroDuration;
    $('#pomodoro-start').disabled = false;
    $('#pomodoro-pause').disabled = true;
    updatePomodoroDisplay();
}

function onPomodoroComplete() {
    playBeep();
    const sessions = loadJSON(STORAGE.pomodoroSessions, 0) + 1;
    saveJSON(STORAGE.pomodoroSessions, sessions);
    updateStats();

    if (Notification && Notification.permission === 'granted') {
        new Notification('Flow', { body: 'Session complete — take a breather.' });
    } else {
        showToast('Focus session complete! 🎉', 'success');
    }
}

function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
        osc.start();
        osc.stop(ctx.currentTime + 0.9);
    } catch { /* audio unsupported, ignore */ }
}

function initPomodoro() {
    if (window.Notification && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    $('#pomodoro-start').addEventListener('click', startPomodoro);
    $('#pomodoro-pause').addEventListener('click', pausePomodoro);
    $('#pomodoro-reset').addEventListener('click', resetPomodoro);

    $$('.length-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            $$('.length-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            pomodoroDuration = Number(btn.dataset.mins) * 60;
            resetPomodoro();
        });
    });

    updatePomodoroDisplay();
}

/* ==========================================================================
   FEATURE 6 — WEATHER WIDGET
   ========================================================================== */
let weatherLoaded = false;
const DEFAULT_CITY = { name: 'New Delhi', lat: 28.6139, lon: 77.209 };

const WEATHER_ICONS = {
    0: '☀', 1: '🌤', 2: '⛅', 3: '☁', 45: '🌫', 48: '🌫',
    51: '🌦', 61: '🌧', 63: '🌧', 65: '🌧', 71: '🌨', 73: '🌨', 75: '❄',
    80: '🌦', 81: '🌧', 82: '🌧', 95: '⛈', 96: '⛈', 99: '⛈',
};

async function loadWeather() {
    const loadingEl = $('#weather-loading');
    const contentEl = $('#weather-content');
    const errorEl = $('#weather-error');
    loadingEl.classList.remove('hidden');
    contentEl.classList.add('hidden');
    errorEl.classList.add('hidden');

    const finish = async (lat, lon, cityName) => {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Weather fetch failed');
            const data = await res.json();
            const cur = data.current;

            $('#weather-city').textContent = cityName;
            $('#weather-temp').textContent = `${Math.round(cur.temperature_2m)}°C`;
            $('#weather-feels').textContent = `${Math.round(cur.apparent_temperature)}°C`;
            $('#weather-humidity').textContent = `${cur.relative_humidity_2m}%`;
            $('#weather-wind').textContent = `${Math.round(cur.wind_speed_10m)} km/h`;
            $('#weather-icon').textContent = WEATHER_ICONS[cur.weather_code] || '🌡';

            loadingEl.classList.add('hidden');
            contentEl.classList.remove('hidden');
            weatherLoaded = true;
        } catch (err) {
            loadingEl.classList.add('hidden');
            errorEl.classList.remove('hidden');
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => finish(pos.coords.latitude, pos.coords.longitude, 'Your location'),
            () => finish(DEFAULT_CITY.lat, DEFAULT_CITY.lon, DEFAULT_CITY.name),
            { timeout: 6000 }
        );
    } else {
        finish(DEFAULT_CITY.lat, DEFAULT_CITY.lon, DEFAULT_CITY.name);
    }
}

/* ==========================================================================
   STATS ROW (dashboard summary)
   ========================================================================== */
function updateStats() {
    const open = todos.filter((t) => !t.completed).length;
    const done = todos.filter((t) => t.completed).length;
    const goalDone = goals.filter((g) => g.completed).length;
    const sessions = loadJSON(STORAGE.pomodoroSessions, 0);

    $('#stat-tasks-open').textContent = open;
    $('#stat-tasks-done').textContent = done;
    $('#stat-goals').textContent = `${goalDone}/${goals.length}`;
    $('#stat-streak').textContent = sessions;
}

/* ==========================================================================
   CONFETTI ANIMATION (canvas)
   ========================================================================== */
function launchConfetti() {
    const canvas = $('#confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#7C6CF6', '#45D9C8', '#FF7A6B', '#FFB86B'];
    const pieces = Array.from({ length: 140 }, () => ({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.4,
        size: 5 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: 2 + Math.random() * 3,
        speedX: -1.5 + Math.random() * 3,
        rotation: Math.random() * 360,
        rotationSpeed: -6 + Math.random() * 12,
    }));

    let frame = 0;
    const maxFrames = 220;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach((p) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
        });
        frame++;
        if (frame < maxFrames) {
            requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    draw();
}

/* ==========================================================================
   FLOATING ACTION BUTTON
   ========================================================================== */
function initFab() {
    $('#fab').addEventListener('click', () => {
        goToView('todo');
        setTimeout(() => $('#todo-input').focus(), 220);
    });
}

/* ==========================================================================
   BOOTSTRAP
   ========================================================================== */
function initLoadingScreen() {
    window.addEventListener('load', () => {
        setTimeout(() => $('#loading-screen').classList.add('loaded'), 500);
    });
    // Fallback in case 'load' already fired
    setTimeout(() => $('#loading-screen').classList.add('loaded'), 1800);
}

function init() {
    initLoadingScreen();
    initTheme();
    initClock();
    initNavigation();
    initDrawer();
    initShortcuts();
    initTodo();
    initGoals();
    initQuotes();
    initPomodoro();
    initFab();
    initRipples();
    updateStats();
}

document.addEventListener('DOMContentLoaded', init);