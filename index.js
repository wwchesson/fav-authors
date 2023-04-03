let authorArray;
const authorBar = document.querySelector("#author-display");
const imageDetail = document.querySelector(".image-detail");
const authorDetail = document.querySelector("#author-details");
const videoPlayer = () => document.querySelector("#player");

document.addEventListener("DOMContentLoaded", () => {
  getAuthors();

  function getAuthors() {
    fetch("http://localhost:3000/authors")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        authorArray = data;
        renderAuthorImages(authorArray);
      });
  }

  function renderAuthorImages(authorArray) {
    authorBar.innerHTML = authorArray.map(renderEachImage).join("");
  }

  function renderEachImage(author) {
    return `
        <img id=${author.id} class="author-image" src="${author.image}" />
        `;
  }
});
//DOMContentLoaded ends

document.addEventListener("click", (e) => {
  if (e.target.className === "author-image") {
    const authorToDisplay = authorArray.find(
      (author) => author.id === parseInt(e.target.id)
    );
    const authorBooks = authorToDisplay.books;

    renderAuthorDetails(authorToDisplay, authorBooks);
  }
});

function renderAuthorDetails(author, books) {
  authorDetail.innerHTML = `
  <img class="image-detail" src="${author.image}">
  <h2 class="author-name">${author.name}</h2>
  <h3> Books: </h3>
  ${books.map(renderBooks).join("")}
  <button class="video-button" id=${author.id}>See Lecture</button>
  `;
}

function renderBooks(book) {
  return `
    <h4 class="books">${book}</h4>
    `;
}

document.addEventListener("click", (e) => {
  if (e.target.className === "video-button") {
    const authorVideo = authorArray.find(
      (author) => author.id === parseInt(e.target.id)
    );
    iFrame(authorVideo);
  }
});

function iFrame(author) {
  authorDetail.innerHTML = `
  <iframe id="player" class="inset-0 w-full h-full" frameborder="0" ></iframe>    `;
  videoPlayer().src = `https://www.youtube.com/embed/${extractVideoID(
    author.video
  )}`;
}

function extractVideoID(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}
