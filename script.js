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
const topOffsetInput = document.getElementById('top-offset');
const leftOffsetInput = document.getElementById('left-offset');
const percentageSizeInput = document.getElementById('percentage-size');
const speedInput = document.getElementById('speed');
const startOffsetInput = document.getElementById('start-offset');

const visemeMap = {
    'a': 'a-OOO-u.png',
    'o': 'a-OOO-u.png',
    'u': 'UUU.png',
    'e': 'EEE-III.png',
    'i': 'EEE-III.png',
    'l': 'L.png'
};

function updateVisemeStyles() {
    const top = topOffsetInput.value + 'px';
    const left = leftOffsetInput.value + 'px';
    const scale = percentageSizeInput.value / 100;

    const visemes = document.querySelectorAll('.viseme');
    visemes.forEach(viseme => {
        viseme.style.top = top;
        viseme.style.left = left;
        viseme.style.transform = `scale(${scale})`;
    });
}

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

    playButton.addEventListener('click', () => {
        const speed = parseFloat(speedInput.value) || 1;
        const startOffset = parseInt(startOffsetInput.value) || 0;

        audio.play();

        setTimeout(() => {
            animateVisemes(sentence, visemeImg, speed);
        }, startOffset);
    });

    videosContainer.appendChild(video);
});

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

topOffsetInput.addEventListener('input', updateVisemeStyles);
leftOffsetInput.addEventListener('input', updateVisemeStyles);
percentageSizeInput.addEventListener('input', updateVisemeStyles);

// Initial application of styles
updateVisemeStyles();
