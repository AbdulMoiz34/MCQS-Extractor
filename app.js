const inp = document.getElementById("textarea");
const btn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
const mcqsContainer = document.getElementById("mcqs-container");

const mcqsExtractor = () => {
    const questions = [];
    let question = {};
    let options = [];
    const val = inp.value.split("\n");
    let count = 0;
    for (let i = 0; i < val.length; i++) {
        if (val[i] === "") {
            questions.push(question);
            question.options = options;
            question = {};
            options = [];
            count = 0;
        } else {
            if (val[i].includes("?")) {
                question.question = val[i];
            } else {
                count++;
                if (val[i].includes("*")) {
                    const ans = val[i].slice(0, -1);
                    question.ans = ans;
                } else {
                    options.push(val[i]);
                }
            }
        }
    }
    return shuffle(questions);
}

const extractMcqs = (questions) => {
    document.getElementById("results-section").classList.add("active");
    mcqsContainer.innerHTML = "";
    for (let ques of questions) {
        const allOptions = shuffle([...ques.options, ques.ans]);
        mcqsContainer.innerHTML += `<div class="mcq-container">
                    <div class="question">${ques.question}</div>
                    <div class="options">
                        ${allOptions.map((opt, idx) => {
            const isCorrect = opt === ques.ans;
            return `<div class="option ${isCorrect && 'correct-answer'}">${idx + 1}. ${opt}</div>`;
        }).join("")}
                    </div>
                </div>`;
    }
}

const clear = () => {
    inp.value = "";
    mcqsContainer.innerHTML = "";
}

const main = () => {
    const questions = mcqsExtractor();
    extractMcqs(questions);
}

const shuffle = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
}

btn.addEventListener("click", main);
clearBtn.addEventListener("click", clear);