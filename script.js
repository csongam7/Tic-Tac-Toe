const TicTacToe = {

    currentPlayer: "X",
    isWinner : false,

    gameboard : [
        ["","",""],
        ["","",""],
        ["","",""]
    ],

    playerTurn: function(){
        let row = prompt('Please eneter a row!');
        let column = prompt('Please enter a column!');
        if(this.gameboard[row][column] == ""){
            this.gameboard[row][column] = this.currentPlayer;
            this.switchPlayer();
            return true;
        }
        else{
            alert("Invalid input coordinates already occupied.")
            return false;
        }
    },

    displayBoard: function() {
        for (let row of this.gameboard) {
          console.log(row.join(' | '));
          console.log('-------');
        }
    },

    switchPlayer: function(){
        this.currentPlayer = (this.currentPlayer === 'X' ? 'O' : 'X');
    },

    checkWinner(){
        let columns = [[],[],[]];
        let diagonals = [[],[]];
        for(row of this.gameboard){
            if(row.every(element => element == row[0] && row[0] != '')){
                return row[0];
            }
            if (this.gameboard.indexOf(row) == 0){
                diagonals[0].push(row[0]),
                diagonals[1].push(row[2])
            }
            else if(this.gameboard.indexOf(row) == 1){
                diagonals.forEach(array => array.push(row[1]))
            }
            else{
                diagonals[0].push(row[2]),
                diagonals[1].push(row[0]);
            }
            for(let i = row.length-1; i>=0; i--){
                columns[i].push(row[i])
            }      
        }

        for(let column of columns){
            if(column.every(element => element === column[0] && column[0] !== '')){
            return column[0];
            }
        }

        for(let diagonal of diagonals){if(diagonal.every(element => element == diagonal[0] && diagonal[0] != '')){
            return diagonal[0];
        }}
    }
}

/*while (!TicTacToe.checkWinner()){
    TicTacToe.displayBoard(),
    TicTacToe.playerTurn()
}if(TicTacToe.checkWinner()){
    alert (`${TicTacToe.currentPlayer} has won!`);
}*/

