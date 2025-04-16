import { signupEvents } from "./signupevents.ts";
import { dashboardView } from "./views/dashboard.ts";
import { pongView } from "./views/pong.ts";
import { playView } from "./views/play.ts";
import { profileView } from "./views/profile.ts";
import { signupView } from "./views/signup.ts";
import { loginView } from "./views/login.ts";
import { loginEvents } from "./loginevents.ts";
import { initializeDashboard } from "./dashboardEvents.ts";
import { initPong } from "./ponggame.ts";


const routes = {
    index : "/",
    dashboard : "/dashboard",
    profile : "/profile",
    play : "/play",
    login : "/login",
    signup : "/signup"
}

// Gestion des boutons forward et backward
window.addEventListener("popstate", () => {
    router();
});

//On injecte le contenu selon le path sur lequel on se trouve.
export async function router(): Promise<void> {
    //On injecte dans changingArea pour garder la navbar sur la gauche dans le body.
    const changingArea = document.getElementById("changingArea");

    if (!changingArea)
    {
        console.log("Could not find changingArea");
        return;
    }

    console.log("Current path = " + location.pathname);
    switch (location.pathname) {
        case routes.index:
            changingArea.innerHTML = loginView();
            loginEvents();
            break;

        case routes.login:
            changingArea.innerHTML = loginView();
            loginEvents();
            break;

        case routes.signup:
            changingArea.innerHTML = signupView();
            signupEvents();
            break;

        case routes.dashboard:
            changingArea.innerHTML = dashboardView();
            initializeDashboard();
            break ;

        case routes.profile:
            changingArea.innerHTML = profileView();
            break ;

        case routes.play:
            changingArea.innerHTML = pongView();
            initPong();
            break ;

        default:
            break ;
    }
}
