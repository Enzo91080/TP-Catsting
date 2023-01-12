/* Affichage races */
const selectionPays = document.querySelector(".selectionPays");
const selectionPelage = document.querySelector(".selectionPelage");
const listeRaces = document.querySelector(".listeRaces");
const resultat = document.querySelector(".resultats");

async function recupRaces() {
    return new Promise((resolve) => {
        fetch("https://catfact.ninja/breeds?limit=100")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                resolve(result.data);
            })
            .catch((error) => console.log("error", error));
    });
}

function listerRace(breedsElement) {
    // Affichage du nombre de résultats
    if (breedsElement.length == 0) {
        resultat.textContent = `Aucun résultat`;
    } else if (breedsElement.length > 1) {
        resultat.textContent = `${breedsElement.length} résultats`;
    } else {
        resultat.textContent = `${breedsElement.length} résultat`;
    }

    listeRaces.innerHTML = "";
    breedsElement.forEach((element) => {
        const breed = document.createElement("li");
        breed.textContent = element.breed;
        listeRaces.appendChild(breed);
    });
}

function paysDansSelect(dataElement) {
    let country = [];
    dataElement.forEach((element) => {
        let countryAlreadyInArray = country.includes(
            element.country.toString()
        );
        if (!countryAlreadyInArray) {
            country.push(element.country.toString());
            const option = document.createElement("option");
            option.textContent = element.country.toString();
            option.value = element.country.toString();
            selectionPays.appendChild(option);
        }
    });
}

function pelageDansSelect(dataselectionPelage) {
    let coat = []; // Création d'un tableau vide
    dataselectionPelage.forEach((element) => {
        // Pour chaque élément du tableau
        let coatAlreadyInArray = coat.includes(element.coat.toString()); // On vérifie si l'élément est déjà dans le tableau
        if (!coatAlreadyInArray) {
            // Si l'élément n'est pas dans le tableau
            coat.push(element.coat.toString()); // On l'ajoute
            const option = document.createElement("option"); // On crée une option
            option.textContent = element.coat.toString(); // On lui donne le texte
            option.value = element.coat.toString(); // On lui donne la valeur
            selectionPelage.appendChild(option); // On l'ajoute à la liste
        }
    });
}

async function filtrageRaceParPays() {
    let races = await recupRaces(); //On récupère les races de chats
    let racesFiltered = []; //On crée un tableau vide
    if (selectionPays.value === "default") { //Si la valeur de la liste est "default"
        racesFiltered = races; //On affiche
    } else { //Sinon
        let data = races.filter( //On filtre
            (element) => element.country == selectionPays.value 
        );
        racesFiltered = data;
    }

    listerRace(racesFiltered);
}

async function filtrageParPelage() {
    let coat = await recupRaces();
    let filtrePelage = [];
    let countrySelected = selectionPays.value;
    if (selectionPelage.value === "default") {
        filtrePelage = coat;
    } else {
        let data = coat.filter(
            (element) => element.coat == selectionPelage.value
        );
        if (countrySelected !== "null") {
            filtrePelage = data.filter(
                (element) => element.country == countrySelected
            );
            console.log("filtrePelage = ", filtrePelage);
        } else {
            filtrePelage = data;
        }
    }
    listerRace(filtrePelage);
}


//Asynchrone
async function init() {
    let breeds = await recupRaces();
    paysDansSelect(breeds);
    pelageDansSelect(breeds);
    listerRace(breeds);
    filtrageParPelage(breeds);
}

init();
