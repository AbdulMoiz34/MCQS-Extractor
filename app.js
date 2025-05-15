const inp = document.getElementById("textarea");
const btn = document.getElementById("submit-btn");

const clickHandler = () => {
    const questions = [];
    let question = {};
    const val = inp.value.split("\n");
    let count = 0;
    for (let i = 0; i < val.length; i++) {
        if (val[i] === "") {
            questions.push(question);
            question = {};
            count = 0;
        } else {
            if (val[i].includes("?")) {
                question.question = val[i];
            } else {
                count++;
                if (val[i].includes("*")) {
                    const ans = val[i].slice(0, -1);
                    question.ans = ans;
                    question[`option${count}`] = ans;
                } else {
                    question[`option${count}`] = val[i];
                }
            }
        }
    }

    console.log(questions);
}

btn.addEventListener("click", clickHandler);