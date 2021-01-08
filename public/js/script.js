import Quote from './Quote.js';
import Car from './Car.js';
import Typeracer from './Typeracer.js';

let Game = new Typeracer();

window.onload = function () {
  Game = new Typeracer(new Quote(), new Car());
};

window.onresize = function () {
  Game.car.rePosition();
};

Game.textInput.onkeydown = function (e) {
  Game.handleDownkey(e);
};

Game.textInput.onkeyup = function (e) {
  Game.handleUpkey(e);
};