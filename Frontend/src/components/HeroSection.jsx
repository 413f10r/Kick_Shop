import { Link } from "react-router-dom"

export default function HeroSection() {
    return (
        <div className="position-relative">
            <Link
                to={`products/adidas-predator`}
                onClick={() => window.scrollTo(0, 0)}
            >
                <figure >
                    <img src="src/assets/img/hero-section-1.webp" alt="Hero image 1" className="w-100 hero-border" />
                </figure>

                <h3 className="category-subtitle text-light position-absolute end-0 bottom-0 me-3 mb-3 d-none d-md-block">Adidas Predator</h3>

                <button className="btn category-button btn-light position-absolute start-0 bottom-0 ms-3 mb-3 fs-4" type="submit">Acquista ora</button>
            </Link>
        </div>
    )
}