import { Link, useNavigate } from "react-router-dom";
import WishRecap from "./WishRecap";

export default function WishSection() {
    const navigate = useNavigate();

    const handleWishlistNavigation = () => {
        navigate("/wish"); // Naviga alla pagina di wishlist
        window.scrollTo(0, 0); // Scrolla verso l'alto
    };

    return (
        <>
            <div className="offcanvas offcanvas-start" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLeftLabel">Prodotti nella Wishlist</h5>
                    <button
                        type="button"
                        className="btn-close btn-outline-danger"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>

                <WishRecap />

                <Link
                    type="button"
                    className="btn btn-primary mx-3 my-3"
                    onClick={() => {
                        handleWishlistNavigation()
                    }}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    Vai alla tua Wish List
                </Link>
            </div>
        </>
    );
}