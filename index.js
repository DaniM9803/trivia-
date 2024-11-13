import home from "./pages/home.js";
import quiz from "./pages/quiz.js";

window.addEventListener("load", async () => {

    window.addEventListener("popstate", (event) => { 
        console.log("popstate")
        const location = window.location.pathname;
        switch(location){
            case "/":
                home();
                break;
            case "/quiz":
                quiz();
                break;
            default:
                home();
                break;
        }
    });
    
    home();
})