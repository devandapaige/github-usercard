/*
  STEP 1 ✅: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
import axios from "axios";

const cardsClass = document.querySelector(".cards");
axios
  .get("https://api.github.com/users/devandapaige")
  .then((res) => {
    const info = res.data;
    const cardInfo = cardMaker(info);
    cardsClass.appendChild(cardInfo);
  })
  .catch((err) => {
    console.log("error", err);
  });
/*
  STEP 2 ✅: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/
/*
  STEP 4 ✅: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
//using my old TL's username for followers to get more than 3 more cards.
axios
  .get("https://api.github.com/users/ViridityMoon/followers")
  .then((data) => {
    let login = data.login
    login.forEach(data =>{
      axios
        .get(`https://api.github.com/users/${data}`)
        .then((res) => {
          const info = res.data;
          const cardInfo = cardMaker(info);
          cardsClass.appendChild(cardInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  .catch((err) => {
    console.log(err);
  })}
  
/* STEP 3 ✅: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:
    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
    function createCard(gitData) {
      //createing my divs and elements per the above HTML:
      const cardParent = document.createElement("div");
      const profilePic = document.createElement("img");
      const textInfo = document.createElement("div");
      const username = document.createElement("p");
      const location = document.createElement("p");
      const linkText = document.createElement("p");
      const profileLink = document.createElement("a");
      const followers = document.createElement("p");
      const following = document.createElement("p");
      const bio = document.createElement("p");
      //adding class Lists to some of the elements:
      cardParent.classList.add("card");
      textInfo.classList.add("card-info");
      username.classList.add("username");
      //adding source and text to the elements for content:
      profilePic.src = `${gitData.avatar_url}`;
      username.textContent = `${gitData.login}`;
      location.textContent = `Location: ${gitData.location}`;
      linkText.textContent = `Profile: `;
      profileLink.href = `${gitData.html_url}`;
      profileLink.textContent = `${gitData.html_url}`;
      followers.textContent = `Followers: ${gitData.followers}`;
      following.textContent = `Following: ${gitData.following}`;
      bio.textContent = `Bio: ${gitData.bio}`;
      //putting the two divs together:
      cardParent.appendChild(profilePic);
      cardParent.appendChild(textInfo);
      textInfo.appendChild(username);
      textInfo.appendChild(location);
      textInfo.appendChild(linkText);
      //putting the profileLink inline with the p element for profile:
      linkText.appendChild(profileLink);
      textInfo.appendChild(followers);
      textInfo.appendChild(following);
      textInfo.appendChild(bio);
      //returning the cardParent that contains all the data in the Card Marker function:
      return cardParent;
    }