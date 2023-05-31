import "./style.css";
import cardBack from "./assets/card-back.png";
import cards from "./cards";
import { useState } from "react";
import Card from "./components/cards/Card";
import congrats from "./assets/congrats.png";

function Main() {
  let images = [];
  let contador = [];
  while (images.length < cards.length) {
    const numAleatorio = cards[Math.floor(Math.random() * cards.length)];
    !images.includes(numAleatorio) && images.splice(0, 0, numAleatorio);
  }

  const [cartas, setCartas] = useState(images);

  function handleCardClick(id) {
    const cartaClicada = cartas.findIndex((carta) => carta.id === id);
    const novaCarta = { ...cartas[cartaClicada], turned: true };
    let listaDeCartas = [...cartas];
    listaDeCartas.splice(cartaClicada, 1, novaCarta);
    setCartas(listaDeCartas);

    contador = listaDeCartas.filter((element) => element.turned === true);

    if (contador.length === 2) {
      if (contador[0].slug === contador[1].slug) {
        setTimeout(() => {
          listaDeCartas = listaDeCartas.filter(
            (element) => element.turned === false
          );
          setCartas(listaDeCartas);
        }, 380);
        return;
      }

      setTimeout(() => {
        listaDeCartas = listaDeCartas.map((element) => {
          return { ...element, turned: false };
        });
        setCartas(listaDeCartas);
      }, 380);
    }
  }
  return (
    <div className="container">
      <div className="side-bar">
        <h1>CUBOS PUZZLE</h1>
        <button className="reset" onClick={() => window.location.reload()}>
          RESET
        </button>
      </div>
      <div className="cards">
        {cartas.map(({ id, image, turned }) => (
          <Card
            key={id}
            image={image}
            turned={turned}
            id={id}
            cardBack={cardBack}
            funcao={handleCardClick}
          />
        ))}
        <img
          alt="parabens"
          id="congrats"
          src={congrats}
          style={cartas.length ? { display: "none" } : { display: "block" }}
        ></img>
      </div>
    </div>
  );
}

export default Main;
