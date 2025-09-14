// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ⚙️ Настройки Firebase (замени на свои!)
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAAJwk9exi7KuNvSx7DtAUjSBSpIsc12XM",
  authDomain: "students-d38a6.firebaseapp.com",
  projectId: "students-d38a6",
  storageBucket: "students-d38a6.firebasestorage.app",
  messagingSenderId: "1096791673875",
  appId: "1:1096791673875:web:256ef67fe8a3d138cd43e6"
};


// init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const studentsCol = collection(db, "students");

// =============================
// Класс Student (минимум)
// =============================
class Student {
  #name;
  #id;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  render(parent) {
    const div = document.createElement("div");
    div.textContent = this.#name;
    parent.appendChild(div);
  }
}

// =============================
// Работа с DOM и Firebase
// =============================
const studentsDiv = document.getElementById("students");
const form = document.getElementById("studentForm");
const input = document.getElementById("studentName");

// ➕ Добавление нового студента
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;

  await addDoc(studentsCol, { name });
  input.value = "";
});

// 🔄 Реактивный вывод студентов
onSnapshot(studentsCol, (snapshot) => {
  studentsDiv.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const student = new Student(docSnap.id, data.name);
    student.render(studentsDiv);
  });
});
