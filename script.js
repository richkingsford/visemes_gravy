const mp3s = [
    'correct_No need to test—you\'re pure genius!.mp3',
    'correct_Reaction complete.mp3',
    'correct_That answer was litmus-perfect!.mp3',
    'correct_That’s a Nobel-worthy response!.mp3',
    'correct_That’s atomic-level brilliance!.mp3',
    'correct_You bonded with the right answer!.mp3',
    'correct_You just catalyzed success!.mp3',
    'correct_You’re in your element!.mp3',
    'correct_You’re positively charged with knowledge!.mp3',
    'correct_You’ve got the right reaction!.mp3',
    'incorrect_Close, but the electrons didn’t align.mp3',
    'incorrect_Even failed experiments teach us something.mp3',
    'incorrect_Keep testing—every chemist misses a step!.mp3',
    'incorrect_Not quite balanced—try again!.mp3',
    'incorrect_Oops—wrong reaction, but keep mixing!.mp3',
    'incorrect_Science thrives on second chances!.mp3',
    'incorrect_That answer didn’t bond—let’s reconfigure.mp3',
    'incorrect_That one fizzled, but you’re still glowing.mp3',
    'incorrect_Wrong compound—let’s synthesize a better one.mp3'
];

const videosContainer = document.getElementById('videos-container');

const visemeMap = {
    'a': 'a-OOO-u.png',
    'o': 'a-OOO-u.png',
    'u': 'UUU.png',
    'e': 'EEE-III.png',
    'i': 'EEE-III.png',
    'l': 'L.png'
};

mp3s.forEach(mp3 => {
    const video = document.createElement('div');
    video.classList.add('video');

    const neutralImg = document.createElement('img');
    neutralImg.src = 'neutral.png';
    video.appendChild(neutralImg);

    const visemeImg = document.createElement('img');
    visemeImg.classList.add('viseme');
    visemeImg.style.display = 'none';
    video.appendChild(visemeImg);

    const playButton = document.createElement('button');
    playButton.classList.add('play-button');
    playButton.textContent = 'Play';
    video.appendChild(playButton);

    const audio = new Audio(mp3);
    const sentence = mp3.replace(/_/g, ' ').replace('.mp3', '');

    const sentenceEl = document.createElement('p');
    sentenceEl.textContent = sentence;
    video.appendChild(sentenceEl);

    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls');

    const speedLabel = document.createElement('label');
    speedLabel.textContent = 'Speed:';
    const speedInput = document.createElement('input');
    speedInput.type = 'number';
    speedInput.value = 1;
    controlsContainer.appendChild(speedLabel);
    controlsContainer.appendChild(speedInput);

    const offsetLabel = document.createElement('label');
    offsetLabel.textContent = 'Start Offset:';
    const offsetInput = document.createElement('input');
    offsetInput.type = 'number';
    offsetInput.value = 0;
    controlsContainer.appendChild(offsetLabel);
    controlsContainer.appendChild(offsetInput);

    video.appendChild(controlsContainer);

    playButton.addEventListener('click', () => {
        const speed = parseFloat(speedInput.value) || 1;
        const startOffset = parseInt(offsetInput.value) || 0;

        audio.play();

        setTimeout(() => {
            animateVisemes(sentence, visemeImg, speed);
        }, startOffset);
    });

    videosContainer.appendChild(video);
});

let visemeX = 0;
let visemeY = 0;
let visemeScale = 1;

function animateVisemes(sentence, visemeImg, speed) {
    let i = 0;
    function showNextViseme() {
        if (i >= sentence.length) {
            visemeImg.style.display = 'none';
            return;
        }

        const char = sentence[i].toLowerCase();
        const visemeSrc = visemeMap[char];

        if (visemeSrc) {
            visemeImg.src = visemeSrc;
            visemeImg.style.display = 'block';
        } else {
            visemeImg.style.display = 'none';
        }

        i++;
        setTimeout(showNextViseme, 100 / speed);
    }
    showNextViseme();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            visemeY -= 5;
            break;
        case 'ArrowDown':
            visemeY += 5;
            break;
        case 'ArrowLeft':
            visemeX -= 5;
            break;
        case 'ArrowRight':
            visemeX += 5;
            break;
        case 'q':
            visemeScale += 0.1;
            break;
        case 'a':
            visemeScale = Math.max(0.1, visemeScale - 0.1);
            break;
    }

    const visemes = document.querySelectorAll('.viseme');
    visemes.forEach(viseme => {
        viseme.style.transform = `translate(${visemeX}px, ${visemeY}px) scale(${visemeScale})`;
    });
});
