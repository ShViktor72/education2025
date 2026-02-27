class RadioStation {
    constructor (name, url){
        this.name = name;
        this.url = url;
    }

    play(playElement){
        playElement.src = this.url;
        playElement.play();
    }

    render(parentElement){
        const div = document.createElement('div');
        div.textContent = `${this.name}`;
        div.className = 'station';
        div.addEventListener('click', () => {
            this.play(document.getElementById('player'))
        });

        parentElement.appendChild(div);
    }
}

const stationsDiv = document.getElementById('stations');

const radio = new RadioStation('Moto Radio', 'https://stream.motoradio.online/high-mp3');
radio.render(stationsDiv);

