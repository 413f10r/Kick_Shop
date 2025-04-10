import { useGlobalContext } from "../context/GlobalContext";
import FilterButton from "./FilterButton";
import FilterSection from "./FilterSection";
import ListProductCard from "./ListProductCard";
import VerticalProductCard from "./VerticalProductCard";


export default function ResultSearch({ items }) {
    const { searchProducts, viewMode} = useGlobalContext();

 
    return (
        <div className="px-5 pb-3">
            <div className="d-flex justify-content-between align-items-center py-2">
                <p className="text-gray-400 text-sm mb-0">
                    Prodotti trovati: {items.length}
                </p>

                <div className="d-flex align-items-center gap-2">
                    <FilterButton />
                    <FilterSection />
                </div>
            </div>

            {/* Aggiunto il controllo per mostrare "Nessun risultato" quando non ci sono prodotti */}
            {searchProducts && searchProducts.length === 0 ? (
                <p className="text-gray-400">Nessun risultato</p>
            ) : (
                <div className={viewMode === "grid" ? "row row-cols-lg-4" : "row"}>
                    {searchProducts && searchProducts.length > 0 && searchProducts.map((item) => (
                        <div
                            className={viewMode === "grid" ? "col-lg-3 col-md-4 col-sm-6 g-3" : "col-12 py-3"}
                            key={item.id}
                        >
                            {viewMode === "grid" ? (
                                <VerticalProductCard product={item} viewMode={viewMode} />
                            ) : (
                                <ListProductCard product={item} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
