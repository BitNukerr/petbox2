import AccountClient from "@/components/AccountClient";

export default function AccountPage() {
  return (
    <section className="section">
      <div className="container section-heading">
        <div>
          <span className="eyebrow">Account</span>
          <h1>Manage subscription and billing</h1>
        </div>
      </div>
      <AccountClient />
    </section>
  );
}
