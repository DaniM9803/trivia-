import { formShape } from "../data.js";
import { getCategories, requestToken, resetToken } from "../api.js";
import { navigate } from "../router.js";

const app = document.getElementById("app");

const home = async () => {
    app.innerHTML = "";
    const buildForm = (shape, handler, liveValidator) => {
        const formElem = document.createElement("form");
        formElem.addEventListener("submit", handler);
        formElem.className = "form-home";
    
        shape.forEach(elem => {
            if(elem.inputType === "text"){
                const input = document.createElement("div");
                input.className = "form-input-container";
                input.innerHTML = `
                    <label>${elem.label}</label>
                    <input class=${elem.className} type="text" placeholder=${elem?.placeholder || ""}>
                `
                const textInput = input.querySelector('input');
                textInput.addEventListener("input", liveValidator);
                formElem.append(input);
            }
            else if(elem.inputType === "select"){
                const input = document.createElement("div");
                input.className = "form-input-container"
                input.innerHTML = `
                    <label>${elem.label}</label>
                    <select class=${elem.className}>
                        ${elem.options.map(opt => {
                            return `<option value=${opt.value}>${opt.label}</option>`
                        })}
                    </select>
                `
                const selectInput = input.querySelector("select");
                selectInput.addEventListener("change", liveValidator);
                formElem.append(input);
            }
        })
        const submitBtn = document.createElement("button");
        submitBtn.className = "btn btn-primary mt-5";
        submitBtn.type = "submit";
        submitBtn.innerText = "Start Quiz";
        submitBtn.disabled = true;
        formElem.append(submitBtn);
        return formElem;
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const amount = e.target[1].value;
        const difficulty = e.target[2].value;
        const type = e.target[3].value;
        const category = e.target[4].value;
        navigate(`/quiz?name=${name}&amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`);
       
        const event = new Event("popstate");
        window.dispatchEvent(event);
    }
    
    const liveValidation = (event) => {
        const submitBtn = document.querySelector('form>button[type="submit"]');
        const value = event.target.value;
        const rgx = /^[A-Za-z]+$/;
        if(event.target.type === "text"){
            submitBtn.disabled = (value === "" || !rgx.test(value));
        }
    }

    try{
        const res = await getCategories();
        const categories = res.trivia_categories.map(catObj => ({value: catObj.id, label: catObj.name}));
        
        const categoryInputObj = formShape.find(elem => elem.label === "Select Category");
        categoryInputObj.options = [{value: "Any", label: "Any"}, ...categories];
        const form = buildForm(formShape, submitHandler, liveValidation);
        app.append(form);
        const storedToken = localStorage.getItem("token");
        await resetToken(storedToken);
        const newTokenObj = await requestToken();
        localStorage.setItem("token", newTokenObj.token);
    }
    catch(error){
        console.log(error)
    }
}

export default home;