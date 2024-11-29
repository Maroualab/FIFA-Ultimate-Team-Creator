document.addEventListener("DOMContentLoaded", () => {
    const positions = document.querySelectorAll(".position");
    const replacementPool = document.querySelector(".replacement-players");
    const playerSelection = document.querySelector("#player-selection");

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
        assignPlayerToPosition(position, positionName);
      });
    });
  

    //function to display players in section div 
    function assignPlayerToPosition(positionElement, positionName) {
      const availablePlayers = playersData.filter(
        (player) => player.position === positionName
      );
  
      if (availablePlayers.length === 0) {
        alert("No players available for this position!");
        return;
      }
  
      createCard(availablePlayers);
      addDragEvents(positionElement);
    }
    
  // create the drag and drop and then add the function to the required functionnalities 
    // function addDragEvents(element) {
    //     let draggedPlayer = null;


    //   element.addEventListener("dragstart", () => {
    //     draggedPlayer = element;
    //   });
  
    //   element.addEventListener("dragover", (event) => {
    //     event.preventDefault();
    //   });
  
    //   element.addEventListener("drop", (event) => {
    //     event.preventDefault();
    //     if (draggedPlayer && draggedPlayer !== element) {
    //       const tempContent = element.innerHTML;
    //       element.innerHTML = draggedPlayer.innerHTML;
    //       draggedPlayer.innerHTML = tempContent;
  
    //       element.setAttribute("draggable", "true");
    //       draggedPlayer.setAttribute("draggable", "true");
    //     }
    //   });
  
    //   element.addEventListener("dragend", () => {
    //     draggedPlayer = null;
    //   });
    // }

//     function addDragEvents(element) {
//   let draggedPlayer = null;
//   let draggedPlayerIndex = null;

//   element.addEventListener("dragstart", (event) => {
//     draggedPlayer = event.target;
//     draggedPlayerIndex = [...positions].indexOf(draggedPlayer); // Find the index of the dragged player
//   });

//   element.addEventListener("dragover", (event) => {
//     event.preventDefault();
//   });

//   element.addEventListener("drop", (event) => {
//     event.preventDefault();

//     const droppedPlayer = event.target;
//     const droppedPlayerIndex = [...positions].indexOf(droppedPlayer); // Find the index of the dropped player

//     if (draggedPlayer && draggedPlayer !== droppedPlayer) {
//       // Swap visual content
//       const tempContent = droppedPlayer.innerHTML;
//       droppedPlayer.innerHTML = draggedPlayer.innerHTML;
//       draggedPlayer.innerHTML = tempContent;

//       // Update data model
//       const tempData = playersData[droppedPlayerIndex];
//       playersData[droppedPlayerIndex] = playersData[draggedPlayerIndex];
//       playersData[draggedPlayerIndex] = tempData;

//       // Re-enable dragging
//       draggedPlayer.setAttribute("draggable", "true");
//       droppedPlayer.setAttribute("draggable", "true");
//     }
//   });

//   element.addEventListener("dragend", () => {
//     draggedPlayer = null;
//     draggedPlayerIndex = null;
//   });
// }

  
  
  function updateReplacementPool(remainingPlayers) {
    // const replacementPool = document.getElementById("replacement-pool");

    replacementPool.innerHTML = "<h3>Replacement Players</h3>";

    const remainingPlayers = playersData.filter((p) => p.name !== player.name);
    remainingPlayers.forEach((player) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("replacement-player");
      playerDiv.setAttribute("draggable", "true");
      playerDiv.innerHTML = `
        <img src="${player.photo}" alt="Player Photo" class="player-photo">
        <div class="player-name">${player.name}</div>
      `;
  
      addDragEvents(playerDiv);
  
      replacementPool.appendChild(playerDiv);
    });
  }
  


    function createCard(players){
    playerSelection.innerHTML = "";
    players.forEach((player) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("replacement-player");
        playerDiv.setAttribute("draggable", "true");

        const card = document.createElement("div");
        card.classList.add("badge");
        card.style.position = " relative";


        const img = document.createElement("img");
        img.classList.add("player-photo");
        img.src = player.photo ;
        img.alt = `${player.name}'s photo` 

        const name = document.createElement("div")
        name.textContent = `${player.name}`

        
        const position = document.createElement("div")
        position.textContent = `${player.position}`

        const flag = document.createElement("img");
        flag.classList.add("flag");
        flag.src = player.flag ;
        flag.alt = `${player.name}'s photo` ;

        const club = document.createElement("img");
        club.classList.add("logo");
        club.src = player.logo ;
        club.alt = `${player.club}'s logo`;

        const stats = document.createElement('div');

        const pac = document.createElement('div');
        pac.classList.add('stat');
        pac.textContent= `${player.pace}`;
      
        const sho = document.createElement('div');
        sho.classList.add('stat');
        sho.textContent= `${player.shooting}`;

        const pas = document.createElement('div');        
        pas.classList.add('stat');
        pas.textContent= `${player.passing}`;

        const dri = document.createElement('div');
        dri.classList.add('stat');
        dri.textContent= `${player.dribbling}`;

        const def = document.createElement('div');
        def.classList.add('stat');
        def.textContent= `${player.defending}`;

        const phy = document.createElement('div');
        phy.classList.add('stat');
        phy.textContent= `${player.physical}`;
        
    
        playerDiv.appendChild(card);
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(position);
        card.appendChild(flag);
        card.appendChild(club);
        card.appendChild(stats);

        stats.appendChild(pac)
        stats.appendChild(pas)
        stats.appendChild(sho)
        stats.appendChild(dri)
        stats.appendChild(def)
        stats.appendChild(phy)

        // createCard(playerDiv);
        addDragEvents(playerDiv);
        playerSelection.appendChild(playerDiv);
        updateReplacementPool(remainingPlayers);


            })
    ;}})

        



    
    //
    // function updatePlayerSelection(players) {
    // playerSelection.innerHTML = ""; 
    //   players.forEach((player) => {
    //     const playerDiv = document.createElement("div");
    //     playerDiv.classList.add("replacement-player");
    //     playerDiv.setAttribute("draggable", "true");
    //     playerDiv.innerHTML = `
   
    //     <div class="badge" style="position:relative;" id="badge">
            
    //         <img class="player-photo" id="playerPhoto" src="${player.photo}" alt="Player Photo">
            
    //         <div class="player-name" id="playerName">${player.name}</div>
            
    //         <div class="player-info" id="playerPosition">${player.position}</div>
            
    //         <img id="flag" src="${player.flag}" alt="Flag" style="width: 30px; position: absolute; top: 10px; left: 10px;">
            
    //         <img id="clubLogo" src="${player.logo}" alt="Club Logo" style="width: 50px; position: absolute; top: 10px; right: 10px;">
            
    //         <div class="stats">
    //             <div class="stat">PAC:${player.pace} <span id="pace"></span></div>
    //             <div class="stat">SHO: ${player.shooting} <span id="shooting"></span></div>
    //             <div class="stat">PAS: ${player.passing}<span id="passing"></span></div>
    //             <div class="stat">DRI: ${player.dribbling}<span id="dribbling"></span></div>
    //             <div class="stat">DEF: ${player.defending}<span id="defending"></span></div>
    //             <div class="stat">PHY: ${player.physical}<span id="physical"></span></div>
    //         </div>
    //     </div>
    //     `;
        // createCard(playerDiv);
        // addDragEvents(playerDiv);
        // playerSelection.appendChild(playerDiv);

    //     const remainingPlayers = playersData.filter((p) => p.name !== player.name);
    // updateReplacementPool(remainingPlayers);
      
  