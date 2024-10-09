let players = [];
let matches = [];

// Function to add a player to the tournament
function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    if (playerName.trim()) {
        players.push({ name: playerName });
        document.getElementById('playerName').value = '';  // Clear the input
        updatePlayerList();  // Update the player list display
    } else {
        alert('Player name cannot be empty!');
    }
}

// Function to update the player list display
function updatePlayerList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';  // Clear the existing list

    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = player.name;
        playersList.appendChild(li);
    });
}

// Function to generate round-robin matches
function generateMatches() {
    if (players.length < 2) {
        alert('You need at least 2 players to generate matches.');
        return;
    }

    matches = [];  // Clear any existing matches

    // Create a round-robin match schedule (every player plays against every other player)
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            matches.push({
                player1: players[i].name,
                player2: players[j].name,
                winner: null
            });
        }
    }

    updateMatchList();  // Update the match display
}

// Function to update the match list display
function updateMatchList() {
    const matchesList = document.getElementById('matchesList');
    matchesList.innerHTML = '';  // Clear the existing match list

    matches.forEach((match, index) => {
        const row = document.createElement('tr');

        const player1Cell = document.createElement('td');
        player1Cell.textContent = match.player1;
        row.appendChild(player1Cell);

        const player2Cell = document.createElement('td');
        player2Cell.textContent = match.player2;
        row.appendChild(player2Cell);

        const winnerCell = document.createElement('td');
        winnerCell.textContent = match.winner ? match.winner : 'Not decided';
        row.appendChild(winnerCell);

        const actionCell = document.createElement('td');
        const selectWinnerButton = document.createElement('button');
        selectWinnerButton.textContent = 'Select Winner';
        selectWinnerButton.onclick = () => selectWinner(index);
        actionCell.appendChild(selectWinnerButton);
        row.appendChild(actionCell);

        matchesList.appendChild(row);
    });
}

// Function to select a winner for a match
function selectWinner(matchIndex) {
    const match = matches[matchIndex];
    const winner = prompt(`Enter the winner (either "${match.player1}" or "${match.player2}"):`);

    if (winner === match.player1 || winner === match.player2) {
        matches[matchIndex].winner = winner;
        updateMatchList();  // Update the display after setting the winner
    } else {
        alert('Invalid winner! Please enter the correct player name.');
    }
}
