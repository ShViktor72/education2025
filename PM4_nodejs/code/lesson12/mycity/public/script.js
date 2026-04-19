document.addEventListener('DOMContentLoaded', () => {
    console.log("Добро пожаловать в Алматы!");
    
    const btn = document.getElementById('welcomeBtn');
    if (btn) {
        btn.onclick = () => {
            alert("Алматы ждет вас в гости!");
        };
    }
});