// Учебный стенд для практики по smoke, regression, alpha/beta и acceptance testing.
// Часть дефектов намеренно оставлена в сборках, чтобы студенты оформили QA-отчет.

const DEFAULT_DB = {
  currentUser: null,
  submissions: [],
  grades: [],
  notifications: [],
  history: [
    { id: 1, student: "student@test.com", action: "uploaded", file: "old_homework.pdf", date: "2026-05-01" }
  ]
};

let db = loadDb();
let build = localStorage.getItem("edutask-build") || "2.4.0";
let apiResponse = { status: null, body: null };
let logs = [];

const releaseNotes = `Release 2.4\nИзменение: преподаватель может оставить комментарий к оценке.\nРиск: затронуты оценивание, отображение результата студенту, уведомления и история сдачи.\nСборка 2.4.0: первичная сборка для smoke testing.\nСборка 2.4.1: сборка после исправления BUG-SMOKE-001.\nНамеренные учебные дефекты:\n1) 2.4.0: оценка с комментарием не сохраняется.\n2) 2.4.1: DOCX ошибочно отклоняется при загрузке.\n3) 2.4.1: комментарий сохраняется, но не отображается студенту.\n4) 2.4.1: уведомление студенту после оценки не создается.\n5) 2.4.1: комментарий длиннее 80 символов отклоняется, хотя требование разрешает до 300.`;

function loadDb() {
  const saved = localStorage.getItem("edutask-db");
  return saved ? JSON.parse(saved) : structuredClone(DEFAULT_DB);
}
function saveDb() { localStorage.setItem("edutask-db", JSON.stringify(db)); }
function setApi(status, body) { apiResponse = { status, body }; renderPanels(); }
function log(message) { logs.push(`[${new Date().toLocaleTimeString()}] ${message}`); renderPanels(); }
function reset() {
  db = structuredClone(DEFAULT_DB);
  apiResponse = { status: null, body: null };
  logs = [];
  saveDb();
  setMessage("loginMessage", "Стенд сброшен. Выберите роль и выполните вход.", "muted");
  setMessage("studentMessage", "Работа еще не загружена.", "muted");
  setMessage("teacherMessage", "Оценка еще не сохранена.", "muted");
  renderStudentView();
  renderSubmissionInfo();
  renderPanels();
}
function currentBuild() { return document.querySelector("#buildSelect").value; }
function setMessage(id, text, type="muted") {
  const el = document.querySelector("#" + id);
  el.textContent = text;
  el.className = `message ${type}`;
}

function login(role) {
  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value;
  const okStudent = role === "student" && email === "student@test.com" && password === "Stud1234";
  const okTeacher = role === "teacher" && email === "teacher@test.com" && password === "Teach1234";
  if (okStudent || okTeacher) {
    db.currentUser = { email, role };
    saveDb();
    setApi(200, { ok: true, role, email, token: `release_token_${Date.now()}` });
    log(`LOGIN SUCCESS role=${role} email=${email}`);
    setMessage("loginMessage", `Вход выполнен: ${role}, ${email}`, "success");
  } else {
    setApi(401, { ok: false, message: "Неверный логин или пароль" });
    log(`LOGIN FAIL role=${role} email=${email}`);
    setMessage("loginMessage", "Неверный логин или пароль", "error");
  }
}

function uploadHomework() {
  const fileName = document.querySelector("#fileName").value.trim();
  const size = Number(document.querySelector("#fileSize").value);
  const ext = fileName.split('.').pop().toLowerCase();
  if (!db.currentUser || db.currentUser.role !== "student") {
    setApi(403, { ok: false, message: "Нужно войти как студент" });
    setMessage("studentMessage", "Сначала войдите как студент.", "error");
    return;
  }
  if (!fileName) {
    setApi(400, { ok: false, message: "Файл не выбран" });
    setMessage("studentMessage", "Файл не выбран.", "error");
    return;
  }
  if (size > 10) {
    setApi(413, { ok: false, message: "Размер файла превышает 10 МБ" });
    setMessage("studentMessage", "Размер файла превышает 10 МБ.", "error");
    return;
  }
  // BUG-REG-001: после изменения функции оценки DOCX ошибочно отклоняется, хотя REQ-02 разрешает PDF и DOCX.
  if (currentBuild() === "2.4.1" && ext === "docx") {
    setApi(415, { ok: false, message: "Формат DOCX временно не поддерживается" });
    log(`UPLOAD FAIL file=${fileName} reason=docx_rejected`);
    setMessage("studentMessage", "Формат DOCX временно не поддерживается.", "error");
    return;
  }
  if (!["pdf", "docx"].includes(ext)) {
    setApi(415, { ok: false, message: "Разрешены только PDF или DOCX" });
    setMessage("studentMessage", "Разрешены только PDF или DOCX.", "error");
    return;
  }
  const submission = { id: Date.now(), student: db.currentUser.email, fileName, size, status: "submitted", createdAt: new Date().toISOString() };
  db.submissions.push(submission);
  db.history.push({ id: Date.now(), student: db.currentUser.email, action: "uploaded", file: fileName, date: new Date().toISOString().slice(0,10) });
  saveDb();
  setApi(201, { ok: true, submissionId: submission.id, fileName, status: "submitted" });
  log(`UPLOAD SUCCESS file=${fileName} size=${size}MB`);
  setMessage("studentMessage", `Работа ${fileName} загружена.`, "success");
  renderSubmissionInfo();
}

