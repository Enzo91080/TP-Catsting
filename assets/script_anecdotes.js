

/* Affichage annecdotes */

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


    // Affichage anecdotes
    recupAnecdote();