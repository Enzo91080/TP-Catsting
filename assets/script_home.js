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

/* Affichage accueil */

// Récupération du nombre d'anecdotes
function recupNbAnecdote() {
    sendRequest("https://catfact.ninja/facts").then((response) => {
        let anecdotes = document.querySelector(".nbAnecdotes"); // On récupère la balise où on va afficher le nombre d'anecdotes
        nbAnecdote = response; // On stocke la réponse dans une variable
        anecdotes.textContent = nbAnecdote.total; // On affiche le nombre d'anecdotes
        console.log(nbAnecdote.total);
    });
}

// Récupération du nombre de races
function recupNbRaces() {
    sendRequest("https://catfact.ninja/breeds").then((response) => {
        let races = document.querySelector(".nbRaces"); // On récupère la balise où on va afficher le nombre
        nbRaces = response; // On stocke la réponse dans une variable
        races.textContent = nbRaces.total; // On affiche le nombre de races
        console.log(nbRaces.total);
    });
}

// Récupération de la race
async function recupPelage() {
    return new Promise((resolve) => {
        sendRequest("https://catfact.ninja/breeds").then(async (response) => {
            let lastpage = response.last_page; // On récupère le nombre de pages
            let tabPelage = []; // On crée un tableau qui va contenir les pelages
            for (let index = 1; index <= lastpage; index++) {
                // On parcourt toutes les pages
                let response = await sendRequest( 
                    "https://catfact.ninja/breeds?page=" + index
                ); // On récupère les données de la page
                // Le await sert à attendre que la requête soit terminée avant de passer à la suite

                response.data.forEach((race) => {
                    //On parcourt le tableau
                    tabPelage.push(race.coat); // On ajoute le pelage dans le tableau
                });
            }
            resolve(tabPelage);
        });
    });
}

// Récupération du pelage le plus fréquent
async function recupPelageFrequent() {
    let typePelage = document.querySelector(".typePelage");
    let tabPelage = await recupPelage();
    let nombreMax = 1;
    let nombreActuel = 0;
    let lePlusFrequent;

    for (let i = 0; i < tabPelage.length; i++) {
        // On parcourt le tableau
        for (let f = i; f < tabPelage.length; f++) {
            // On compare chaque élément avec les autres
            if (tabPelage[i] == tabPelage[f]) {
                // Si les éléments sont identiques
                nombreActuel++; // On incrémente le compteur
            }
            if (nombreMax < nombreActuel) {
                // Si le compteur est supérieur au nombre max
                nombreMax = nombreActuel; // On remplace le nombre max par le compteur
                lePlusFrequent = tabPelage[i]; // On remplace le plus fréquent par l'élément courant
            }
        }
        nombreActuel = 0; // On remet le compteur à 0 pour le prochain élément
    }
    typePelage.innerHTML = lePlusFrequent; // On affiche le plus fréquent
    console.log(lePlusFrequent); // On
}


// Synchrone
function init() {
    recupNbAnecdote();
    recupNbRaces();
    recupPelageFrequent();
}

init();