function saveGrade() {
  const grade = Number(document.querySelector("#gradeInput").value);
  const comment = document.querySelector("#commentInput").value.trim();
  const last = db.submissions[db.submissions.length - 1];
  if (!db.currentUser || db.currentUser.role !== "teacher") {
    setApi(403, { ok: false, message: "Нужно войти как преподаватель" });
    setMessage("teacherMessage", "Сначала войдите как преподаватель.", "error");
    return;
  }
  if (!last) {
    setApi(404, { ok: false, message: "Нет отправленной работы" });
    setMessage("teacherMessage", "Нет отправленной работы для проверки.", "error");
    return;
  }
  if (grade < 0 || grade > 100) {
    setApi(400, { ok: false, message: "Оценка должна быть от 0 до 100" });
    setMessage("teacherMessage", "Оценка должна быть от 0 до 100.", "error");
    return;
  }
  if (comment.length < 3) {
    setApi(400, { ok: false, message: "Комментарий должен быть не короче 3 символов" });
    setMessage("teacherMessage", "Комментарий должен быть не короче 3 символов.", "error");
    return;
  }
  // BUG-ALPHA-001: в 2.4.1 ограничение 80 символов вместо 300.
  if (currentBuild() === "2.4.1" && comment.length > 80) {
    setApi(400, { ok: false, message: "Комментарий не должен превышать 80 символов" });
    log(`GRADE FAIL reason=comment_too_long length=${comment.length}`);
    setMessage("teacherMessage", "Комментарий не должен превышать 80 символов.", "error");
    return;
  }
  // BUG-SMOKE-001: в 2.4.0 новая функция не сохраняет оценку с комментарием.
  if (currentBuild() === "2.4.0") {
    setApi(500, { ok: false, message: "Ошибка сохранения комментария" });
    log("GRADE FAIL build=2.4.0 reason=comment_save_error");
    setMessage("teacherMessage", "Ошибка сохранения комментария.", "error");
    return;
  }
  const record = { id: Date.now(), submissionId: last.id, grade, comment, createdAt: new Date().toISOString() };
  db.grades.push(record);
  // BUG-UAT-001: уведомление не создается, хотя REQ-07 требует уведомление студенту.
  // db.notifications.push({student: last.student, text: "Работа проверена", createdAt: new Date().toISOString()});
  saveDb();
  setApi(201, { ok: true, gradeId: record.id, grade, commentSaved: true, notificationSent: false });
  log(`GRADE SAVED grade=${grade} commentLength=${comment.length} notificationSent=false`);
  setMessage("teacherMessage", "Оценка и комментарий сохранены.", "success");
  renderStudentView();
}

function renderSubmissionInfo() {
  const last = db.submissions[db.submissions.length - 1];
  const el = document.querySelector("#submissionInfo");
  if (!last) {
    el.textContent = "Отправленная работа пока не найдена.";
    el.className = "message muted";
  } else {
    el.textContent = `Найдена работа: ${last.fileName}, студент ${last.student}, статус ${last.status}`;
    el.className = "message success";
  }
}

function renderStudentView() {
  const lastGrade = db.grades[db.grades.length - 1];
  document.querySelector("#studentGrade").textContent = lastGrade ? lastGrade.grade : "—";
  // BUG-UAT-002: комментарий сохранен в БД, но не отображается студенту.
  document.querySelector("#studentComment").textContent = lastGrade ? "Комментарий не отображается" : "—";
  document.querySelector("#studentNotification").textContent = db.notifications.length ? db.notifications[db.notifications.length - 1].text : "—";
}

function runSmoke() {
  const b = currentBuild();
  const lines = [];
  lines.push(`SMOKE TESTING | build ${b}`);
  lines.push("PASS | Главная страница открывается | expected=страница доступна | actual=страница доступна");
  lines.push("PASS | Студент может войти | expected=200 token | actual=200 token");
  lines.push("PASS | Преподаватель может войти | expected=200 token | actual=200 token");
  lines.push("PASS | Студент может загрузить PDF 2 МБ | expected=201 submitted | actual=201 submitted");
  if (b === "2.4.0") {
    lines.push("FAIL | Преподаватель сохраняет оценку с комментарием | expected=201 saved | actual=500 Ошибка сохранения комментария");
    lines.push("BLOCKED | Студент видит оценку и комментарий | причина: оценка не сохранена");
    lines.push("DECISION | Smoke не пройден. Сборку вернуть разработчикам, детальное тестирование не начинать.");
  } else {
    lines.push("PASS | Преподаватель сохраняет оценку с комментарием | expected=201 saved | actual=201 saved");
    lines.push("PASS | Сборка пригодна для дальнейшего тестирования | нет блокирующих smoke-дефектов");
    lines.push("DECISION | Smoke пройден. Можно начинать регрессионное и приемочное тестирование.");
  }
  document.querySelector("#testOutput").textContent = lines.join("\n");
  log(`SMOKE RUN build=${b}`);
}

