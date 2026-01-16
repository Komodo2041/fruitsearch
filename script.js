

var shema = getzeroshema();
var difficulity = [
  [10, "Very Easy"],
  [20, "Easy"],
  [40, "Medium"],
  [60, "Hard"],
  [80, "Very Hard"]
];


var data = {
  stan: 0,

  options: [10, 1],
  puzzlesPos: [],
  nrPuzzless: 8,
  schema: shema,
  difficulity: difficulity,
  gametime: 1000,
  time: 1000,
  points: 0,
  endgame: 0,
  stepGoodFit: 3,
  step: 0,
  isGoodFit: 0,
  goodPuzzle: 0,

};


new Vue({
  el: '#app',
  data: data,

  methods: {

    start: function () {

      clearRect();
      data.schema = createRandomMap(data.schema, data.options[0]);
      data.puzzlesPos = getPosPuzzles(data.nrPuzzless, data.schema);
      fillBigCanva(data.schema, data.options[1]);
      fillSmallCanva(data.puzzlesPos, data.options[1]);

      data.stan = 1;
      data.time = parseInt(data.gametime);
      data.endgame = 0;
      data.points = 0;
      this.interval = setInterval(this._tick, 100);
    },
    reloadGame: function () {
      clearInterval(this.interval);
      this.start();
    },
    stopGame: function () {
      clearInterval(this.interval);

      data.endgame = 1;
    },

    seeSolution: function () {
      seeSolution(data.puzzlesPos, data.schema);
      this.stopGame();
    },
    checkClickMapa: function (event) {
      if (data.endgame == 0) {
        let x = Math.floor(event.offsetX / 30);
        let y = Math.floor(event.offsetY / 30);

        if (data.schema[x][y] == data.puzzlesPos[0]) {
          data.puzzlesPos = movepos(data.puzzlesPos);
          this.points += 10;
        }
      }
    },
    _tick: function () {
      this.time--;
      if (this.time <= 0) {
        this.stopGame();
      }

      fillBigCanva(data.schema, data.options[1]);
      fillSmallCanva(data.puzzlesPos, data.options[1]);

    },
    setGraphs: function () {
      setGraphics(data.options[1]);
    },

  },

});
