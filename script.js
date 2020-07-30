const createTable = (status) => {
  let id = -1;
  const table = status
    .map(
      (el) =>
        `<tr>${el
          .map((item) => {
            id++;
            return `<td data-type='square' data-id="${id}">${item}</td>`;
          })
          .join("")}</tr>`
    )
    .join("");
  return table;
};

class Table {
  constructor() {
    this.status = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.currentPlayer = "X";
    this.$title = document.querySelector('[data-type="title"]');
    this.$table = document.querySelector('[data-type="table"]');

    this._render();
    this._setup();
  }

  _render() {
    this.$table.innerHTML = createTable(this.status);
    this.$title.innerHTML = `Current player: ${this.currentPlayer}`
  }

  _setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$table.addEventListener("click", this.clickHandler);
  }

  checkWinner() {
    console.log(this.status);
    const player = this.currentPlayer;
    if (
      (this.status[0][0] === player &&
        this.status[0][1] === player &&
        this.status[0][2] === player) ||
      (this.status[0][0] === player &&
        this.status[1][0] === player &&
        this.status[2][0] === player) ||
      (this.status[0][2] === player &&
        this.status[1][2] === player &&
        this.status[2][2] === player) ||
      (this.status[2][0] === player &&
        this.status[2][1] === player &&
        this.status[2][2] === player) ||
      (this.status[0][0] === player &&
        this.status[1][1] === player &&
        this.status[2][2] === player) ||
      (this.status[0][2] === player &&
        this.status[1][1] === player &&
        this.status[2][0] === player) ||
      (this.status[0][1] === player &&
        this.status[1][1] === player &&
        this.status[2][1] === player) ||
      (this.status[1][0] === player &&
        this.status[1][1] === player &&
        this.status[1][2] === player)
    ) {
      alert(`Winner is ${this.currentPlayer}`);
    }
  }

  clickHandler(e) {
    if (e.target.dataset.type === "square") {
      const { id } = e.target.dataset;
      this.select(id);
    }
  }

  playerToggle() {
    this.currentPlayer === "X"
      ? (this.currentPlayer = "O")
      : (this.currentPlayer = "X");
  }

  select(id) {
    const selectedBlock = this.$table.querySelector(`[data-id='${id}']`);
    let fIdx = 0;

    if (+id + 1 > 3 && +id + 1 <= 6) {
      fIdx = 1;
    } else if (+id + 1 > 3) {
      fIdx = 2;
    }

    const sIdx = id - 3 * fIdx;

    if (selectedBlock.innerHTML === "") {
      // const cross = '<i class="fa fa-times"></i>';
      // const circle = '<i class="fa fa-circle-o"></i>';
      const cross = "O";
      const circle = "X";
      this.currentPlayer === "X"
        ? (this.status[fIdx][sIdx] = circle)
        : (this.status[fIdx][sIdx] = cross);
      this.checkWinner();
      this.playerToggle();
      this._render();
    }
  }
}

const table = new Table();
window.table = table;
