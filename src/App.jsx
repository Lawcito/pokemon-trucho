import "./App.css";
import Card from "./components/Card";
import { attack, startGame } from "./utils/function";
import { useEffect, useState } from "react";
import bgBattle from "./assets/battleBackground.jpg";
import pokeIcon from "./assets/pokeball-icon.png";

function App() {
  const [player, setPlayer] = useState(undefined);
  const [computer, setComputer] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [log, setLog] = useState("");
  const [attacker, setAttacker] = useState("");
  const [deffender, setDeffender] = useState("");
  const [winner, setWinner] = useState(undefined);

  function damageDealt() {
    let playerDamage = attack(player, computer);
    let indexMove = Math.floor(Math.random() * player.moves.length);
    let move = player.moves[indexMove];
    let log = `de Jugador ha utilizado ${move}`;
    setAttacker(player);
    setLog(log);

    setComputer({
      ...computer,
      vida: Math.floor(computer.vida - playerDamage),
    });
    setTimeout(() => {
      let computerDamage = attack(computer, player);
      let pcIndexMove = Math.floor(Math.random() * player.moves.length);
      let pcMove = computer.moves[pcIndexMove];
      let pclog = `de Pc ha utilizado ${pcMove}`;
      setAttacker(computer);
      setLog(pclog);
      setPlayer({ ...player, vida: Math.floor(player.vida - computerDamage) });
    }, 1000);
  }

  function winValidate(pokemon) {
    if (pokemon && pokemon.vida <= 0) {
      if (pokemon.isPlayer) {
        setWinner(computer);
      } else if (!pokemon.isPlayer) {
        setWinner(player);
      }
    }
  }

  useEffect(() => {
    winValidate(computer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computer]);

  useEffect(() => {
    winValidate(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  useEffect(() => {
    let players = startGame();
    setPlayer(players[0]);
    setComputer(players[1]);
  }, []);

  return (
    <div className="font-bold">
      {isPlaying && !winner ? (
        <div
          className="w-screen h-screen"
          style={{
            background: `url(${bgBattle})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-between h-3/4">
            <div className="w-1/2 h-full">
              <Card pokemon={player} />
            </div>
            <div className="w-1/2 h-full">
              <Card pokemon={computer} />
            </div>
          </div>
          <div className="w-full h-1/4 flex">
            <div className="w-1/4">
              <button onClick={() => damageDealt()}>Attack</button>
            </div>
            {/* Log */}
            <div className="w-3/4 border-4 rounded border-[#282d29] bg-[#fcfbfc]">
              {winner ? (
                <p>{winner.name}</p>
              ) : (
                <div className="w-full h-full border-double border-r-8 border-l-8 border-[#91715a]">
                  <p className="pl-4 pt-4 text-2xl ">
                    <span style={{ color: `${attacker.color}` }}>
                      {attacker ? attacker.name.toUpperCase() : false}
                    </span>{" "}
                    {log.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
            {/* Log end */}
          </div>
        </div>
      ) : !isPlaying && !winner ? (
        <div className="w-screen h-screen bg-gradient-to-b from-[#ff0000] to-[#ffffff]">
          <div className="flex justify-center items-center h-full">
            <button
              onClick={() => {
                setIsPlaying(true);
              }}
              className=""
            >
              <img
                src={pokeIcon}
                alt=""
                className="w-20 rounded-full animate-spin"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen bg-[]]">
          <div>
            <button
              onClick={() => {
                setIsPlaying(false);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
