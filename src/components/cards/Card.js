import "./style.css";

export default function Card({ id, image, turned, cardBack, funcao }) {
  return (
    <img
      className="img-cards"
      src={turned ? image : cardBack}
      alt="card-back"
      onClick={() => {
        funcao(id);
      }}
    ></img>
  );
}
