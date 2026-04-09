import Configurator from "@/components/Configurator";

export default function ConfigurePage() {
  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Configurator</span>
          <h1>Build the right box for your pet</h1>
          <p className="muted">Choose dog or cat, monthly or quarterly, then add extras and check out.</p>
        </div>
      </div>
      <Configurator />
    </section>
  );
}
