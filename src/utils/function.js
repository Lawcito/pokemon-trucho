import { pokemons } from "./data";

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Inicia el juego, randomiza los pokemones tanto de pc y player.
export function startGame() {
  const random = randomize(0, pokemons.length - 1);
  const randomTwo = randomize(0, pokemons.length - 1);
  let pokePlayer = pokemons[random];
  let pokePc = pokemons[randomTwo];
  let levelPlayer = randomize(1, 10);
  let levelPc = randomize(1, 10);
  let healthPlayer = levelPlayer * 100;
  let healthPc = levelPc * 100;
  let player = {
    ...pokePlayer,
    vida: healthPlayer,
    health: healthPlayer,
    mediumHealt: healthPlayer / 2,
    miniumHealt: healthPlayer /3,
    level: levelPlayer,
    isPlayer: true,
  };
  let computer = {
    ...pokePc,
    vida: healthPc,
    health: healthPc,
    mediumHealt: healthPc / 2,
    miniumHealt: healthPc /3,
    level: levelPc,
    isPlayer: false,
  };
  return [player, computer];
}

//Efectividad del golpe segun tipo de pokemon.
export function effectiveness(att, deff) {
  if (att == "water" && deff == "fire") {
    return 3;
  } else if (att == "fire" && deff == "rock") {
    return 3;
  } else if (att == "rock" && deff == "electric") {
    return 3;
  } else if (att == "electric" && deff == "water") {
    return 3;
  } else if (att == deff) {
    return 1;
  } else {
    return 0.5;
  }
}

//Calcula la suerte.
export function lucky() {
  let calculateLucky = Math.random();
  if (calculateLucky <= 0.33) {
    return 3;
  } else if (calculateLucky <= 0.66) {
    return 1;
  } else {
    return 0.5;
  }
}

//Calculo del daño de ataque.
export function attack(att, deff) {
  let damage = ((50 * att.level) / deff.level) * effectiveness() * lucky();
  return damage;
}

export function restartGame(){
  
}