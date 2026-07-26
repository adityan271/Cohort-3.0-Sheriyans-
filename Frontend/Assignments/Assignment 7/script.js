(() => {
  "use strict";

  /* ---------- State ---------- */
  let tasks = [
    { id: cryptoId(), text: "Sketch the new onboarding flow", prio: "high", due: todayPlus(0), done: false },
    { id: cryptoId(), text: "Reply to Priya about the budget doc", prio: "medium", due: todayPlus(1), done: false },
    { id: cryptoId(), text: "Water the office plants", prio: "low", due: todayPlus(-1), done: true },
  ];

  let activeFilter = "all";
  let selectedPrio = "medium";

  /* ---------- DOM refs ---------- */
  const pile = document.getElementById("pile");
  const composeForm = document.getElementById("composeForm");
  const taskInput = document.getElementById("taskInput");
  const dueInput = document.getElementById("dueInput");
  const prioGroup = document.getElementById("prioGroup");
  const tabsNav = document.getElementById("tabs");
  const cardTemplate = document.getElementById("cardTemplate");
  const toastEl = document.getElementById("toast");
  const dateLine = document.getElementById("dateLine");

  /* ---------- Helpers ---------- */
  function cryptoId() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function todayPlus(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function isOverdue(task) {
    if (task.done || !task.due) return false;
    return task.due < todayPlus(0);
  }

  function formatDue(dueStr) {
    if (!dueStr) return "";
    const due = new Date(dueStr + "T00:00:00");
    const today = new Date(todayPlus(0) + "T00:00:00");
    const diffDays = Math.round((due - today) / 86400000);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 1 && diffDays < 7) return due.toLocaleDateString(undefined, { weekday: "short" });
    return due.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove("is-visible"), 1800);
  }

  function setDateLine() {
    const now = new Date();
    dateLine.textContent = now.toLocaleDateString(undefined, {
      weekday: "long", month: "long", day: "numeric"
    });
  }

  /* ---------- Priority chip selection ---------- */
  prioGroup.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip--prio");
    if (!btn) return;
    prioGroup.querySelectorAll(".chip--prio").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    selectedPrio = btn.dataset.prio;
  });

  /* ---------- Tabs ---------- */
  tabsNav.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    tabsNav.querySelectorAll(".tab").forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    activeFilter = tab.dataset.filter;
    render();
  });

  /* ---------- Compose ---------- */
  composeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) {
      taskInput.focus();
      return;
    }
    tasks.unshift({
      id: cryptoId(),
      text,
      prio: selectedPrio,
      due: dueInput.value || null,
      done: false
    });
    taskInput.value = "";
    dueInput.value = "";
    taskInput.focus();
    showToast("Pinned to the board");
    render();
  });

  /* ---------- Filtering ---------- */
  function getFiltered() {
    switch (activeFilter) {
      case "active": return tasks.filter(t => !t.done);
      case "done": return tasks.filter(t => t.done);
      case "high": return tasks.filter(t => t.prio === "high" && !t.done);
      case "overdue": return tasks.filter(isOverdue);
      default: return tasks;
    }
  }

  function updateCounts() {
    const open = tasks.filter(t => !t.done).length;
    const done = tasks.filter(t => t.done).length;
    document.getElementById("statOpen").textContent = open;
    document.getElementById("statDone").textContent = done;

    document.getElementById("cAll").textContent = tasks.length;
    document.getElementById("cActive").textContent = open;
    document.getElementById("cDone").textContent = done;
    document.getElementById("cHigh").textContent = tasks.filter(t => t.prio === "high" && !t.done).length;
    document.getElementById("cOverdue").textContent = tasks.filter(isOverdue).length;
  }

  /* ---------- Render ---------- */
  function render() {
    updateCounts();
    const list = getFiltered();
    pile.innerHTML = "";

    if (list.length === 0) {
      pile.appendChild(buildEmptyState());
      return;
    }

    // sort: overdue/high first within active filter context, done last unless filter is "done"
    const sorted = [...list].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.prio] - order[b.prio];
    });

    sorted.forEach((task, i) => {
      const card = buildCard(task);
      card.style.animationDelay = `${Math.min(i * 35, 300)}ms`;
      pile.appendChild(card);
    });
  }

  function buildEmptyState() {
    const wrap = document.createElement("div");
    wrap.className = "empty";

    const messages = {
      all: ["Nothing pinned yet", "Add your first task above and it'll land here."],
      active: ["The board is clear", "Every task is done — nice work."],
      done: ["No completions yet", "Mark a task's pinhole to file it here."],
      high: ["No high priority fires", "Nothing urgent waiting on you right now."],
      overdue: ["Nothing overdue", "You're caught up — stay that way."]
    };
    const [title, sub] = messages[activeFilter] || messages.all;

    wrap.innerHTML = `<div class="empty__glyph">${title}</div><p class="empty__sub">${sub}</p>`;
    return wrap;
  }

  function buildCard(task) {
    const node = cardTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id;
    if (task.done) node.classList.add("is-done");

    node.querySelector(".card__text").textContent = task.text;

    const prioEl = node.querySelector(".card__prio");
    prioEl.textContent = task.prio;
    prioEl.classList.add(`card__prio--${task.prio}`);

    const dueEl = node.querySelector(".card__due");
    if (task.due) {
      dueEl.textContent = formatDue(task.due);
      if (isOverdue(task)) dueEl.classList.add("is-overdue");
    } else {
      dueEl.textContent = "No due date";
    }

    node.querySelector(".card__pinhole").addEventListener("click", () => toggleDone(task.id));
    node.querySelector(".card__delete").addEventListener("click", () => removeTask(task.id, node));

    return node;
  }

  function toggleDone(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.done = !task.done;
    showToast(task.done ? "Filed as done" : "Back on the board");
    render();
  }

  function removeTask(id, node) {
    node.classList.add("is-removing");
    showToast("Task removed");
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      render();
    }, 220);
  }

  /* ---------- Init ---------- */
  setDateLine();
  render();
})();