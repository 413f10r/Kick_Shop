import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export default function ListProductCard({ product }) {
    const { addToCart, addToWish } = useGlobalContext();

    const { id, name, price, images, slug, description } = product;

    return (
        <div key={id}>
            <div className="card">
                <div className="row p-4">
                    <div id={`carousel-${id}`} className="col-md-5 d-flex gap-3" data-bs-theme="dark">
                        {images && images.map((image) => {
                            const { id: imageId, image_url } = image;

                            return (
                                <Link
                                    className="imgBox-dimension"
                                    key={imageId}
                                    to={`/products/${slug}`}

                                >
                                    <img
                                        src={image_url}
                                        alt={name}
                                        className="w-100 effectCard imgBox"
                                        onClick={() => window.scrollTo(0, 0)}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* info prodotto */}
                    <div className="col-md-7 d-flex align-items-center">
                        <div className="card-body d-flex flex-column gap-3 gap-xl-5">
                            <Link
                                className="d-flex justify-content-between flex-column flex-lg-row"
                                to={`/products/${slug}`}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <h5 className="card-title fs-2">{name}</h5>
                                <h5 className="card-text price fs-2"><strong>{price} €</strong></h5>
                            </Link>

                            <p><strong>Descrizione del prodotto:</strong> {description}</p>

                            <div className="d-flex justify-content-between gap-3">
                                {/* bottone per aggiunta del prodotto alla whishlist */}
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => addToWish(product)} // Aggiunge il prodotto alla wishlist
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasLeft" // ID della canvas
                                    aria-controls="offcanvasLeft"
                                >
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                                {/* bottone per aggiunta del prodotto al carrello */}
                                <button
                                    className="btn btn-success w-100"
                                    onClick={() => addToCart(product)}
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight"
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}