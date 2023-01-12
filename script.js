function toggleMobileMenu(menu) {
    menu.classList.toggle("open");
}
function darkTheme() {

    const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark");
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

function init() {
    darkTheme();
    // Affichage accueil
    recupNbAnnecdote();
    recupNbRaces();
    recupPelageFrequent();
}

init();

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

// Récupération du nombre d'anecdotes
function recupNbAnnecdote() {
    sendRequest("https://catfact.ninja/facts").then((response) => {
        let anecdotes = document.querySelector(".nbAnnecdotes");
        nbAnnecdote = response;
        anecdotes.textContent = nbAnnecdote.total;
    });
}

// Récupération du nombre de races
function recupNbRaces() {
    sendRequest("https://catfact.ninja/breeds").then((response) => {
        let races = document.querySelector(".nbRaces");
        nbRaces = response;
        races.textContent = nbRaces.total;
    });
}

async function recupPelage() {
    return new Promise((resolve) => {
      sendRequest("https://catfact.ninja/breeds").then(async (response) => {
        let lastpage = response.last_page;
        let tabPelage = [];
        for (let index = 1; index <= lastpage; index++) {
          let response = await sendRequest(
            "https://catfact.ninja/breeds?page=" + index
          );
  
          response.data.forEach((race) => {
            tabPelage.push(race.coat);
          });
        }
        resolve(tabPelage);
      });
    });
  }


async function recupPelageFrequent() {
    let typePelage = document.querySelector(".typePelage");
    let tabPelage = await recupPelage();
    let nombreMax = 1;
    let nombreActuel = 0;
    let lePlusFrequent;
  
    for (let i = 0; i < tabPelage.length; i++) {
      for (let f = i; f < tabPelage.length; f++) {
        if (tabPelage[i] == tabPelage[f]) {
          nombreActuel++;
        }
        if (nombreMax < nombreActuel) {
          nombreMax = nombreActuel;
          lePlusFrequent = tabPelage[i];
        }
      }
      nombreActuel = 0;
    }
    typePelage.innerHTML = lePlusFrequent;
}
  
