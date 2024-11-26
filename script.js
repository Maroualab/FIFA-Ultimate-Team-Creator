

const playerForm = document.getElementById('player_info');
const playerList = document.getElementById('player-list');
const footballField = document.getElementById('football-field');
let draggedCard = null;

function displayPlayer(player) {
  const playerCard = document.createElement('button');
  playerCard.innerText = player.name; 

  addDragEvents(playerCard);

  footballField.appendChild(playerCard);

  const playerDetails = document.createElement('div');
  playerDetails.classList.add('player-details');
  playerDetails.innerHTML = `
    <p><strong>Name:</strong> ${player.name}</p>
    <p><strong>Position:</strong> ${player.position}</p>
    <p><strong>Nationality:</strong> ${player.nationality}</p>
    <p><strong>Club:</strong> ${player.club}</p>
    <p><strong>Rating:</strong> ${player.rating}</p>
    <p><strong>Pace:</strong> ${player.pace}</p>
    <p><strong>Shooting:</strong> ${player.shooting}</p>
    <p><strong>Passing:</strong> ${player.passing}</p>
    <p><strong>Dribbling:</strong> ${player.dribbling}</p>
    <p><strong>Defending:</strong> ${player.defending}</p>
    <p><strong>Physical:</strong> ${player.physical}</p>
  `;
  playerList.appendChild(playerDetails);
}

function addDragEvents(card) {
  card.addEventListener('dragstart', (event) => {
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
  });
}

playerForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const player = {
    name: document.getElementById('name').value,
    position: document.getElementById('position').value,
    nationality: document.getElementById('nationality').value,
    club: document.getElementById('club').value,
    rating: document.getElementById('rating').value,
    pace: document.getElementById('pace').value,
    shooting: document.getElementById('shooting').value,
    passing: document.getElementById('passing').value,
    dribbling: document.getElementById('dribbling').value,
    defending: document.getElementById('defending').value,
    physical: document.getElementById('physical').value
  };


  displayPlayer(player);


  playerForm.reset();
});
