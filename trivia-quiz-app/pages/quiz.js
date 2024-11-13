import { getQuestions } from "../api.js";
import { getQueryParams } from "../utils.js";
const app = document.getElementById("app");



const quiz = async () => {
    app.innerHTML = "";
    let step = 0;
    window.questions = null;

    const handleQuizAnswer = (e) => {
        const answer = e.target.innerHTML;
        if(questions[step].user_answer){
            if(questions[step]?.user_answer?.includes(answer)) { 
                const newArray = questions[step].user_answer.filter(uAnswer => uAnswer !== answer);
                questions[step].user_answer = newArray;
            }
            else questions[step].user_answer.push(answer);
        }
        else questions[step].user_answer = [answer];
        e.target.className = questions[step]?.user_answer?.includes(answer)  ? "btn btn-success" : "btn btn-primary";
    }

    const renderQuizStep = (questionObj, container) => {
        const question = document.createElement("h3");
        question.innerHTML = `${step+1}. ${questionObj.question}`;
        const answers = [questionObj.correct_answer, ...questionObj.incorrect_answers].shuffle();
        const fragment = document.createDocumentFragment();
        answers.forEach(answer => {
            const answerBtn = document.createElement("button");
            answerBtn.className = questionObj?.user_answer?.includes(answer)  ? "btn btn-success" : "btn btn-primary";
            answerBtn.innerHTML = answer;
            answerBtn.addEventListener("click", handleQuizAnswer);
            fragment.append(answerBtn)
        })
        container.append(question, fragment);

    }

    const getCorrectAnswers = () => {
        const correctAnswers = []
        questions.forEach(questionObj => {
            if(questionObj?.user_answer && (questionObj.user_answer[0] === questionObj.correct_answer))correctAnswers.push(questionObj)
        })
        return correctAnswers;
    }

    const buildQuizStepNavigation = () => {
        const container = document.createElement("div");
        container.className = "d-flex justify-content-center"
        container.innerHTML = `
        <div role="group" class="align-items-center btn-group">
            <button type="button" class="m-2 btn btn-dark" data-name="prev">Prev</button>
            <div class="dropdown">
                <button aria-haspopup="true" aria-expanded="false" id="dropdown-basic" type="button" class="dropdown-toggle btn btn-dark">
                    1
                </button>
                <div x-placement="bottom-start" aria-labelledby="dropdown-basic" class="dropdown-menu" style="position: absolute; top: 0px; left: 0px; margin: 0px; opacity: 0; pointer-events: none;">
                    <a href="#" class="dropdown-item" role="button">1</a>
                    <a href="#" class="dropdown-item" role="button">2</a>
                    <a href="#" class="dropdown-item" role="button">3</a>
                    <a href="#" class="dropdown-item" role="button">4</a>
                    <a href="#" class="dropdown-item" role="button">5</a>
                    <a href="#" class="dropdown-item" role="button">6</a>
                    <a href="#" class="dropdown-item" role="button">7</a>
                    <a href="#" class="dropdown-item" role="button">8</a>
                    <a href="#" class="dropdown-item" role="button">9</a>
                    <a href="#" class="dropdown-item" role="button">10</a>
                </div>
            </div>
            <button type="button" class="m-2 btn btn-dark" data-name="next">
            Next
            </button>
        </div>`;

        const prevBtn = container.querySelector('button[data-name="prev"]');
        prevBtn.addEventListener("click", () => {
            if(step > 0){
                step--;
                const questionContainer = document.querySelector(".quiz-question-container");
                questionContainer.innerHTML = "";
                renderQuizStep(questions[step], questionContainer);
                const info = document.getElementById("info-container");
                renderStepInfo(info);
            }
        })
        const nextBtn = container.querySelector('button[data-name="next"]');
        nextBtn.addEventListener("click", () => {
            if(step === questions.length - 1){
                const showModalEvent = new Event("show-modal-event");
                window.modal = {
                    title: "Do you want to submit your quiz ?",
                    body: `<p>You answered to ${window.questions.filter(question => question?.user_answer).length} questions.</p>`,
                    onSubmit: function (){
                        window.modal.title = "Your answers"
                        window.modal.body = `<p>Corect answers = ${getCorrectAnswers().length}</p>`
                        window.dispatchEvent(showModalEvent);
                    }
                }
                window.dispatchEvent(showModalEvent);
                return;
            }
            step++;
            const questionContainer = document.querySelector(".quiz-question-container");
            questionContainer.innerHTML = "";
            renderQuizStep(questions[step], questionContainer);
            const info = document.getElementById("info-container");
            renderStepInfo(info);
            
        })
        return container;
    }

    const renderStepInfo = (container) => {
        container.innerHTML = `
            <p>Category: <span>${questions[step].category}</span></p>
            <p>Difficulty: <span>${questions[step].difficulty}</span></p>
        `
        return container;
    }

    try {
        const params = getQueryParams(window.location.search);
        const res = await getQuestions(params);
        questions = res.results;
        console.log(questions)
        const container = document.createElement("div");
        container.className = "quiz-question-container";
        renderQuizStep(questions[step], container);
        const quizStepNavigation = buildQuizStepNavigation();
        const infoContainer = document.createElement("div");
        infoContainer.id = "info-container"
        infoContainer.className = "d-flex justify-content-between m-3";
        renderStepInfo(infoContainer);
        
        app.append(container, infoContainer, quizStepNavigation)
    }
    catch(error){
        console.log(error)
    }
}

export default quiz;