import { useGlobalContext } from "../context/GlobalContext";

export default function FilterButton() {
    const { handleSort } = useGlobalContext();

    return (
        <div className="dropdown">
            <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Ordina per
            </button>
            <ul className="dropdown-menu">
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => handleSort('name', 'asc')}
                    >
                        Nome (A-Z)
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => handleSort('name', 'desc')}
                    >
                        Nome (Z-A)
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => handleSort('price', 'asc')}
                    >
                        Prezzo (Crescente)
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => handleSort('price', 'desc')}
                    >
                        Prezzo (Decrescente)
                    </button>
                </li>
            </ul>
        </div>
    );
}