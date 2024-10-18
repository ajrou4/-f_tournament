let players = [];  // Store players as they are added

// Function to add a player by sending a POST request to the backend
function addPlayer(event) {
    event.preventDefault();  // Prevent form from submitting normally

    const playerName = document.getElementById('playerName').value;  // Get player name from input

    // Check if we already have 8 players
    if (players.length < 8) {
        // Send POST request to Django backend to add player
        fetch('http://127.0.0.1:8000/api/players/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: playerName })
        })
        .then(response => response.json())
        .then(data => {
            players.push(data);  // Add the new player returned by the API
            document.getElementById('playerName').value = '';  // Clear input field
            updatePlayerList();

            if (players.length === 8) {
                generateTournamentBracket();  // Generate bracket once 8 players are added
            }
        })
        .catch(error => console.error('Error adding player:', error));
    } else {
        alert('You can only add 8 players.');
    }
}

// Function to update the player list display
function updatePlayerList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';  // Clear the existing list

    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player.name;
        playersList.appendChild(li);
    });

    // Disable the "Add Player" button if 8 players are added
    document.getElementById('addPlayerBtn').disabled = players.length >= 8;
}

// Function to generate the tournament bracket for 8 players
function generateTournamentBracket() {
    // Show the bracket section
    document.getElementById('bracket-section').style.display = 'block';

    // Assign players to the matches in Round 1
    const match1 = { player1: players[0].id, player2: players[1].id };
    const match2 = { player1: players[2].id, player2: players[3].id };
    const match3 = { player1: players[4].id, player2: players[5].id };
    const match4 = { player1: players[6].id, player2: players[7].id };

    // Create the games for each match by sending a POST request to the backend
    createGame(match1);
    createGame(match2);
    createGame(match3);
    createGame(match4);

    // Pop-up notification to inform user that the bracket is generated
    alert('Player registration complete! The tournament bracket has been generated.');
}

// Function to create a game by sending a POST request to the backend   
function createGame(match) {
    fetch('http://127.0.0.1:8000/api/games/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(match)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Game created:', data);  // Game creation response
    })
    .catch(error => console.error('Error creating game:', error));
}
// Function to set the winner of a game
function setWinner(gameId) {
    const winnerId = prompt('Enter the winner player ID:');
    const score1 = prompt('Enter score for Player 1:');
    const score2 = prompt('Enter score for Player 2:');

    fetch(`http://127.0.0.1:8000/api/games/${gameId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            winner: winnerId,
            score_player1: score1,
            score_player2: score2,
            is_complete: true
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Game updated:', data);
        // Update the frontend display with new scores and winner
        document.getElementById(`match${gameId}-score1`).textContent = score1;
        document.getElementById(`match${gameId}-score2`).textContent = score2;
    })
    .catch(error => console.error('Error updating game:', error));
}


// Fetch players and matches when the page loads (optional)
window.onload = function() {
    // Optionally, you can load existing players from the backend if needed
}
