let tempoEstudo = document.getElementById('tempo-estudo');
let tempoDescanso = document.getElementById('tempo-descanso');
let btnStart = document.getElementById('btn-start');
let timer = document.getElementById('timer');

let audio = new Audio('som.mp3');

let countDown;
let tempoAtual;

function startTimer(tempo) {
    let minutos = Math.floor(tempo / 60);
    let segundos = tempo % 60;

    countDown = setInterval(() => {
        if (segundos === 0 && minutos === 0) {
            clearInterval(countDown);
            timer.style.color = '#4CAF50';
            audio.play();
            setTimeout(() => {
                timer.style.color = '#FF5733';
                if (tempoAtual === 'estudo') {
                    startTimer(tempoDescanso.value);
                    tempoAtual = 'descanso';
                } else {
                    startTimer(tempoEstudo.value);
                    tempoAtual = 'estudo';
                }
            }, 5000);
        } else if (segundos === 0) {
            segundos = 59;
            minutos--;
        } else {
            segundos--;
        }

        timer.innerHTML = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }, 1000);
}

btnStart.addEventListener('click', () => {
    tempoAtual = 'estudo';
    startTimer(tempoEstudo.value);
});