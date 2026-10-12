import './Oops.css';
const Oops = ({ message }) => {
    return (
        <div className="errorMessage">
            <h1>{message}</h1>
        </div>
    )
}

export default Oops;