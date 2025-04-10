import { useGlobalContext } from "../context/GlobalContext";


export default function Search() {
    const { query, setQuery, handleSubmit } = useGlobalContext();

    const handleInputChange = (e) => {
        setQuery(e.target.value); // Solo aggiornamento del valore in context
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === "") return;

        handleSubmit(query); // Tutta la logica ora è gestita nel context
    };



    return (
        <form className="d-flex px-2" role="search" onSubmit={handleFormSubmit}>
        <input
            className="form-control me-2"
            type="text"
            placeholder="Cerca"
            aria-label="Cerca"
            value={query}
            onChange={handleInputChange}
        />
        <button className="btn btn-light" type="submit" data-bs-dismiss="offcanvas"
                aria-label="Close">
                Cerca
            </button>
    </form>
    );
}
