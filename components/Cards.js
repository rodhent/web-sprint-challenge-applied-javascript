// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const parentCard = document.querySelector(".cards-container");

axios
  .get("https://lambda-times-api.herokuapp.com/articles")
  .then((response) => {
    console.log("card response", response);
    console.log("articles", response.data.articles);

    let articles = Object.values(response.data.articles);

    articles.forEach((element) => {
      console.log("arr articles", element);

      element.forEach((item) => {
        console.log("single article", item);
        parentCard.appendChild(cardComp(item));
      });
    });
  })

  .catch((err) => {
    console.log("error ", err);
  });

const cardComp = (object) => {
  const newCard = document.createElement("div");
  const headline = document.createElement("div");
  const authorContainer = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const authorName = document.createElement("span");

  headline.textContent = object.headline;
  img.src = object.authorPhoto;
  authorName.textContent = object.authorName;

  newCard.classList.add("card");
  headline.classList.add("headline");
  authorContainer.classList.add("author");
  imgContainer.classList.add("img-container");

  newCard.appendChild(headline);
  newCard.appendChild(authorContainer);
  authorContainer.appendChild(imgContainer);
  imgContainer.appendChild(img);
  authorContainer.appendChild(authorName);

  headline.addEventListener("click", (event) => {
    console.log(headline.textContent);
  });

  return newCard;
};
