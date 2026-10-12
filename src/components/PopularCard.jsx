import "./PopularCard.css";

const PopularCard = ({ movie, count }) => {
    console.log("PopularCard movie:", movie);
    const posterURL = movie.posterURL ? movie.posterURL : "/PosterNotFound.png";
    return (
        <div className="popular-card">
            <div className="trendingCount">#{count}</div>
            <img src={posterURL} alt={movie.searchTerm} />
        </div>
    );
}

export default PopularCard;