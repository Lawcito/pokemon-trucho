import "./App.css";
import Card from "./components/Card";
import { attack, startGame } from "./utils/function";
import { useEffect, useState } from "react";
import bgBattle from "./assets/battleBackground.jpg";
import background from "./assets/background.png";
import pikaWin from "./assets/pikachuWin.gif";
import squirtWin from "./assets/squirtleWin.gif";
import charWin from "./assets/charmanderWin.gif";
import onixWin from "./assets/onixWin.gif";

function App() {
  const [player, setPlayer] = useState(undefined);
  const [computer, setComputer] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [log, setLog] = useState("");
  const [attacker, setAttacker] = useState("");
  const [winner, setWinner] = useState(undefined);

  function startNewGame() {
    let players = startGame(); // Asumo que `startGame` devuelve dos pokémon
    setPlayer(players[0]);
    setComputer(players[1]);
    setWinner(undefined);
    setLog("");
    setAttacker("");
    setIsPlaying(false);
  }

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

  useEffect(() => {
    startNewGame(); // Inicia el juego al cargar
  }, []);

  return (
    <div className="font-bold bg-[#000]">
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
            <div className="w-1/4 border-4 rounded border-[#282d29] bg-[#fcfbfc]">
              <div className="w-full h-full border-double border-r-8 border-l-8 border-[#91715a] items-center flex">
                <button
                  onClick={() => damageDealt()}
                  className="w-2/4 text-[#4e4d52] hover:before:content-['➤'] hover:before:absolute hover:before:left-12"
                >
                  Attack
                </button>
              </div>
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
        <div
          className="h-screen"
          style={{
            background: `url(${background})`,
            backgroundSize: "50%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <button
            className="flex w-full h-full justify-center items-center animate-pulse text-white font-mono"
            onClick={() => {
              setIsPlaying(true);
            }}
          >
            Presione la pantalla para comenzar
          </button>
        </div>
      ) : (
        <div className="h-screen bg-black flex justify-center items-center">
          <div className="text 2xl m-32 items-center flex justify-center flex-col">
            <p>El ganador es {winner.name}</p>
            {winner.name == "charmander" ? (
              <img className="w-40 h-40" src={charWin}></img>
            ) : winner.name == "pikachu" ? (
              <img className="w-40 h-40" src={pikaWin}></img>
            ) : winner.name == "squirtle" ? (
              <img className="w-40 h-40" src={squirtWin}></img>
            ) : winner.name == "onix" ? (
              <img className="w-40 h-40" src={onixWin}></img>
            ) : (
              false
            )}
            <div>
              {winner != computer ? <p>Has ganado</p> : <p>Has perdido</p>}
            </div>
            <button
              onClick={startNewGame}
              className="mt-4 px-4 py-2 w-3/4 border-4 rounded border-[#282d29] bg-[#fcfbfc] text-[#4e4d52]"
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
