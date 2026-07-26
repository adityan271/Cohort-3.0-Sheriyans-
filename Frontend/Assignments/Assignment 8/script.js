
(function () {
    // ---- constants ----
    const RATES = { USD: 1, EUR: 0.92, GBP: 0.78, INR: 83.5, JPY: 156 };
    const SYMS = { USD: "$", EUR: "€", GBP: "£", INR: "₹", JPY: "¥" };
    const LAST_USER_KEY = "fintrack:lastUser";

    function daysAgo(n) {
        const d = new Date();
        d.setDate(d.getDate() - n);
        return d.toISOString();
    }

    function seedTransactions() {
        return [
            {
                id: 1,
                desc: "Monthly salary",
                category: "Salary",
                type: "income",
                amountUSD: 2400,
                date: daysAgo(6),
            },
            {
                id: 2,
                desc: "Groceries",
                category: "Food",
                type: "expense",
                amountUSD: 86.4,
                date: daysAgo(5),
            },
            {
                id: 3,
                desc: "Freelance design work",
                category: "Freelance",
                type: "income",
                amountUSD: 320,
                date: daysAgo(4),
            },
            {
                id: 4,
                desc: "Electricity bill",
                category: "Utilities",
                type: "expense",
                amountUSD: 64,
                date: daysAgo(2),
            },
            {
                id: 5,
                desc: "Coffee & lunch",
                category: "Food",
                type: "expense",
                amountUSD: 18.5,
                date: daysAgo(1),
            },
        ];
    }

    let state = {
        username: "",
        pin: "",
        name: "",
        currency: "USD",
        theme: "dark",
        type: "income",
        filter: "all",
        transactions: [],
    };

    function accountKey(username) {
        return "fintrack:user:" + username.trim().toLowerCase();
    }

    // ---- elements: login ----
    const loginScreen = document.getElementById("loginScreen");
    const appScreen = document.getElementById("appScreen");
    const loginForm = document.getElementById("loginForm");
    const loginUsername = document.getElementById("loginUsername");
    const loginPin = document.getElementById("loginPin");
    const loginError = document.getElementById("loginError");
    const loginSubmit = document.getElementById("loginSubmit");

    // prefill last used account name, best-effort
    (async function prefill() {
        try {
            const res = await window.storage.get(LAST_USER_KEY, false);
            if (res && res.value) loginUsername.value = res.value;
        } catch (e) {
            /* no last user yet, ignore */
        }
    })();

    function setLoginBusy(busy, label) {
        loginSubmit.disabled = busy;
        loginSubmit.innerHTML = busy
            ? `<span class="spinner"></span> ${label || "Working…"}`
            : "Continue";
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        loginError.textContent = "";
        const username = loginUsername.value.trim();
        const pin = loginPin.value.trim();

        if (!username) {
            loginError.textContent = "Enter an account name.";
            return;
        }
        if (!/^\d{4}$/.test(pin)) {
            loginError.textContent = "PIN must be exactly 4 digits.";
            return;
        }

        const key = accountKey(username);
        setLoginBusy(true, "Checking…");

        let existing = null;
        try {
            const res = await window.storage.get(key, false);
            if (res && res.value) existing = JSON.parse(res.value);
        } catch (e) {
            existing = null; // key not found -> treat as new account
        }

        if (existing) {
            if (existing.pin !== pin) {
                setLoginBusy(false);
                loginError.textContent = "Incorrect PIN for that account name.";
                loginPin.value = "";
                loginPin.focus();
                return;
            }
            state.username = username;
            state.pin = pin;
            state.name = existing.name || "";
            state.currency = existing.currency || "USD";
            state.theme = existing.theme || "dark";
            state.transactions = Array.isArray(existing.transactions)
                ? existing.transactions
                : [];
        } else {
            // brand new account
            state.username = username;
            state.pin = pin;
            state.name = "";
            state.currency = "USD";
            state.theme = "dark";
            state.transactions = seedTransactions();
            try {
                await window.storage.set(
                    key,
                    JSON.stringify({
                        pin: state.pin,
                        name: state.name,
                        currency: state.currency,
                        theme: state.theme,
                        transactions: state.transactions,
                    }),
                    false,
                );
            } catch (e) {
                setLoginBusy(false);
                loginError.textContent =
                    "Couldn't create the account. Try again.";
                return;
            }
        }

        try {
            await window.storage.set(LAST_USER_KEY, username, false);
        } catch (e) {
            /* non-critical */
        }

        setLoginBusy(false);
        enterApp();
    });

    function enterApp() {
        loginScreen.style.display = "none";
        appScreen.style.display = "block";
        document.body.classList.toggle("light", state.theme === "light");
        footAccount.textContent = state.username;
        render();
    }

    function showLogin() {
        appScreen.style.display = "none";
        loginScreen.style.display = "flex";
        loginPin.value = "";
        loginError.textContent = "";
        loginPin.focus();
    }

    // ---- persistence ----
    let saveTimer = null;
    function saveUserData() {
        if (!state.username) return;
        const key = accountKey(state.username);
        const payload = JSON.stringify({
            pin: state.pin,
            name: state.name,
            currency: state.currency,
            theme: state.theme,
            transactions: state.transactions,
        });
        clearTimeout(saveTimer);
        saveTimer = setTimeout(async () => {
            try {
                await window.storage.set(key, payload, false);
            } catch (e) {
                console.error("Save failed", e);
            }
        }, 250);
    }

    // ---- elements: app ----
    const el = (id) => document.getElementById(id);
    const balanceNum = el("balanceNum"),
        incomeVal = el("incomeVal"),
        expenseVal = el("expenseVal");
    const txList = el("txList"),
        chartHolder = el("chartHolder");
    const currencySelect = el("currencySelect"),
        prefCurrency = el("prefCurrency");
    const nameInput = el("nameInput"),
        greeting = el("greeting");
    const descInput = el("descInput"),
        amountInput = el("amountInput"),
        categoryInput = el("categoryInput");
    const typeIncomeBtn = el("typeIncomeBtn"),
        typeExpenseBtn = el("typeExpenseBtn");
    const footAccount = el("footAccount");

    function fmt(amountUSD) {
        const rate = RATES[state.currency];
        const val = amountUSD * rate;
        const sym = SYMS[state.currency];
        const decimals = state.currency === "JPY" ? 0 : 2;
        return (
            sym +
            val.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })
        );
    }

    function render() {
        greeting.textContent = state.name
            ? `${state.name}'s Ledger`
            : "Ledger";
        currencySelect.value = state.currency;
        prefCurrency.value = state.currency;
        nameInput.value = state.name;

        let income = 0,
            expense = 0;
        state.transactions.forEach((t) => {
            if (t.type === "income") income += t.amountUSD;
            else expense += t.amountUSD;
        });
        const balance = income - expense;
        balanceNum.textContent = fmt(balance);
        balanceNum.classList.toggle("negative", balance < 0);
        incomeVal.textContent = fmt(income);
        expenseVal.textContent = fmt(expense);

        renderChart();
        renderList();
    }

    function renderChart() {
        const items = state.transactions.slice(-7);
        chartHolder.innerHTML = "";
        if (items.length === 0) {
            chartHolder.innerHTML =
                '<div class="empty-state" style="padding:20px 0;">No data yet — add a transaction to see cash flow.</div>';
            return;
        }
        const w = chartHolder.clientWidth || 660;
        const h = 90;
        const barW = w / items.length;
        const maxAbs = Math.max(...items.map((t) => t.amountUSD), 1);
        let svg = `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">`;
        const zero = h / 2;
        svg += `<line x1="0" y1="${zero}" x2="${w}" y2="${zero}" stroke="var(--line-dark)" stroke-width="1"/>`;
        items.forEach((t, i) => {
            const barH = (t.amountUSD / maxAbs) * (h / 2 - 8);
            const x = i * barW + barW * 0.25;
            const bw = barW * 0.5;
            const color = t.type === "income" ? "var(--green)" : "var(--red)";
            const y = t.type === "income" ? zero - barH : zero;
            const hh = Math.max(barH, 2);
            svg += `<rect x="${x}" y="${y}" width="${bw}" height="${hh}" rx="2" fill="${color}"/>`;
        });
        svg += `</svg>`;
        chartHolder.innerHTML = svg;
    }

    function renderList() {
        let items = state.transactions.slice().reverse();
        if (state.filter !== "all")
            items = items.filter((t) => t.type === state.filter);

        if (items.length === 0) {
            txList.innerHTML = `<div class="empty-state"><span class="glyph">✎</span>No entries here yet. Add your first transaction above.</div>`;
            return;
        }
        txList.innerHTML = items
            .map((t) => {
                const d = new Date(t.date);
                const dateStr = d.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                });
                const sign = t.type === "income" ? "+" : "−";
                return `
        <div class="tx-row">
          <span class="tx-dot ${t.type}"></span>
          <div class="tx-info">
            <div class="tx-desc">${escapeHtml(t.desc)}</div>
            <div class="tx-meta">${escapeHtml(t.category || "Uncategorized")} · ${dateStr}</div>
          </div>
          <div class="tx-amt ${t.type}">${sign}${fmt(t.amountUSD)}</div>
          <button class="tx-del" data-id="${t.id}" aria-label="Delete transaction">✕</button>
        </div>`;
            })
            .join("");
    }

    function escapeHtml(s) {
        const d = document.createElement("div");
        d.textContent = s;
        return d.innerHTML;
    }

    // ---- events ----
    typeIncomeBtn.addEventListener("click", () => {
        state.type = "income";
        typeIncomeBtn.classList.add("active");
        typeExpenseBtn.classList.remove("active");
    });
    typeExpenseBtn.addEventListener("click", () => {
        state.type = "expense";
        typeExpenseBtn.classList.add("active");
        typeIncomeBtn.classList.remove("active");
    });

    el("addBtn").addEventListener("click", () => {
        const desc = descInput.value.trim();
        const amtRaw = parseFloat(amountInput.value);
        const category = categoryInput.value.trim();
        if (!desc || isNaN(amtRaw) || amtRaw <= 0) {
            descInput.focus();
            return;
        }
        const amountUSD = amtRaw / RATES[state.currency];
        state.transactions.push({
            id: Date.now(),
            desc,
            category,
            type: state.type,
            amountUSD,
            date: new Date().toISOString(),
        });
        descInput.value = "";
        amountInput.value = "";
        categoryInput.value = "";
        render();
        saveUserData();
    });

    txList.addEventListener("click", (e) => {
        const btn = e.target.closest(".tx-del");
        if (!btn) return;
        const id = Number(btn.dataset.id);
        state.transactions = state.transactions.filter((t) => t.id !== id);
        render();
        saveUserData();
    });

    document.querySelectorAll(".filters button").forEach((b) => {
        b.addEventListener("click", () => {
            document
                .querySelectorAll(".filters button")
                .forEach((x) => x.classList.remove("active"));
            b.classList.add("active");
            state.filter = b.dataset.filter;
            renderList();
        });
    });

    currencySelect.addEventListener("change", () => {
        state.currency = currencySelect.value;
        render();
        saveUserData();
    });
    prefCurrency.addEventListener("change", () => {
        state.currency = prefCurrency.value;
        render();
        saveUserData();
    });
    nameInput.addEventListener("input", () => {
        state.name = nameInput.value;
        greeting.textContent = state.name
            ? `${state.name}'s Ledger`
            : "Ledger";
        saveUserData();
    });

    el("themeToggle").addEventListener("click", () => {
        state.theme = state.theme === "dark" ? "light" : "dark";
        document.body.classList.toggle("light", state.theme === "light");
        saveUserData();
    });

    el("resetBtn").addEventListener("click", () => {
        if (
            !confirm(
                "Reset all data? This clears every transaction and preference for this account.",
            )
        )
            return;
        state.transactions = [];
        state.name = "";
        state.currency = "USD";
        render();
        saveUserData();
    });

    el("logoutBtn").addEventListener("click", () => {
        state = {
            username: "",
            pin: "",
            name: "",
            currency: "USD",
            theme: "dark",
            type: "income",
            filter: "all",
            transactions: [],
        };
        showLogin();
    });

    window.addEventListener("resize", renderChart);
})();