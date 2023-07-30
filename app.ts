var Turn: number = 0;


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
            if (Turn >= 255) {
                alert('Game Over. Draw\n Would you like to play again?');
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

function checkWin() {
    
        

const board = new Board(15);
document.getElementById('game')?.appendChild(board.element);
document.getElementById('game')?.appendChild(new Restart().element);