import FilterButton from "../components/FilterButton.jsx"
import { useGlobalContext } from "../context/GlobalContext.jsx";

export default function FilterSection() {

    const { viewMode, setViewMode, setFilterItems } = useGlobalContext();

    return (
        <div className="d-flex justify-content-end align-items-center py-2">
            {/* <FilterButton filter={setFilterItems} /> */}

            {/* Pulsanti per cambiare la modalità di visualizzazione */}
            <div className="d-flex gap-2">
                <button
                    className={`btn ${viewMode === "grid" ? "btn-pink" : "btn-light"}`}
                    onClick={() => setViewMode("grid")}
                >
                    <i className="fa-solid fa-grip"></i>
                </button>
                <button
                    className={`btn ${viewMode === "list" ? "btn-pink" : "btn-light"}`}
                    onClick={() => setViewMode("list")}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>
    )
}