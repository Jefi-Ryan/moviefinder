import PopularCard from "./PopularCard";
import "./Suggested.css";

const Suggested = ({ movies }) => {
    console.log("Suggested movies:", movies);
    return (
        <section className="suggestedSection">
            <h2 className="suggestedTitle">Trending</h2>
            <div className="suggestedContainer">
                {movies.map((movie, index) => (
                    <PopularCard
                        key={movie.$id}
                        movie={movie}
                        count={index + 1}
                    />
                ))}
            </div>
        </section>
    )
}

export default Suggested;