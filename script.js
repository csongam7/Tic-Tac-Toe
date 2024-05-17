const TicTacToe = {

    currentPlayer: "O",
    winner : false,

    gameboard : [
        ["","",""],
        ["","",""],
        ["","",""]
    ],

    playerTurn: function(row,column){
        if(this.gameboard[row][column] == ""){
            this.gameboard[row][column] = this.currentPlayer;
            this.updateTable(row, column);
            if(this.checkWinner()){
                this.winner = true;
                const result = document.querySelector('#result');
                result.style.zIndex = '1';
                document.querySelector('#result-text > p').innerText = `${this.currentPlayer} has won!`
                document.querySelector(`#${this.currentPlayer}-score`).innerHTML = parseInt(document.querySelector(`#${this.currentPlayer}-score`).innerHTML) + 1
                setTimeout(() => {
                    result.style.opacity = '1'; // Change opacity to 1 for smooth transition
                  }, 0);
            }

            else if (this.checkIfDraw()){
                this.winner = true;
                const result = document.querySelector('#result');
                result.style.zIndex = '1';
                document.querySelector('#result-text > p').innerText = `It's a draw!`;
                setTimeout(() => {
                    result.style.opacity = '1'; // Change opacity to 1 for smooth transition
                  }, 0);
            };
            this.switchPlayer();
        }
        else{
            alert("Invalid input coordinates already occupied.")
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
        return false;
    },

    checkIfDraw(){
        for(let space of this.gameboard){
            if (space.includes('')){
                return false;
            }
        }
        return true
    },

    listenToTheTable(){
        const spaces = document.querySelectorAll('.space');
        if(document.querySelector('#start-game > a').innerHTML == 'Start a game!'){
            document.querySelector('#start-game > a').innerHTML = "Play another one";
            spaces.forEach(space => space.addEventListener("click", function(){
                {if(!TicTacToe.winner && !TicTacToe.checkIfDraw()){
                    const coordinates = this.id.split("/");
                TicTacToe.playerTurn(parseInt(coordinates[0]), parseInt(coordinates[1]));
                }}
            }))
        }
    },

    updateTable(row, column){
        const spaces = document.querySelectorAll('.space');
        const rowColumnAsString = row.toString() + ',' + column.toString();
        indexes = new Map();
        indexes.set("0,0", 0);
        indexes.set("0,1", 1);
        indexes.set("0,2", 2);
        indexes.set("1,0", 3);
        indexes.set("1,1", 4);
        indexes.set("1,2", 5);
        indexes.set("2,0", 6);
        indexes.set("2,1", 7);
        indexes.set("2,2", 8);
        spaces[indexes.get(rowColumnAsString)].innerHTML = this.currentPlayer;            
    },

    clearTable(){
        let spaces = document.querySelectorAll('.space');
        spaces.forEach(space => space.innerHTML = '');
        
        this.gameboard = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];
    }

}

document.querySelector('#start-game').addEventListener('click', function(){
    TicTacToe.clearTable();
    TicTacToe.winner = false;
    TicTacToe.listenToTheTable();
})

document.querySelector('.restart-button').addEventListener('click', function(){
    TicTacToe.clearTable();
    TicTacToe.winner = false;
    const result = document.querySelector('#result');
    result.style.zIndex = '-1';
    result.style.opacity = '0';
})