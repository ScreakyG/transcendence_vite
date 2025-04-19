import { signupEvents } from "./signupevents.ts";
import { dashboardView } from "./views/dashboard.ts";
import { pongView } from "./views/pong.ts";
import { playView } from "./views/play.ts";
import { profileView } from "./views/profile.ts";
import { signupView } from "./views/signup.ts";
import { loginView } from "./views/login.ts";
import { loginEvents } from "./loginevents.ts";
import { initializeDashboard } from "./dashboardEvents.ts";
import { initPong, stopGame, stopPong } from "./ponggame.ts";
import { twofaView } from "./views/2fa.ts";
import { init2fa } from "./2faevents.ts";
import { isUserAuth } from "./auth.ts";


const routes = {
    index : "/",
    dashboard : "/dashboard",
    profile : "/profile",
    play : "/play",
    login : "/login",
    signup : "/signup",
    twofa: "/twofa"
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
            const isAuth: boolean = await isUserAuth()// Test if user is logged to protect access to views (just testing).
            console.log(isAuth);
            if (isAuth === false)
            {
                console.log("User is not logged, redirecting to login");
                window.history.pushState(null, "", "/");
                router();
                return;
            }
            changingArea.innerHTML = dashboardView();
            initializeDashboard();
            stopPong();//reset pong
            break ;

        case routes.profile:
            changingArea.innerHTML = profileView();
            stopPong();//reset pong
            break ;

        case routes.play:
            changingArea.innerHTML = pongView();
            initPong();
            break ;

        case routes.twofa:
            changingArea.innerHTML = twofaView();
            init2fa();
            break ;

        default:
            break ;
    }
}
