import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";

export default function HomePage() {
    return (
        <>
            <h1 className="text-center py-3 font">Kick Shop</h1>

            <HeroSection />

            <div className="px-5">
                <CategorySection />
            </div>

            {/* <h2 className="text-center">Tutta la collezione</h2>

            <div className="mx-5 mb-5">
                <div className="row row-cols-lg-4">
                    {renderProducts()}
                </div>
            </div> */}
        </>
    )
}