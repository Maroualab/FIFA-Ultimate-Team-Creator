const positions = document.querySelectorAll(".position");
const playerList = document.querySelector("#player-list");
let playersData = [];

fetch("players.json")
  .then((response) => response.json())
  .then((data) => {
    playersData = data.players || [];
  })
  .catch((error) => console.error("Error loading JSON:", error));


positions.forEach((position) => {
  position.addEventListener("click", () => {
    const positionName = position.getAttribute("data-position");
    document.querySelector("#position").value = positionName;
  });
});


document.getElementById("add-player-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const newPlayer = {
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    photo: document.getElementById("photo").value,
    flag: document.getElementById("flag").value,
    logo: document.getElementById("logo").value,
    pace: document.getElementById("pace").value,
    shooting: document.getElementById("shooting").value,
    passing: document.getElementById("passing").value,
    dribbling: document.getElementById("dribbling").value,
    defending: document.getElementById("defending").value,
    physical: document.getElementById("physical").value,
  };

  displayPlayer(newPlayer);

  document.getElementById("add-player-form").reset();
});


function displayPlayer(player) {
  const playerCard = document.createElement("div");
  playerCard.classList.add("player-card");

  playerCard.innerHTML = `
    <img src="${player.photo}" alt="${player.name}" class="player-photo" />
    <h3>${player.name}</h3>
    <p>Position: ${player.position}</p>
    <img src="${player.flag}" alt="Country" class="player-flag" />
    <img src="${player.logo}" alt="Club" class="player-logo" />
    <ul>
      <li>Pace: ${player.pace}</li>
      <li>Shooting: ${player.shooting}</li>
      <li>Passing: ${player.passing}</li>
      <li>Dribbling: ${player.dribbling}</li>
      <li>Defending: ${player.defending}</li>
      <li>Physical: ${player.physical}</li>
    </ul>
  `;

  playerList.appendChild(playerCard);


//   const playerBadges = document.querySelectorAll(".position-container");
//   playerBadges.forEach ((badge) =>{
//     badge = 
//   }
// )
  position.appendChild(playerCard);
}


