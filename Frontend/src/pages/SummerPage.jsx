
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

// components
import VerticalProductCard from '../components/VerticalProductCard';
import CategorySection from '../components/CategorySection';
import ListProductCard from '../components/ListProductCard';
import FilterSection from '../components/FilterSection';

export default function SummerPage() {

    const { viewMode } = useGlobalContext();

    // CHIAMATA PRODOTTI
    const [summerProducts, setSummerProducts] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        // console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setSummerProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderSummerProducts = () => {
        return summerProducts
            .filter((summerProduct) => summerProduct.season === "estate" || summerProduct.season === "primavera") // Filtra per genere
            .map((summerProduct) => (
                <div
                    className={viewMode === "grid" ? "col-lg-3 col-md-4 col-sm-6 g-3" : "col-12 py-3"}
                    key={summerProduct.id}
                >
                    {viewMode === "grid" ? (
                        <VerticalProductCard product={summerProduct} viewMode={viewMode} />
                    ) : (
                        <ListProductCard product={summerProduct} />
                    )}
                </div>
            ));
    };

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center category-title py-3">Collezione Estate</h1>

            <figure>
                <img src="/src/assets/img/hero-summer.webp" alt="Hero image 3" className="w-100 hero-border" />
            </figure>

            <div className="px-5">
                <FilterSection />

                <div className={viewMode === "grid" ? "row row-cols-lg-4" : "row"}>
                    {renderSummerProducts()}
                </div>

                <CategorySection />
            </div>
        </>
    )
}