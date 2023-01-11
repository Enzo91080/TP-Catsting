function init() {
    darkTheme();
    // Affichage accueil
    recupNbAnnecdote();
    recupNbRaces();
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


