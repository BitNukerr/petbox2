export default function AboutPage() {
  return (
    <section className="container section narrow">
      <span className="eyebrow">About</span>
      <h1>Built for happier unboxings</h1>
      <p>
        PetBox is a demo storefront for pet subscription commerce. It is designed around real customer flows:
        monthly and quarterly plans, pet-specific customization, one-time add-ons, and Stripe-ready account actions.
      </p>
      <img src="/images/about-pets.svg" alt="Pets illustration" className="wide-image" />
    </section>
  );
}
