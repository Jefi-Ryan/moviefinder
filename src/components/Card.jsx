const Card = ({ imgPath, movieName, movieRating }) => {
  return (
    <div className="card">
      <img
        width="200"
        height="300"
        src={imgPath ? `https://image.tmdb.org/t/p/w500${imgPath}` : "/PosterNotFound.png"}
        alt={movieName}
      />
      <div>
        <h1>{movieName}</h1>
        <p>{movieRating}</p>
      </div>
    </div>
  );
};

export default Card;