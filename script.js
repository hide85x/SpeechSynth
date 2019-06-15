

const msg = new SpeechSynthesisUtterance(); //< rzecz do powiedzenia 
let synth = window.speechSynthesis;

const voicesDropdown = document.querySelector('[name="voice"]');
const voiceSelect= document.querySelector('select')
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakBtn = document.querySelector('#speak');
const stopBtn = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;
function firefoxVoice(){
    voices=synth.getVoices()
    msg.voice= voices[0]
    return voices
}
firefoxVoice()
console.log(voices)



function populateVoice() {
    voices = this.getVoices(); //< metoda na speechSynhtesis, dodaje nam voices(ze swoimi propsami, np.name) do naszego array
    console.log(voices)
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang}) </option>`) //arrow func nie zadziała opakowana w {}
.join('')
}


// function for FIREFOX
// function populateVoice(){
//     voices= synth.getVoices();
//     let selectedIndex= voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
//     voiceSelect.innerHTML='';
//     for (i= 0; i< voices.length; i++) {
//         let option= document.createElement('option');
//         option.textContent= voices[i].name + ' (' + voices[i].lang + ' )';
//         if (voices[i].default) {
//             option.textContent+= ' -- DEFAULT';
//         }
//     option.setAttribute('data-lang', voices[i].lang);
//     option.setAttribute('data-name', voices[i].name)
//     }
//     voiceSelect.selectedIndex= selectedIndex
// }

// populateVoice();
// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = populateVoice;
// }




function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }
function toggle(startOver = true) {
    console.log(msg)
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg)
    }
}
function setOption() {
    console.log(this.name, this.value)
    msg[this.name] = this.value;
    toggle()
    console.log(this)
}

// speechSynthesis to obiekt któremu podajemy nasz msg, ma opcje talk, potrzebuje mieć voices załadowane
speechSynthesis.addEventListener('voiceschanged', populateVoice);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakBtn.addEventListener('click', firefoxVoice); // nie wywoływać funkcji!!!! toggle()
stopBtn.addEventListener('click', () => toggle(false));


