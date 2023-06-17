const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled
}

// Passing Jokes to VoicsRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'a69fae4a9f2a43a48d545160ab240ed0',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get jokes from Jokes API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // catch error here
        console.log('Whoops', error);

    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);