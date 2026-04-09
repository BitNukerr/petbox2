import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Shop</span>
          <h1>Pet treats, toys, and care add-ons</h1>
        </div>
      </div>
      <div className="grid three">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
