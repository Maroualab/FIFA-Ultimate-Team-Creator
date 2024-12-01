const positions = document.querySelectorAll(".position");
const playerList = document.querySelector("#player-list");
let playersData = [];
const replacementList = document.getElementById("replacement-players");
let selectedBadge = null;
let editMode = false;
let playerEdit = null;



fetch("players.json")
  .then((response) => response.json())
  .then((data) => {
    playersData = data.players || [];
    playersData.forEach(player => displayPlayer(player));
  })
  .catch((error) => console.error("Error loading JSON:", error));



positions.forEach((position) => {
  position.addEventListener("click", (event) => {
    selectedBadge = event.currentTarget; 
    const positionName = position.getAttribute("data-position");
    document.querySelector("#position").value = positionName;
  });
});


document.getElementById("add-player-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const positionInput = document.querySelector("#position").value.trim(); 
    const validPositions = ["GK", "LB", "CB", "RB", "CM", "LW", "ST", "RW"];
  
    //make sure to input a existing position
    if (!validPositions.includes(positionInput)) {
      alert("Please input a valid position!");
      return;
    }
  
    //make to  click a badge 
    if (!selectedBadge) {
      alert("Please click on a position card before adding a player!");
      return;
    }

    const newPlayer = {
      name: document.getElementById("name").value,
      position: positionInput,
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

function createPlayerCard(player) {
  const playerCard = document.createElement("div");
  playerCard.classList.add("player-card");

  const playerPhoto = document.createElement("img");
  playerPhoto.src = player.photo;
  playerPhoto.alt = player.name;
  playerPhoto.classList.add("player-photo");

  const playerName = document.createElement("h3");
  playerName.textContent = player.name;

  const playerPosition = document.createElement("p");
  playerPosition.textContent = `Position: ${player.position}`;

  const playerFlag = document.createElement("img");
  playerFlag.src = player.flag;
  playerFlag.alt = "Country";
  playerFlag.classList.add("player-flag");

  const playerLogo = document.createElement("img");
  playerLogo.src = player.logo;
  playerLogo.alt = "Club";
  playerLogo.classList.add("player-logo");

  const statsList = document.createElement("ul");

  const paceItem = document.createElement("li");
  paceItem.textContent = `Pace: ${player.pace}`;
  statsList.appendChild(paceItem);

  const shootingItem = document.createElement("li");
  shootingItem.textContent = `Shooting: ${player.shooting}`;
  statsList.appendChild(shootingItem);

  const passingItem = document.createElement("li");
  passingItem.textContent = `Passing: ${player.passing}`;
  statsList.appendChild(passingItem);

  const dribblingItem = document.createElement("li");
  dribblingItem.textContent = `Dribbling: ${player.dribbling}`;
  statsList.appendChild(dribblingItem);

  const defendingItem = document.createElement("li");
  defendingItem.textContent = `Defending: ${player.defending}`;
  statsList.appendChild(defendingItem);

  const physicalItem = document.createElement("li");
  physicalItem.textContent = `Physical: ${player.physical}`;
  statsList.appendChild(physicalItem);

  const badgeIcons = document.createElement("span");
  badgeIcons.classList.add("badge-icons");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("delete-icon", "icon");
  deleteIcon.textContent = "❌";

  const updateIcon = document.createElement("i");
  updateIcon.classList.add("update-icon", "icon");
  updateIcon.textContent = "✎";

  badgeIcons.appendChild(deleteIcon);
  badgeIcons.appendChild(updateIcon);

  playerCard.appendChild(playerPhoto);
  playerCard.appendChild(playerName);
  playerCard.appendChild(playerPosition);
  playerCard.appendChild(playerFlag);
  playerCard.appendChild(playerLogo);
  playerCard.appendChild(statsList);
  playerCard.appendChild(badgeIcons);

  return playerCard;
}


function displayPlayer(player) {

  const playerCard = createPlayerCard(player);

  if (selectedBadge.querySelector(".player-card")) {
    const confirmation = confirm("This position is already filled. Do you want to replace the existing player?");
    

    if (confirmation) {
      const existingPlayerCard = selectedBadge.querySelector(".player-card");
      selectedBadge.removeChild(existingPlayerCard);
      selectedBadge.appendChild(playerCard);
    } else  {
      replacementList.appendChild(playerCard);
    }
  } else {
    selectedBadge.appendChild(playerCard);
  }

  const deleteIcon = playerCard.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", () => {
    if (selectedBadge.contains(playerCard)) {
      selectedBadge.removeChild(playerCard);
    }
  });

  const updateIcon = playerCard.querySelector(".update-icon");
  updateIcon.addEventListener("click", () => updateCard(player, playerCard));

  selectedBadge = null;
}

  document.querySelectorAll('.playerCard').forEach(card => {
    const icon = card.querySelector('.icon');
    
    card.addEventListener('mouseover', () => {
      icon.style.display = 'block'; 
    });
    
    card.addEventListener('mouseout', () => {
      icon.style.display = 'none'; 
    });
  });
  


function updateCard(player, playerCard) {
  document.getElementById("name").value = player.name;
  document.getElementById("position").value = player.position;
  document.getElementById("photo").value = player.photo;
  document.getElementById("flag").value = player.flag;
  document.getElementById("logo").value = player.logo;
  document.getElementById("pace").value = player.pace;
  document.getElementById("shooting").value = player.shooting;
  document.getElementById("passing").value = player.passing;
  document.getElementById("dribbling").value = player.dribbling;
  document.getElementById("defending").value = player.defending;
  document.getElementById("physical").value = player.physical;

  document.getElementById("add-player-form").querySelector("#add-player-button").textContent = "Save";
  editMode = true;
  playerEdit = { player, playerCard }; 
}




document.querySelector("#reset-button").addEventListener("click", () => {
  location.reload();
});