function runRetest() {
  const b = currentBuild();
  const lines = [];
  lines.push(`RETESTING BUG-SMOKE-001 | build ${b}`);
  lines.push("Дефект: оценка с комментарием не сохранялась на сборке 2.4.0.");
  if (b === "2.4.0") {
    lines.push("FAIL | Повторная проверка дефекта | expected=201 saved | actual=500 comment_save_error");
    lines.push("DECISION | Дефект не исправлен.");
  } else {
    lines.push("PASS | Повторная проверка дефекта | expected=201 saved | actual=201 saved");
    lines.push("DECISION | Retesting пройден, можно выполнять regression testing связанных областей.");
  }
  document.querySelector("#testOutput").textContent = lines.join("\n");
  log(`RETEST RUN build=${b}`);
}

function runRegression() {
  const lines = [];
  lines.push(`REGRESSION TESTING | build ${currentBuild()}`);
  lines.push("PASS | REG-001 Авторизация студента | old function | expected=login works | actual=login works");
  lines.push("PASS | REG-002 Авторизация преподавателя | old function | expected=login works | actual=login works");
  lines.push("PASS | REG-003 Загрузка PDF 2 МБ | old function | expected=submitted | actual=submitted");
  lines.push("FAIL | REG-004 Загрузка DOCX 2 МБ | old function | expected=submitted | actual=415 DOCX не поддерживается");
  lines.push("PASS | REG-005 Оценка 0 и 100 | boundary | expected=accepted | actual=accepted");
  lines.push("FAIL | REG-006 Отображение комментария студенту | new/linked function | expected=comment visible | actual=Комментарий не отображается");
  lines.push("FAIL | REG-007 Уведомление после оценки | linked function | expected=notification created | actual=notification missing");
  lines.push("PASS | REG-008 История сдачи сохраняется | old function | expected=history exists | actual=history exists");
  lines.push("DECISION | Регрессия не пройдена: найдены дефекты в старом функционале и связанных областях.");
  document.querySelector("#testOutput").textContent = lines.join("\n");
  log("REGRESSION RUN");
}

function runUat() {
  const lines = [];
  lines.push(`ACCEPTANCE / UAT | build ${currentBuild()}`);
  lines.push("PASS | UAT-001 Студент загружает PDF | критерий: работа отображается преподавателю");
  lines.push("PASS | UAT-002 Преподаватель ставит оценку | критерий: оценка сохраняется");
  lines.push("FAIL | UAT-003 Студент видит комментарий | критерий: комментарий отображается студенту | actual=не отображается");
  lines.push("FAIL | UAT-004 Студент получает уведомление | критерий: уведомление создано | actual=уведомления нет");
  lines.push("FAIL | UAT-005 Комментарий до 300 символов | критерий: принимается | actual=отклонение после 80 символов");
  lines.push("DECISION | Приемочные критерии не выполнены. Рекомендация: No release.");
  document.querySelector("#testOutput").textContent = lines.join("\n");
  log("UAT RUN");
}

function renderPanels() {
  document.querySelector("#apiPanel").textContent = JSON.stringify(apiResponse, null, 2);
  document.querySelector("#dbPanel").textContent = JSON.stringify(db, null, 2);
  document.querySelector("#logsPanel").textContent = logs.length ? logs.join("\n") : "Логов пока нет.";
  document.querySelector("#releasePanel").textContent = releaseNotes;
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      ["apiPanel", "dbPanel", "logsPanel", "releasePanel"].forEach(id => document.querySelector("#" + id).classList.add("hidden"));
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
    if (!title) return;
    const type = document.querySelector("#bugType").value;
    const severity = document.querySelector("#bugSeverity").value;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${body.children.length + 1}</td><td>${title}</td><td>${type}</td><td>${severity}</td>`;
    body.appendChild(row);
    form.reset();
  });
}

document.querySelector("#buildSelect").value = build;
document.querySelector("#buildSelect").addEventListener("change", (e) => { localStorage.setItem("edutask-build", e.target.value); log(`BUILD CHANGED ${e.target.value}`); });
document.querySelector("#resetBtn").addEventListener("click", reset);
document.querySelector("#loginStudentBtn").addEventListener("click", () => login("student"));
document.querySelector("#loginTeacherBtn").addEventListener("click", () => login("teacher"));
document.querySelector("#uploadBtn").addEventListener("click", uploadHomework);
document.querySelector("#saveGradeBtn").addEventListener("click", saveGrade);
document.querySelector("#runSmokeBtn").addEventListener("click", runSmoke);
document.querySelector("#runRetestBtn").addEventListener("click", runRetest);
document.querySelector("#runRegressionBtn").addEventListener("click", runRegression);
document.querySelector("#runUatBtn").addEventListener("click", runUat);
setupTabs();
setupBugForm();
renderStudentView();
renderSubmissionInfo();
renderPanels();

window.edutaskQA = { getDb: () => db, reset, runSmoke, runRegression, runUat };
