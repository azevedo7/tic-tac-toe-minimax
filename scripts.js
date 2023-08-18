function game() {
    const board = [];
    const n = 3;

    // 1 - X; 2 - O; 0 - Empty
    // Fills board with zeros
    for(let i = 0; i<n; i++){
        board.push([]);
        for(let k = 0; k<n; k++){
            board[i].push(0);
        }
    }

    const getBoard = () => JSON.parse(JSON.stringify(board));

    const play = (r,c,value) => {
        if(board[r][c] == 0) {
            board[r][c] = value;
            return true;
        } 
        return false;
    }

    function checkWin() {
        let d1, d2 = 0;
        let total = 0

        for(let r = 0; r<n; r++) {
            let row = 0;
            let col = 0
            for(let c = 0; c<n; c++) {
                row += board[r][c];
                col += board[c][r];
                total += board[r][c];

                if (r == c) {d1 += board[r][c]}
                if (r+c == n+1) {d2 += board[r][c]}
            }
            if(total == n) {return 1} 
            else if(total == -n) {return -1}
        }
        if(d1 == n || d2 == n) {return 1};
        if(d1 == -n || d2 == -n) {return -1};
        
        if (total == n*n) {return 0};
        return false;
    }

    function printBoard() {
        for(let r = 0; r<n; r++){
            console.log(board[r]);
        }
    }
    
    return{
        play,
        getBoard,
        printBoard,
        checkWin,
    }
}

function gameControl () {
    let board = game()
    let bot = minimax();

    const players = [
        {
            name: 'player',
            value: 1,
        },
        {
            name: 'bot',
            value: -1,
        }
    ]

    const botPlay = (player) => {
        let s = board.getBoard()
        let move = bot.getBestMove(s, false);

        board.play(move[0], move[1], player);
        board.printBoard()

    }

    return {
        board,
        botPlay,
    }
}


function minimax () {
    let n = 3;
    let bestMove;

    const getBestMove = (s, player) => {
        calcMove(s, player);
        return bestMove;
    };

    function calcMove(s, player) {   //Player min = false; max = true

        if (checkWin(s) !== false) { // Check if game is over
            return checkWin(s); // Get value of board
            
        }
        if (player) {  // If true, so if max
            let value = -Infinity;
            moves(s).forEach((move) => { // moves() gets each possible move of board
                s = JSON.parse(JSON.stringify(s));
                temp = Math.max(calcMove(result(s, move, player), false)); // Result(s,move) gets board with the extra move
                if(temp > value){
                    value = temp;
                    bestMove = move;
                } 
            })
            return value;
        } else {
            let value = Infinity;
            moves(s).forEach((move) => {
                s = JSON.parse(JSON.stringify(s));
                temp = Math.min(calcMove(result(s,move,player), true));
                if(temp < value) {
                    value = temp;
                    bestMove = move;
                }
            })
            return value
        }
    }

    function checkWin (s) {
        let d1, d2 = 0;
        let total = 0;
    

        for(let r = 0; r<n; r++) {
            let row = 0;
            let col = 0
            for(let c = 0; c<n; c++) {
                row += s[r][c];
                col += s[c][r];
                total += s[r][c];

                if (r == c) {d1 += s[r][c]}
                if (r+c == n+1) {d2 += s[r][c]}
            }
            if(total == n) {return 1} 
            else if(total == -n) {return -1}
        }
        if(d1 == n || d2 == n) {return 1};
        if(d1 == -n || d2 == -n) {return -1};
        
        if (total == n*n) {return 0};
        return false;
    }

        // Gets each possible move
    function moves(s) {
        let totalMoves = [];
        for(let r = 0; r<n; r++) {
            for(let c = 0; c<n; c++){
                if (s[r][c] == 0) { // If board is empty
                    totalMoves.push([r,c]);
                }
            }
        }
        return totalMoves;
    }

    function result(s, move, player) {
        let row = move[0];
        let col = move[1];

        if(player) { // If max
            s[row][col] = 1;
        } else { // If min
            s[row][col] = -1;
        }
        return s;
    }
    

    return{
        getBestMove
    }
}
