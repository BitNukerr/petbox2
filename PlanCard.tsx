import CheckoutClient from "@/components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="container section-heading">
        <div>
          <span className="eyebrow">Checkout</span>
          <h1>Secure payment with Stripe</h1>
        </div>
      </div>
      <CheckoutClient />
    </section>
  );
}
