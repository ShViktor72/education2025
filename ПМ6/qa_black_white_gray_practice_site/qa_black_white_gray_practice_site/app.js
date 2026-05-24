// Учебный стенд для практической работы по Black-box, White-box и Gray-box testing.
// В код специально добавлены дефекты. Студенты должны найти их и оформить отчеты.

const DEFAULT_DB = {
  users: [
    {
      id: 1,
      email: "qa@test.com",
      // Требование: пароль в БД должен храниться как hash, а не открытым текстом.
      // Дефект для gray-box: hash содержит исходный пароль в читаемом виде.
      passwordHash: "hash_Pass1234",
      role: "student",
      status: "active",
      failedAttempts: 0
    }
  ],
  sessions: []
};

let db = loadDb();
let apiResponse = {
  status: null,
  body: null
};
let logs = [];

const sourceSnippet = `function validateEmail(email) {
  // BUG-1: проверка слишком слабая: "user@" пройдет как валидный email.
  return email.includes("@");
}

function validatePassword(password) {
  // Требование: от 8 до 20 символов включительно.
  // BUG-2: пароль длиной 8 символов ошибочно отклоняется.
  return password.length > 8 && password.length <= 20;
}

function login(email, password) {
  const user = db.users.find(u => u.email === email);

  if (!validateEmail(email)) {
    return error(400, "Некорректный формат email");
  }

  if (!validatePassword(password)) {
    return error(400, "Некорректная длина пароля");
  }

  if (!user) {
    return error(404, "Пользователь не найден");
  }

  if (user.status === "blocked") {
    return error(423, "Аккаунт заблокирован");
  }

  if (password !== "Pass1234") {
    user.failedAttempts += 1;

    // Требование: блокировка после 5 неправильных попыток.
    // BUG-3: блокировка происходит только после 6-й попытки.
    if (user.failedAttempts > 5) {
      user.status = "blocked";
    }

    saveDb();
    return error(401, "Неверный пароль");
  }

  const token = "token_" + Date.now();

  // BUG-4: счетчик failedAttempts не сбрасывается после успешного входа.
  db.sessions.push({ userId: user.id, token, createdAt: new Date().toISOString() });
  saveDb();

  return success(200, { token, userId: user.id, role: user.role });
}`;

function loadDb() {
  const saved = localStorage.getItem("qa-demo-db");
  return saved ? JSON.parse(saved) : structuredClone(DEFAULT_DB);
}

function saveDb() {
  localStorage.setItem("qa-demo-db", JSON.stringify(db));
}

function resetDb() {
  db = structuredClone(DEFAULT_DB);
  localStorage.setItem("qa-demo-db", JSON.stringify(db));
  apiResponse = { status: null, body: null };
  logs = [];
  render();
  setMessage("Стенд сброшен. Можно начинать новый тестовый прогон.", "muted");
}

function validateEmail(email) {
  // BUG-1: проверка слишком слабая: "user@" пройдет как валидный email.
  return email.includes("@");
}

function validatePassword(password) {
  // BUG-2: требование от 8 до 20 включительно, но код требует строго больше 8.
  return password.length >= 8 && password.length < 20;
}

function error(status, message) {
  apiResponse = { status, body: { ok: false, message } };
  logs.push(`[${new Date().toLocaleTimeString()}] ERROR ${status}: ${message}`);
  render();
  return apiResponse;
}

function success(status, body) {
  apiResponse = { status, body: { ok: true, ...body } };
  logs.push(`[${new Date().toLocaleTimeString()}] SUCCESS ${status}: token=${body.token}`);
  render();
  return apiResponse;
}

function login(email, password) {
  const user = db.users.find(u => u.email === email);

  if (!validateEmail(email)) {
    return error(400, "Некорректный формат email");
  }

  if (!validatePassword(password)) {
    return error(400, "Некорректная длина пароля");
  }

  if (!user) {
    return error(404, "Пользователь не найден");
  }

  if (user.status === "blocked") {
    return error(423, "Аккаунт заблокирован");
  }

  if (password !== "Pass1234") {
    user.failedAttempts += 1;

    // BUG-3: должно быть >= 5, но в коде стоит > 5.
    if (user.failedAttempts > 5) {
      user.status = "blocked";
    }

    saveDb();
    return error(401, "Неверный пароль");
  }

  const token = "token_" + Date.now();

  // BUG-4: после успешного входа счетчик failedAttempts должен быть 0.
  db.sessions.push({ userId: user.id, token, createdAt: new Date().toISOString() });
  saveDb();

  return success(200, { token, userId: user.id, role: user.role });
}

function handleSubmit(event) {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  const response = login(email, password);

  if (response.body.ok) {
    setMessage("Вход выполнен. Открыт личный кабинет.", "success");
    document.querySelector("#cabinet").classList.remove("hidden");
  } else {
    const type = response.status === 423 ? "warning" : "error";
    setMessage(response.body.message, type);
    document.querySelector("#cabinet").classList.add("hidden");
  }
}

function setMessage(text, type) {
  const message = document.querySelector("#message");
  message.textContent = text;
  message.className = `message ${type}`;
}

function render() {
  document.querySelector("#apiPanel").textContent = JSON.stringify(apiResponse, null, 2);
  document.querySelector("#dbPanel").textContent = JSON.stringify(db, null, 2);
  document.querySelector("#logsPanel").textContent = logs.length ? logs.join("\n") : "Логов пока нет.";
  document.querySelector("#sourceCodeView").textContent = sourceSnippet;
}

function runUnitTests() {
  const testResults = [];

  function assert(name, actual, expected) {
    const pass = actual === expected;
    testResults.push(`${pass ? "PASS" : "FAIL"} | ${name} | actual=${actual} | expected=${expected}`);
  }

  assert("Email qa@test.com валиден", validateEmail("qa@test.com"), true);
  assert("Email user@ должен быть невалиден", validateEmail("user@"), false);
  assert("Пароль длиной 7 символов невалиден", validatePassword("1234567"), false);
  assert("Пароль длиной 8 символов валиден", validatePassword("12345678"), true);
  assert("Пароль длиной 20 символов валиден", validatePassword("12345678901234567890"), true);
  assert("Пароль длиной 21 символ невалиден", validatePassword("123456789012345678901"), false);

  document.querySelector("#unitTestResult").textContent = testResults.join("\n");
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(panel => panel.classList.add("hidden"));
      button.classList.add("active");
      document.querySelector("#" + button.dataset.target).classList.remove("hidden");
    });
  });
}

function setupBugForm() {
  const form = document.querySelector("#bugForm");
  const body = document.querySelector("#bugTableBody");

  form.addEventListener("submit", event => {
    event.preventDefault();
    const title = document.querySelector("#bugTitle").value.trim();
    const type = document.querySelector("#bugType").value;
    const severity = document.querySelector("#bugSeverity").value;

    if (!title) return;

    const row = document.createElement("tr");
    row.innerHTML = `<td>${body.children.length + 1}</td><td>${title}</td><td>${type}</td><td>${severity}</td>`;
    body.appendChild(row);
    form.reset();
  });
}

document.querySelector("#loginForm").addEventListener("submit", handleSubmit);
document.querySelector("#resetBtn").addEventListener("click", resetDb);
document.querySelector("#runUnitTestsBtn").addEventListener("click", runUnitTests);

setupTabs();
setupBugForm();
render();

// Экспорт функций для white-box проверки через DevTools Console.
window.qaApp = {
  validateEmail,
  validatePassword,
  login,
  resetDb,
  getDb: () => db,
  getApiResponse: () => apiResponse
};
