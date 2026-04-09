"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="container section narrow">
      <span className="eyebrow">Contact</span>
      <h1>Talk to the PetBox team</h1>
      <p className="muted">This form is front-end only in the demo project.</p>
      <div className="card">
        <div className="card-body form-grid">
          <input placeholder="Your name" />
          <input placeholder="Email" />
          <input placeholder="Subject" className="span-2" />
          <textarea placeholder="How can we help?" className="span-2 textarea" />
          <button className="btn span-2" onClick={() => setSent(true)}>Send message</button>
          {sent ? <p className="success-text span-2">Message UI submitted. Connect this to email or a CRM next.</p> : null}
        </div>
      </div>
    </section>
  );
}
