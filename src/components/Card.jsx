/* eslint-disable react/prop-types */
function Card({ pokemon }) {
  let maxHealth = pokemon.health;
  let mediumHealth = maxHealth / 2;
  let miniumHealth = maxHealth / 3;

  return (
    <div
      className={`text-white h-full flex items-center justify-center ${
        pokemon.isPlayer ? "flex-col" : "flex-col-reverse"
      }`}
    >
      <div className="w-2/4 h-1/4 bg-[#69715a] border-4 rounded-md border-[#28322a] m-4 pl-2">
        <div className="flex justify-between pr-4 pt-2">
          <h2>{pokemon.name.toUpperCase()}</h2>
          <p>Lv{pokemon.level}</p>
        </div>
        <div className="flex flex-row gap-2 items-center justify-end pr-4">
          <p className="">Hp</p>
          <progress
            value={pokemon.vida}
            max={maxHealth}
            className={`w-56 border border-[#ecfef2] ${
              pokemon.vida <= miniumHealth
                ? `progress progress-error`
                : pokemon.vida <= mediumHealth
                ? `progress progress-warning`
                : `progress progress-success`
            }`}
          ></progress>
        </div>
      </div>

      <span className="h-3/4 w-full flex justify-center items-center">
        <img
          src={pokemon.imgSrc}
          alt={pokemon.name}
          className={`w-1/2 ${
            pokemon.isPlayer ? "lg:scale-100" : "lg:scale-50"
          }`}
          style={{ filter: "drop-shadow(5px 5px 5px #00)" }}
        />
      </span>
    </div>
  );
}

export default Card;

/* Componente car para jugador y pc [
Vida
Nivel
Nombre
Tipo
Img
Color
Moves
isPlayer or no
] */
