const searchBtn = document.querySelector(".btn1");
const deleteBtn = document.querySelector(".btn2");

const input = document.querySelector("#input");
const wordElem = document.querySelector("#word");
const meaningBtn = document.querySelector(".meaning span");
const synonymspan1 = document.querySelector(".synonym #span0");
const synonymspan2 = document.querySelector(".synonym #span1");
const synonymspan3 = document.querySelector(".synonym #span2");
const synonymspan4 = document.querySelector(".synonym #span3");

let wordspan = document.querySelector(".word span");
let volumeBtn = document.querySelector(".volume");


async function fetchApi(word) {
    // const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/<word>${word}`
    try {
        const res = await fetch(url);
        const result = res.json();
    
            if(result && result[0] && result[0].word) {
                wordElem.textContent = result[0].word;
                wordspan.textContent = result[0].meanings[0].partOfSpeech + `/'${word}/`;
                meaningBtn.textContent = result[0].meanings[0].definitions[0].definition;

                synonymspan1.textContent = result[0].meanings[0].synonyms[0] + ", ";
                synonymspan2.textContent = result[0].meanings[0].synonyms[1] + ", ";
                synonymspan3.textContent = result[0].meanings[0].synonyms[2] + ", ";
                synonymspan4.textContent = result[0].meanings[0].synonyms[3];

                if(result[0].meanings[0].synonyms[0] === undefined) {
                    synonymspan1.textContent = "Not Found!";
                    synonymspan2.textContent = "";
                    synonymspan3.textContent = "";
                    synonymspan4.textContent = "";
                }
                const audioURL = result[0].phonetics[0].audio;
                if(audioURL) {
                    volumeBtn.onclick = () => {
                        let audio = new Audio(audioURL);
                        audio.play();
                    };
                } else {
                    volumeBtn.onclick = null;
                }

                console.log(result);
            } else {
                wordElem.textContent = "Not Found!"
            }
        } catch (err) {
            console.log("Error fetching the word: ", err);
            word.textContent = "Word not found";
        }
        
}

input.addEventListener("keyup", (e) => {
    if(e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);   
    }
});
searchBtn.addEventListener("click", () => {
    if(input.value) {
        fetchApi(input.value);
    }
});
deleteBtn.addEventListener("click", () => {
    if(input.value) {
        input.value = "";
        wordElem.textContent = "";
    }
});
