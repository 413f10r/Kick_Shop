import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Search from "./Search";


export default function Header() {
    const { wish, cart, navigate } = useGlobalContext();

    // Funzione per chiudere la navbar
    const closeNavbar = () => {
        const navbar = document.getElementById("navbarSupportedContent");
        if (navbar && navbar.classList.contains("show")) {
            navbar.classList.remove("show");
        }
    };

    return (
        <header className="fixed-top">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    {/* Logo */}
                    <NavLink
                        className="navbar-brand"
                        to={`/`}
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    >
                        <img
                            className="img-fluid rounded"
                            width="60px"
                            src="/src/assets/img/logo-kick-shop.png"
                            alt="Logo Kick Shop"
                        />
                    </NavLink>

                    {/* Navbar toggler */}
                    <i 
                        className="fa-solid fa-bars icon_bars navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        
                    </i>
                    

                    {/* Navbar links */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link font-nav-header ${isActive ? "text-light underline" : "text-light"}`
                                    }
                                    to={`/`}
                                    onClick={() => {
                                        navigate(`/`);
                                        window.scrollTo(0, 0);
                                        closeNavbar(); // Chiudi la navbar
                                    }}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link font-nav-header ${isActive ? "text-light underline" : "text-light"}`
                                    }
                                    to={`/man`}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        closeNavbar(); // Chiudi la navbar
                                    }}
                                >
                                    Uomo
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link font-nav-header ${isActive ? "text-light underline" : "text-light"}`
                                    }
                                    to={`/woman`}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        closeNavbar(); // Chiudi la navbar
                                    }}
                                >
                                    Donna
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link font-nav-header ${isActive ? "text-light underline" : "text-light"}`
                                    }
                                    to={`/summer`}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        closeNavbar(); // Chiudi la navbar
                                    }}
                                >
                                    Estate
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link font-nav-header ${isActive ? "text-light underline" : "text-light"}`
                                    }
                                    to={`/winter`}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        closeNavbar(); // Chiudi la navbar
                                    }}
                                >
                                    Inverno
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link font-nav-header ${isActive ? "text-light underline" : "text-light"}`
                                    }
                                    to={`/ballon`}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        closeNavbar(); // Chiudi la navbar
                                    }}
                                >
                                    Palloni
                                </NavLink>
                            </li>
                        </ul>

                        {/* Wishlist */}
                        <div className="icon-wishlist-container" style={{ width: "40px", height: "40px" }}>
                            <NavLink
                                className="me-2 mb-3 mb-lg-0"
                                to={`/wish`}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    closeNavbar(); // Chiudi la navbar
                                }}
                            >
                                <i
                                    className="fa-solid fa-heart custom-heart"
                                    onMouseEnter={(e) => (e.target.style.color = "red")}
                                    onMouseLeave={(e) => (e.target.style.color = "")}
                                ></i>
                            </NavLink>
                            {wish.length > 0 && (
                                <span className="notification-badge">
                                    <strong>{wish.length}</strong>
                                </span>
                            )}
                        </div>

                        {/* Carrello */}
                        <div className="icon-cart-container" style={{ width: "40px", height: "40px" }}>
                            <NavLink
                                className="me-2 mb-3 mb-lg-0"
                                to={`/checkout`}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    closeNavbar(); // Chiudi la navbar
                                }}
                            >
                                <i
                                    className="fa-solid fa-cart-shopping custom-cart"
                                    onMouseEnter={(e) => (e.target.style.color = "green")}
                                    onMouseLeave={(e) => (e.target.style.color = "")}
                                ></i>
                            </NavLink>
                            {cart.length > 0 && (
                                <span className="notification-badge">
                                    <strong>{cart.length}</strong>
                                </span>
                            )}
                        </div>

                        {/* Search */}
                        <Search />
                    </div>
                </div>
            </nav>
        </header>
    );
}