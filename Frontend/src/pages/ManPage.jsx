import axios from 'axios';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

// components
import CategorySection from '../components/CategorySection';
import FilterSection from '../components/FilterSection';
import VerticalProductCard from '../components/VerticalProductCard';
import ListProductCard from '../components/ListProductCard';

export default function ManPage() {

    const { viewMode } = useGlobalContext();

    // CHIAMATA PRODOTTI
    const [manProducts, setManProducts] = useState([]);

    // Fetch per i prodotti
    const fetchProducts = () => {
        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setManProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Rendering dei prodotti
    const renderManProducts = () => {
        return manProducts
            .filter((manProduct) => manProduct.gender === "uomo") // Filtra per genere
            .map((manProduct) => (
                <div
                    className={viewMode === "grid" ? "col-lg-3 col-md-4 col-sm-6 g-3" : "col-12 py-3"}
                    key={manProduct.id}
                >
                    {viewMode === "grid" ? (
                        <VerticalProductCard product={manProduct} viewMode={viewMode} />
                    ) : (
                        <ListProductCard product={manProduct} />
                    )}
                </div>
            ));
    };

    // Invocazione fetch al caricamento del componente
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center category-title py-3">Collezione Uomo</h1>

            <figure>
                <img src="/src/assets/img/hero-man.webp" alt="Hero image 2" className="w-100 hero-border" />
            </figure>

            <div className="px-5">
                <FilterSection />

                <div className={viewMode === "grid" ? "row row-cols-lg-4" : "row"}>
                    {renderManProducts()}
                </div>

                <CategorySection />
            </div>
        </>
    );
}