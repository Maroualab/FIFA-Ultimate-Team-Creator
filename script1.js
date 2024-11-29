const positions = document.querySelectorAll(".position");
const replacementPool = document.querySelector(".replacement-players");
// const playerSelection = document.querySelector("#player-selection");
const playerDisplay = document.getElementById("player-display");
const playerList = document.querySelector("#player-list");




let playersData = [];

fetch("players.json")
.then((response) => response.json())
.then((data) => {
  playersData = data.players || [];
})
.catch((error) => console.error("Error loading JSON:", error));

// positions.forEach((position) => {
// position.addEventListener("click", () => {
//     // playerSelection.innerHTML = "";


    
//   const positionName = position.getAttribute("data-position");
//   assignPlayerToPosition(position, positionName);

// });
// });

positions.forEach((position) => {
  position.addEventListener("click", () => {
    playerList.innerHTML = "";
    const positionName = position.getAttribute("data-position");
    assignPlayerToPosition(position, positionName);
  });
});


function assignPlayerToPosition(positionElement, positionName) {
    const players = playersData.filter(
      (player) => player.position === positionName
    );

    if (players.length === 0) {
      alert("No players available for this position!");
      return;
    }

    createCard(players);
    addDragEvents(positionElement);
  }




let draggedCard = null; 
    function addDragEvents(card) {
        card.addEventListener('dragstart', (event) => {
            // event.preventDefault(); 

          draggedCard = card;
          card.style.opacity = '0.5'; 
        });
      
        card.addEventListener('dragend', () => {
          card.style.opacity = '1'; 
        });
      
        card.addEventListener('dragover', (event) => {
          event.preventDefault(); 
          card.classList.add('drag-over');
        });
      
        card.addEventListener('dragleave', () => {
          card.classList.remove('drag-over'); 
        });
      
        card.addEventListener('drop', (event) => {
          event.preventDefault();
          card.classList.remove('drag-over');
          
          if (draggedCard !== card) {
            const temp = card.innerHTML;
            card.innerHTML = draggedCard.innerHTML;
            draggedCard.innerHTML = temp;
          }

        });;}
        // card.addEventListener("drop", (event) => {
        //     event.preventDefault();
        //     if (draggedCard && draggedCard !== card) {
        //       const temp = {
        //         innerHTML: card.innerHTML,
        //         attributes: Array.from(card.attributes).map((attr) => ({
        //           name: attr.name,
        //           value: attr.value,
        //         })),
        //       };
          
        //       card.innerHTML = draggedCard.innerHTML;
        //       draggedCard.innerHTML = temp.innerHTML;
          
        //       temp.attributes.forEach(({ name, value }) =>
        //         draggedCard.setAttribute(name, value)
              
        //       );
        //       draggedCard = null;
        //     //   draggedCard.classList.add("replacement-player");
        //     }}

        // card.addEventListener('drop', (event) => {
        //     event.preventDefault();
        //     card.classList.remove('drag-over');
    
        //     if (draggedCard && draggedCard !== card) {
        //         // Swap the DOM elements
        //         const parent = card.parentElement;
    
        //         // Insert draggedCard before card
        //         parent.insertBefore(draggedCard, card.nextSibling || card);
        //     }
        // });}
        
        // )};
      





    function createCard(players){

        // playerSelection.innerHTML = "";
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
            pac.textContent= `PAC : ${player.pace}`;
          
            const sho = document.createElement('div');
            sho.classList.add('stat');
            sho.textContent= `SHO : ${player.shooting}`;
    
            const pas = document.createElement('div');        
            pas.classList.add('stat');
            pas.textContent= `PAS : ${player.passing}`;
    
            const dri = document.createElement('div');
            dri.classList.add('stat');
            dri.textContent= `DRI :${player.dribbling}`;
    
            const def = document.createElement('div');
            def.classList.add('stat');
            def.textContent= `DEF :${player.defending}`;
    
            const phy = document.createElement('div');
            phy.classList.add('stat');
            phy.textContent= `PHY :${player.physical}`;
            
        
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
            playerList.appendChild(playerDiv);
            // updateReplacementPool(remainingPlayers);
    
    
                })
        ;}
        

        document.querySelector("#reset-button").addEventListener("click", () => {
            location.reload();
        });
        

        document.querySelector("#add-player-form").addEventListener("submit", (event) => {
            event.preventDefault();
          
            
            const newPlayer = {
              name: document.querySelector("#name").value,
              position: document.querySelector("#position").value,
              photo: document.querySelector("#photo").value,
              flag: document.querySelector("#flag").value,
              logo: document.querySelector("#logo").value,
              pace: document.querySelector("#pace").value,
              shooting: document.querySelector("#shooting").value,
              passing: document.querySelector("#passing").value,
              dribbling: document.querySelector("#dribbling").value,
              defending: document.querySelector("#defending").value,
              physical: document.querySelector("#physical").value,
            };
          
            // Display the new player in the player list
            displayPlayer(newPlayer);
          
            // Reset the form
            event.target.reset();
          });
          
          function displayPlayer(player) {
          
            
            const playerCard = document.createElement("div");
            playerCard.classList.add("player-card");
            playerCard.style.border = "1px solid #ff99c8";
            playerCard.style.padding = "10px";
            playerCard.style.margin = "10px 0";
            playerCard.style.borderRadius = "8px";
          
            playerCard.innerHTML = `
              <img src="${player.photo}" alt="${player.name}" class="player-photo" style="width: 50px; border-radius: 50%;" />
              <h3>${player.name}</h3>
              <p>Position: ${player.position}</p>
              <img src="${player.flag}" alt="Country" style="width: 20px;" />
              <img src="${player.logo}" alt="Club" style="width: 20px;" />
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
            playerCard.setAttribute("draggable", "true");
          }
          

        // document.querySelector("#reset-button").addEventListener("click", () => {
        //     positions.forEach((position) => (position.innerHTML = ""));
        //     // playerDiv.innerHTML = "";
        //     playerSelection.innerHTML = "";
        //     positions.innerHTML = "";
        //     replacementPool.innerHTML ="";
        
        // });
          

    //    create the drag and drop and then add the function to the required functionnalities 
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