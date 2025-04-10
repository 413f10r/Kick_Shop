import CategorySection from "../components/CategorySection";
import ResultSearch from "../components/ResultSearch";
import { useGlobalContext } from "../context/GlobalContext";




export default function SearchPage() {

    const { searchProducts } = useGlobalContext();

    return (
        <>
            <h1 className='category-title py-3'>Risultati della ricerca</h1>

            <div className="container-fluid">

                {
                    searchProducts.length > 0 ? (
                        <ResultSearch items={searchProducts} />
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                            <p className="text-muted">Nessun prodotto trovato.</p>
                        </div>

                    )
                }

                <CategorySection />
            </div>



        </>
    )
};