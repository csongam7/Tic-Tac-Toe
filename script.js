const TicTacToe = {

    currentPlayer: "X",
    isWinner : false,

    gameboard : [
        ["","X","O"],
        ["X","","X"],
        ["","O",""]
    ],

    playerTurn: function(row,column){
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
    },

    makeMapGoLive(){
        const spaces = document.querySelectorAll('.space');
        console.log(spaces);
        spaces.forEach(space => space.addEventListener("click", function(){
            const coordinates = this.id.split("/");
            TicTacToe.playerTurn(parseInt(coordinates[0]), parseInt(coordinates[1]));
        }))
    },

    updateMap(){
        const spaces = document.querySelectorAll('.space');
        let spaceIndex = 0;
        for( let i = 0; i <= 2; i++){
            for(let r = 0; r <= 2; r++){
                spaces[spaceIndex].innerHTML = this.gameboard[i][r];
                spaceIndex++;
            }
            
        }
    }
}

/*while (!TicTacToe.checkWinner()){
    TicTacToe.displayBoard(),
    TicTacToe.playerTurn()
}if(TicTacToe.checkWinner()){
    alert (`${TicTacToe.currentPlayer} has won!`);
}*/

TicTacToe.updateMap();

