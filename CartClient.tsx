import SuccessClient from "@/components/SuccessClient";

export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id || "";

  return (
    <section className="container section narrow">
      <span className="eyebrow">Success</span>
      <h1>Thanks for your order</h1>
      <SuccessClient sessionId={sessionId} />
      <div className="action-row wrap top-gap">
        <a href="/account" className="btn">Go to account</a>
        <a href="/" className="btn btn-secondary">Back home</a>
      </div>
    </section>
  );
}
