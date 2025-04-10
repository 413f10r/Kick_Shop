import axios from "axios";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useParams } from 'react-router-dom';

// components
import VerticalProductCard from "../components/VerticalProductCard";
import CategorySection from "../components/CategorySection";
import HorizontalProductCard from "../components/HorizontalProductCard";
import FilterSection from "../components/FilterSection";
import ListProductCard from "../components/ListProductCard";

export default function ProductPage() {
    const { addToCart, viewMode } = useGlobalContext();

    // CHIAMATA SINGOLO PRODOTTO
    const { slug } = useParams();
    const [product, setProduct] = useState([]);

    // fetch per prodotti
    const fetchProduct = () => {
        // console.log('Fetching products...')

        axios
            .get(`http://localhost:3000/products/${slug}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProduct, [slug])



    // CHIAMATA PRODOTTI CORRELATI
    const [relatedProducts, setRelatedProducts] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        // console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setRelatedProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderRelatedProducts = () => {
        return relatedProducts
            .filter((relatedProduct) => relatedProduct.brand === product.brand && relatedProduct.id !== product.id) // Filtra per brand e rimuove il prodotto principale
            .map((relatedProduct) => (
                <div
                    className={viewMode === "grid" ? "col-lg-3 col-md-4 col-sm-6 g-3" : "col-12 py-3"}
                    key={relatedProduct.id}
                >
                    {viewMode === "grid" ? (
                        <VerticalProductCard product={relatedProduct} viewMode={viewMode} />
                    ) : (
                        <ListProductCard product={relatedProduct} />
                    )}
                </div>
            ));
    };

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    // rendering prodotti in html
    const renderProducts = () => {
        return (
            <>
                <HorizontalProductCard product={product} />

                {/* prodotti correlati */}
                < h2 className="text-center my-3" >Prodotti correlati</h2 >

                <div className="px-5">
                    <FilterSection />

                    <div className={viewMode === "grid" ? "row row-cols-lg-4" : "row"}>
                        {renderRelatedProducts()}
                    </div>

                    <CategorySection />
                </div>

            </>

        )
    }

    return (
        <>
            <div>
                {renderProducts()}
            </div>

        </>
    )
};