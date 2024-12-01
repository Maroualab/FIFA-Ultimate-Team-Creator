const positions = document.querySelectorAll(".position");
const playerList = document.querySelector("#player-list");
let playersData = [];
const replacementList = document.getElementById("replacement-players");
let selectedBadge = null;
// const cards = document.querySelectorAll(".position-container");

fetch("players.json")
  .then((response) => response.json())
  .then((data) => {
    playersData = data.players || [];
  })
  .catch((error) => console.error("Error loading JSON:", error));

positions.forEach((position) => {
  position.addEventListener("click", (event) => {
    selectedBadge = event.currentTarget; 
    const positionName = position.getAttribute("data-position");
    document.querySelector("#position").value = positionName;
  });
});

document
  .getElementById("add-player-form")
  .addEventListener("submit", (event) => {
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

function displayPlayer(player , event) {
  const positionInput = document.querySelector("#position").value;

  const validPositions = ["GK", "LB", "CB", "RB", "CM", "LW", "ST", "RW"];

  isValid = false;
  for (let position of validPositions) {
    if (position === positionInput) {
      isValid = true; 
      break; 
    }
  }

  if (!isValid) {
    alert("Please input a valid position!");
    return; 
  }

  if (!selectedBadge) {
    alert("Please click on a position card before adding a player!");
    return;
  }

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
  

  


  if (selectedBadge.querySelector(".player-card")) {
    alert("This position is already filled!");
    replacementList.appendChild(playerCard);
  } else {
    selectedBadge.appendChild(playerCard);
  }

  deleteIcon.addEventListener("click", () => {
    if (selectedBadge.contains(playerCard)) {
      selectedBadge.removeChild(playerCard);
    }
  });

  
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



document.querySelector("#reset-button").addEventListener("click", () => {
  location.reload();
});


// const cards = document.querySelectorAll(".position-container");
// const badgeIcons = document.querySelectorAll(".badge-icons"); // Select all the badge icon containers

// // Assuming you want to show/hide the badge-icons based on mouse events
// cards.forEach((card, index) => {
//   card.addEventListener("mousemove", () => {
//     badgeIcons[index].style.display = 'block'; // Display badge icons on mouse over
//   });

//   card.addEventListener("mouseout", () => {
//     badgeIcons[index].style.display = 'none'; // Hide badge icons on mouse out
//   });
// });

// // Ensure badge icons are hidden by default
// badgeIcons.forEach(icon => {
//   icon.style.display = 'none'; // Initially hide all badge icons
// });


  