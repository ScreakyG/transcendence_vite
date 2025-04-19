import { router } from "./router";



export async function isUserAuth():Promise<boolean> {
    // Remplacer par un call a l'API.
    // let isLogged: boolean = true; // A enlever.

    // if (isLogged)
    // {
    //     initLogoutButton();
    // }

    try
    {
        const res = await fetch("https://reqres.in/api/users", {
            method: "GET",
            headers: {},
            // credentials: "include"
        });

        if (!res.ok)
        {
            console.log("User is NOT LOGGED");
            return (false);
        }
        console.log("User is LOGGED");
        // const user = await res.json();
        initLogoutButton();
        return (true);
    }
    catch(error)
    {
        console.error("Error while Auth fecthing API");
        return (false);
    }
}


export async function initLogoutButton(): Promise<void> {

    let logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;

    if (logoutBtn)
        return ;

    logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.type = "button";
    logoutBtn.className = "border-black border text-center p-7 cursor-pointer";
    logoutBtn.innerText = "LOGOUT";

    const navbarElem = document.getElementById("navbar-box");
    navbarElem?.appendChild(logoutBtn);


    logoutBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        //Ici faire le call a l'API pour vraiment deconnecter et clear les cookies.
        try
        {
            const res = await fetch("https://reqres.in/api/users", {
                method: "POST",
                headers: {},
                // credentials: "include" // Rajouter pour le vrai call.
            });

            if (!res.ok)
            {
                console.error("API Returned with 500 status code, error");
                return ;
            }
        }
        catch(error)
        {
            console.error("Logout API call failed");
            return ;
        }

        navbarElem?.removeChild(logoutBtn);
        window.history.pushState(null, "", "/");
        router();
    })
}
