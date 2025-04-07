import { closePopup } from "./popup.js";
import { registerPopup } from "./popup.js";
import { dashboardView } from "./views/dashboard.js";
import { landingView } from "./views/landing.js";
import { playView } from "./views/play.js";
import { profileView } from "./views/profile.js";
import { handleLinks } from "./main.js";

const routes = {
    index : "/",
    dashboard : "/dashboard",
    profile : "/profile",
    play : "/play"
}

// On recupere le body pour injecter le contenu dans cette partie.
const body = document.querySelector("body");

// Gestion des boutons forward et backward
window.addEventListener("popstate", () => {
    router();
});

//On injecte le contenu selon le path sur lequel on se trouve.
export async function router() {
    //On injecte dans changingArea pour garder la navbar sur la gauche dans le body.
    const changingArea = document.getElementById("changingArea");
    console.log(changingArea);

    console.log(location.pathname);
    switch (location.pathname) {
        case routes.index:
            body.innerHTML = landingView();
            registerPopup();
            closePopup();
            handleLinks();
            break;

        case routes.dashboard:
            body.innerHTML = dashboardView();
            handleLinks();
            break ;

        case routes.profile:
            changingArea.innerHTML = profileView();
            // handleLinks();
            break ;

        case routes.play:
            changingArea.innerHTML = playView();
            // handleLinks();
            break ;

        default:
            break ;
    }
}
