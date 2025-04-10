import { useGlobalContext } from "../context/GlobalContext";

export default function HorizontalProductCard({ product }) {
    const { addToCart, addToWish } = useGlobalContext();

    const { id, name, description, price, gender, season, brand, sizes, images, availability } = product;

    return (
        <div key={id} className="container-fluid py-3 px-5">
            <div className="card">
                <div className="row p-3 d-flex align-items-center">
                    <div id={`carousel-${id}`} className="carousel slide col-md-4 col-xl-3" data-bs-theme="dark">
                        <div className="carousel-inner cardBox">
                            {images && images.map((image, index) => {
                                const { id: imageId, image_url } = image;

                                // Aggiungi la classe "active" solo per la prima immagine
                                const className = index === 0 ? 'carousel-item active' : 'carousel-item';

                                return (
                                    <div key={imageId} className={className}>
                                        <figure className="imgBox-dimension" >
                                            <img src={image_url} alt={name} className="w-100 effectCard imgBox" />
                                        </figure>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* info prodotto */}
                    <div className="col-md-8 col-xl-9 d-flex align-items-center">
                        <div className="card-body">
                            <div className="d-flex justify-content-between flex-column flex-md-row">
                                <h5 className="card-title">{name}</h5>
                                <h5 className="card-text price"><strong>{price} €</strong></h5>
                            </div>

                            {/* metti map sizes */}

                            <hr />

                            <p className="card-text"><strong>Brand: </strong>{brand}</p>
                            <p className="card-text"><strong>Genere: </strong>{gender}</p>
                            <p className="card-text"><strong>Stagione: </strong>{season}</p>
                            <p className="card-text"><strong>Descrizione del prodotto: </strong>{description}</p>
                            <p className="card-text"><small className="text-body-secondary">La disponibilità in magazzino è di {availability} pezzi</small></p>

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