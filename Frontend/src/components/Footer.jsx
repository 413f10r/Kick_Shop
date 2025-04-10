import { Link } from "react-router-dom";

export default function Footer({ className = "" }) {
    return (
        <footer className={`footer-container bg-dark text-light py-4 px-4 ${className}`}>
            <div className="container">
                <div className="row">
                    {/* Sezione Navigazione */}
                    <div className="col-md-4 mb-3">
                        <h5 className="footer-title">Navigazione</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link onClick={() => window.scrollTo(0, 0)}
                                    to="/"
                                    className="footer-link">
                                    Home
                                </Link>
                            </li>

                            <div>
                                <li>
                                    <Link
                                        onClick={() => window.scrollTo(0, 0)}
                                        to="/man"
                                        className="footer-link">
                                        Uomo
                                    </Link>
                                </li>
                                <Link
                                    onClick={() => window.scrollTo(0, 0)}
                                    to="/woman"
                                    className="footer-link">
                                    Donna
                                </Link>
                            </div>

                            <li>
                                <Link
                                    onClick={() => window.scrollTo(0, 0)} to="/summer"
                                    className="footer-link">
                                    Estate
                                </Link>
                            </li>

                            <li>
                                <Link
                                    onClick={() => window.scrollTo(0, 0)}
                                    to="/winter"
                                    className="footer-link">
                                    Inverno
                                </Link>
                            </li>


                            <li>
                                <Link
                                    onClick={() => window.scrollTo(0, 0)}
                                    to="/ballon"
                                    className="footer-link">
                                    Palloni
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Sezione Contatti */}
                    <div className="col-md-4 mb-3">
                        <h5 className="footer-title">Contatti</h5>
                        <p className="mb-1">Email: support@kickshop.com</p>
                        <p className="mb-1">Telefono: +39 123 456 789</p>
                        <p>Indirizzo: Via Roma, 123, Milano</p>
                    </div>

                    {/* Sezione Social Media */}
                    <div className="col-md-4 mb-3">
                        <h5 className="footer-title">Seguici</h5>
                        <div className="d-flex gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <i className="fa-brands fa-facebook fa-2x"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <i className="fa-brands fa-instagram fa-2x"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <i className="fa-brands fa-x-twitter fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="bg-light" />
                <div className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} Kick Shop. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    );
}