import pikachuImg from "../assets/pikachu.png"
import charmanderImg from "../assets/charmander.png"
import squirtleImg from "../assets/squirtle.png"
import onixImg from "../assets/onix.png"

export const pokemons = [
  {
    name: "pikachu",
    type: "electric",
    imgSrc: pikachuImg,
    color: "#ebd834",
    moves: ["tail whip", "thunderbolt", "spark",]
  },
  {
    name: "charmander",
    type: "fire",
    imgSrc: charmanderImg,
    color: "#de6228",
    moves: ["tail whip", "thunderbolt", "spark"],
  },
  {
    name: "squirtle",
    type: "water",
    imgSrc: squirtleImg,
    color: "#5167f5",
    moves: ["tail whip", "thunderbolt", "spark"],
  },
  {
    name: "onix",
    type: "rock",
    imgSrc: onixImg,
    color: "#6e6f75",
    moves: ["tail whip", "thunderbolt", "spark"],
  },
];


/* 

Direc utils con data de pokemones y funciones [
Attack, [Utilizar el tipo de pokemon para variar]
Start and End game, pausa
Damage calculate
Effectivity calculate
Pokemon choise (random)
Level calculate (random)
HP calculate, level depend
]
*/
