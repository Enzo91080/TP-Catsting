function toggleMobileMenu(menu) {
    menu.classList.toggle("open");
}
function darkTheme() {
    const body = document.querySelector("body"),
        nav = document.querySelector("nav"),
        modeToggle = document.querySelector(".dark-light");

    let getMode = localStorage.getItem("mode");
    let elements = document.querySelectorAll("body, nav, .autreElement");

    if (getMode && getMode === "dark-mode") {
        elements.forEach((element) => {
            element.classList.add("dark");
        });
    }

    // js code to toggle dark and light mode
    modeToggle.addEventListener("click", () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");

        // js code to keep user selected mode even page refresh or file reopen
        if (!body.classList.contains("dark")) {
            localStorage.setItem("mode", "light-mode");
        } else {
            localStorage.setItem("mode", "dark-mode");
        }
    });
}

darkTheme();

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        let requete = new XMLHttpRequest();
        requete.open("GET", url);
        requete.onload = function () {
            if (requete.status === 200) {
                let response = JSON.parse(requete.responseText);
                resolve(response);
            } else {
                reject("Une erreur est survenue");
            }
        };
        requete.send();
    });
}
