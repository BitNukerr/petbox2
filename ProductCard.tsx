import CartClient from "@/components/CartClient";

export default function CartPage() {
  return (
    <section className="section">
      <div className="container section-heading">
        <div>
          <span className="eyebrow">Cart</span>
          <h1>Review your pet picks</h1>
        </div>
      </div>
      <CartClient />
    </section>
  );
}
