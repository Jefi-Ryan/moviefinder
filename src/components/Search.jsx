const Search = ({ searchText, setSearchText }) => {
    return (
        <div className="search">
            <label className="searchBar">
                <svg
                    className="searchIcon"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 4 4" />
                </svg>
                <input
                    type="search"
                    aria-label="Search for a movie"
                    placeholder="Search movies..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </label>
        </div>
    )
}

export default Search;