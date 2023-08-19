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
    let bot = botInit();

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
        let move = bot.getBestMove(s, player);

        board.play(move[0], move[1], player);
        console.log(bot.getBestMove(s, player))
        board.printBoard()

    }

    return {
        board,
        botPlay,
        bot
    }
}


function botInit () {
    let n = 3;
    

    const getBestMove = (s, player) => {
        let bestMove;
        let bestScore;
        if (player == 1){
            bestScore = -Infinity;
        } else {
            bestScore = Infinity;
        }

        for(let r = 0; r < n; r++) {
            for(let c = 0; c < n; c++){
                if (s[r][c] == 0) {
                    if(player == 1) {
                        s[r][c] = 1;
                    } else {
                        s[r][c] = -1;
                    }
                    score = minimax(s, player)
                    console.log(score);
                    if(player == 1){
                        if(score > bestScore) {
                            bestScore = score;
                            bestMove = [r,c];
                        }
                    } else {
                        if (score < bestScore) {
                            bestScore = score;
                            bestMove =[r,c];
                        }
                    }
                }
            }
        }
        return bestMove;

    };

    function minimax(s, player) {   //Player min = false; max = true
        let terminal = checkWin(s)
        if (terminal !== false) { // Check if game is over
            return terminal; // Get value of board
            
        }
        if (player == 1) {  // If true, so if max
            let value = -Infinity;
            moves(s).forEach((move) => { // moves() gets each possible move of board
                s = JSON.parse(JSON.stringify(s));
                value = Math.max(minimax(result(s, move, player), -1), value); // Result(s,move) gets board with the extra move
            })
            return value;
        } else {
            let value = Infinity;
            moves(s).forEach((move) => {
                s = JSON.parse(JSON.stringify(s));
                value = Math.min(minimax(result(s,move,player), 1), value);
            })
            return value
        }
    }

    function checkWin (s) {
        let d1 = 0;
        let d2 = 0;
        let total = 0;
    

        for(let r = 0; r<n; r++) {
            let row = 0;
            let col = 0
            for(let c = 0; c<n; c++) {
                row += s[r][c];
                col += s[c][r];
                total += Math.abs(s[r][c]); // Get total cells used

                if (r == c) {d1 += s[r][c]}
                if (r+c == n+1) {d2 += s[r][c]}
            }
            if(row == n || col == n) {return 1} 
            else if(row == -n || col == -n) {return -1}
            if (total == n*n) {return 0};
        }
        if(d1 == n || d2 == n) {return 1};
        if(d1 == -n || d2 == -n) {return -1};
        
        
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

        if(player == 1) { // If max
            s[row][col] = 1;
        } else { // If min
            s[row][col] = -1;
        }
        return s;
    }
    

    return{
        getBestMove,
        checkWin,
        minimax
    }
}
