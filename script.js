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
    // Affichage annecdotes

    recupAnecdote();
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
        let arrayPelage = [];
        for (let index = 1; index <= lastpage; index++) {
          let response = await sendRequest(
            "https://catfact.ninja/breeds?page=" + index
          );
  
          response.data.forEach((race) => {
            arrayPelage.push(race.coat);
          });
        }
        // setInterval(() => {
        // }, 2000);
        resolve(arrayPelage);
      });
    });
  }


async function recupPelageFrequent() {
    let typePelage = document.querySelector(".typePelage");
    let arrayPelage = await recupPelage();
    let nombreMax = 1;
    let nombreActuel = 0;
    let lePlusFrequent;
  
    for (let i = 0; i < arrayPelage.length; i++) {
      for (let f = i; f < arrayPelage.length; f++) {
        if (arrayPelage[i] == arrayPelage[f]) {
          nombreActuel++;
        }
        if (nombreMax < nombreActuel) {
          nombreMax = nombreActuel;
          lePlusFrequent = arrayPelage[i];
        }
      }
      nombreActuel = 0;
    }
    typePelage.innerHTML = lePlusFrequent;
  }
  





// Récupération d'une anecdote aléatoire
function recupAnecdote() {
    let buttonGetAnecdote = document.querySelector(".getAnecdote");
    let annecdote = document.querySelector(".anecdoteRandom");
    buttonGetAnecdote.addEventListener("click", () => {
        sendRequest("https://catfact.ninja/fact").then((response) => {
            annecdote.textContent = response.fact;
        });
    });
    
}

  
