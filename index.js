let authorArray;


document.addEventListener("DOMContentLoaded", () => {
    const authorBar = document.querySelector("#author-display")
    getAuthors();

    function getAuthors() {
        fetch("http://localhost:3000/authors")
        .then(r => r.json())
        .then(data => {
            console.log(data);
            authorArray = data;
            renderAuthorImages(authorArray)
        })
    }

    function renderAuthorImages(authorArray) {
        authorBar.innerHTML = authorArray.map(renderEachImage).join("")
    }

    function renderEachImage(author) {
        return `
        <img id=${author.id} class="author-image" src="${author.image}" />
        `
    }

})