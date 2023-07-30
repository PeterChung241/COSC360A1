let Turn: number = 0;


enum STATUS {
    EMPTY = 'EMPTY',
    BLACK = 'BLACK',
    WHITE = 'WHITE',
}

class Board {
    rows: Row[];
    element: HTMLElement;

    constructor(size: number) {
        this.rows = Array.from({ length: size }).map((_, index) => {
            return new Row(index, size)
        });
        this.element = document.createElement('div');
        this.element.classList.add('board');
        this.element.append(...this.rows.map((row) => row.element))
    }
}

class Piece {
    id: number;
    status: STATUS;
    element: HTMLElement;

    constructor(id: number, isEmpty: boolean = true) {
        this.id = id;
        this.status = isEmpty ? STATUS.EMPTY : STATUS.BLACK;
        this.element = document.createElement('div');
        this.element.classList.add('piece');
        this.element.classList.add(this.status.toLowerCase());
        this.element.addEventListener('click', () => {
            this.handleClick()
        });
    }

    handleClick = () => {
        if (this.status === STATUS.EMPTY) {
            this.status = Turn % 2 === 0 ? STATUS.BLACK : STATUS.WHITE;
            this.element.classList.add(this.status.toLowerCase());
            Turn++;
            checkWin(this.status, this.id);
            if (Turn >= 255) {
                alert('Game Over. Draw');
                location.reload();
            }
        }
    }
}


class Row {
    id: number;
    pieces: Piece[];
    element: HTMLElement;

    constructor(id: number, pieceNumber: number) {
        this.id = id;
        this.pieces = Array.from({ length: pieceNumber }).map((_, index) => {
            const pieceId = pieceNumber * id + index;
            return new Piece(pieceId)
        });
        this.element = document.createElement('div');
        this.element.classList.add('row');
        this.element.append(...this.pieces.map((piece) => piece.element))
    }
}

class Restart {
    element: HTMLElement;

    constructor() {
        this.element = document.createElement('button');
        this.element.classList.add('restart');
        this.element.innerText = 'Restart';
        this.element.addEventListener('click', () => {
            this.handleClick()
        });
    }
    handleClick = () => {
        location.reload();
    }
}

class winMessage {
    element: HTMLElement;

    constructor(status: STATUS) {
        this.element = document.createElement('div');
        this.element.classList.add('game_status');
        this.element.classList.add('winMessage');
        this.element.innerText = `${status} wins!`;

    }

}

function win(status: STATUS): void {
    document.getElementById('game')?.appendChild(new winMessage(status).element);
}

function checkWin(status: STATUS, id: number): void {
    let count = 0;
    let row = Math.floor(id / 15);
    let col = id % 15;

    //check row
    if (col <= 10)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row].pieces[col + i].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }
    if (col >= 4)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row].pieces[col - i].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }

    //check col
    if (row <= 10)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row + i].pieces[col].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }
    if (row >= 4)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row - i].pieces[col].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }

    //check diagonal
    if (row <= 10 && col <= 10)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row + i].pieces[col + i].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }
    if (row >= 4 && col <= 10)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row - i].pieces[col + i].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }
    if (row <= 10 && col >= 4)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row + i].pieces[col - i].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }
    if (row >= 4 && col >= 4)
        for (let i = 0; i < 5; i++) {
            if (board.rows[row - i].pieces[col - i].status === status) {
                count++;
                if (count === 5) {
                    win(status);
                }
            }
            else {
                count = 0;
                break;
            }
        }


}

const board = new Board(15);
document.getElementById('game')?.appendChild(board.element);
document.getElementById('game')?.appendChild(new Restart().element);