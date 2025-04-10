import CategorySection from "../components/CategorySection";
import WishRecap from "../components/WishRecap";

export default function WishListPage() {
    return (
        <>
            <h1 className="category-title py-3">La tua wish list</h1>
            <div className="container">
                <WishRecap />
            </div>
            <div className="px-5">
                <CategorySection />
            </div>
        </>
    );
}