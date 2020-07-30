const createTable = (status) => {
  let id = -1;
  const table = status.map( (el) =>
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

    this.currentPlayer = 0;
    this.$table = document.querySelector('[data-type="table"]');

    this._render();
    this._setup();
  }

  _render() {
    this.$table.innerHTML = createTable(this.status);
  }

  _setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$table.addEventListener("click", this.clickHandler);
  }

  clickHandler(e) {
    if (e.target.dataset.type === "square") {
      const { id } = e.target.dataset;
      this.select(id);
    }
  }

  playerToggle() {
    this.currentPlayer === 0
      ? (this.currentPlayer = 1)
      : (this.currentPlayer = 0);
  }

  select(id) {
    const selectedBlock = this.$table.querySelector(`[data-id='${id}']`);
    let fIdx = 0;

    if (+id + 1 > 3 && +id + 1 <= 6){
      fIdx = 1;
    }else if (+id + 1 > 3) {
      fIdx = 2;
    }

    const sIdx = id - (3 * fIdx);

    if (selectedBlock.innerHTML === "") {
      const cross = '<i class="fa fa-times"></i>';
      const circle = '<i class="fa fa-circle-o"></i>';
      this.currentPlayer === 0 ? this.status[fIdx][sIdx] = circle : this.status[fIdx][sIdx] = cross;
      this.playerToggle();
      this._render()
    }
  }
}

const table = new Table();
window.table = table;
