const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'draw';
}

function handleClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer.toUpperCase();

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        if (winner === 'draw') {
            alert("It's a draw!");
        } else {
            alert(`${winner.toUpperCase()} wins!`);
        }
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'x';

    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
