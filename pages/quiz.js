import { getQueryParams } from "../utils.js";
const app = document.getElementById("app");


const quiz = () => {
    app.innerHTML = "";
    try{
        const params = getQueryParams(window.location.search);
        console.log(params)
        const title = document.createElement("h1");
        title.innerText = "Quiz Test";
        app.append(title)
    }
    catch(error){
        console.log(error)
    }
}

export default quiz;