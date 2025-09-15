class RadioStation {
    #url; // Приватное поле для URL

    constructor(name, url, image, genre = "Unknown") { // Жанр по умолчанию
        this.name = name;
        this.image = image || "./images/radio.png"; // Логотип по умолчанию
        this.genre = genre ; 

        // Используем сеттер для установки URL
        this.url = url; // Если URL невалидный, сеттер выбросит ошибку
    }

    // Приватный метод для проверки валидности URL
    #validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // Геттер для приватного поля `#url`
    get url() {
        return this.#url;
    }

    // Сеттер для приватного поля `#url`
    set url(newUrl) {
        if (this.#validateUrl(newUrl)) {
            this.#url = newUrl;
        } else {
            throw new Error(`Invalid URL: ${newUrl}`);
        }
    }

    // Метод для воспроизведения станции
    play(playerElement) {
        if (!this.#url) {
            console.error("Cannot play: Invalid URL.");
            return;
        }
        playerElement.src = this.#url;
        playerElement.play();

        const currentStation = document.getElementById("current-station");
        currentStation.textContent = `Now Playing: ${this.name}`;
    }

    // Метод для отображения станции на странице
    render(parentElement) {
        const stationDiv = document.createElement("div");
        stationDiv.style.backgroundColor = "lightblue";
        stationDiv.className = "station";
        stationDiv.innerHTML = `
            <img src="${this.image}" alt="${this.name} Icon">
            <div class="station-info">
                <strong>${this.name}</strong>
                <p>Genre: ${this.genre}</p>
            </div>
        `;

        // Обработчик клика для воспроизведения станции
        stationDiv.addEventListener("click", () => {
            document
                .querySelectorAll(".station")
                .forEach((el) => el.classList.remove("active"));
            stationDiv.classList.add("active");
            this.play(document.getElementById("player"));
        });

        parentElement.appendChild(stationDiv);
    }
}

// Массив с данными о станциях
const stationsData = [
    {
        name: "Moto Radio",
        url: "https://stream.motoradio.online/high-mp3",
        genre: "Rock",
    },
    {
        name: "Radio Ultra",
        url: "https://nashe1.hostingradio.ru/ultra-128.mp3",
        image: "https://cdn-radiotime-logos.tunein.com/s278074g.png",
        genre: "Pop",
    },
    {
        name: "Radio Rostova",
        url: "http://radiorostova.ru:8000/rostovradio",
    },
    {
        name: "Jazz FM",
        url: "http://icepe6.infomaniak.ch:80/jazz-wr01-128.mp3",
        image: "https://lh3.googleusercontent.com/gcq_iE6G_BC7wDWUzMD29PoIx4XR4v6RNQ86Uv3A3wIUKpmwfWhbFx6HT7frIkriIVM=w220",
        genre: "Jazz",
    },
    {
        name: "Invalid Radio",
        url: "invalid-url",
    },
];

// Создание и отображение станций
const stationsDiv = document.getElementById("stations");

stationsData.forEach((stationData) => {
    try {
        // Пытаемся создать экземпляр класса
        const station = new RadioStation(
            stationData.name,
            stationData.url,
            stationData.image, // Если отсутствует, будет использоваться значение по умолчанию
            stationData.genre  // Если отсутствует, будет использоваться значение по умолчанию
        );
        station.render(stationsDiv); // Отображаем станцию, если экземпляр создан
    } catch (error) {
        console.error(`Failed to create station: ${stationData.name}. ${error.message}`);
    }
});

// Функционал кнопки "Stop"
document.getElementById("stop-button").addEventListener("click", () => {
    const player = document.getElementById("player");
    player.pause();
    player.src = "";
    document.getElementById("current-station").textContent = "Select a station to play";
    document
        .querySelectorAll(".station")
        .forEach((el) => el.classList.remove("active"));
});