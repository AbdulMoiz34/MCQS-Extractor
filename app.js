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
                    options.push(ans);
                } else {
                    options.push(val[i]);
                }
            }
        }
    }

    return questions;
}

const extractMcqs = (questions) => {
    document.getElementById("results-section").classList.add("active");
    mcqsContainer.innerHTML = "";
    for (let question of questions) {
        mcqsContainer.innerHTML += `<div class="mcq-container">
            <div class="question">Q1: ${question.question}</div>
            <div class="options">
                <div class="option correct-answer">A. ${question.ans}</div>
                ${question.options.map((opt, idx) => {
            return `<div class="option">${idx + 1}. ${opt}</div>`
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

btn.addEventListener("click", main);
document.getElementById("clear-btn").addEventListener("click", clear);