import axios from 'axios';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

// components
import VerticalProductCard from '../components/VerticalProductCard';
import CategorySection from '../components/CategorySection';
import FilterSection from '../components/FilterSection';
import ListProductCard from '../components/ListProductCard';

export default function BallonPage() {
    const [ballonProducts, setBallonProducts] = useState([]);
    const { viewMode } = useGlobalContext();

    // Fetch per i prodotti
    const fetchProducts = () => {
        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                // console.log("Prodotti ricevuti:", res.data);
                setBallonProducts(res.data);
            })
            .catch((error) => {
                console.error("Errore durante il fetch dei prodotti:", error);
            });
    };

    // Rendering dei prodotti
    const renderBallonProducts = () => {
        return ballonProducts
            .filter((ballonProduct) => ballonProduct.slug && ballonProduct.slug.includes("ball"))
            .map((ballonProduct) => (
                <div
                    className={viewMode === "grid" ? "col-lg-3 col-md-4 col-sm-6 g-3" : "col-12 py-3"}
                    key={ballonProduct.id}
                >
                    {viewMode === "grid" ? (
                        <VerticalProductCard product={ballonProduct} viewMode={viewMode} />
                    ) : (
                        <ListProductCard product={ballonProduct} />
                    )}
                </div>
            ));
    };

    // Invocazione fetch al caricamento del componente
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center category-title py-3">PALLONI DA COLLEZIONE</h1>

            <div className="px-5">
                <FilterSection />

                <div className={viewMode === "grid" ? "row row-cols-lg-4" : "row"}>
                    {ballonProducts.length > 0 ? (
                        renderBallonProducts()
                    ) : (
                        <p className="text-center">Nessun prodotto trovato.</p>
                    )}
                </div>

                <CategorySection />
            </div>
        </>
    );
}