"use client";

import { useMemo, useState } from "react";
import { addToCart } from "@/lib/client-store";
import { money } from "@/lib/helpers";
import { useRouter } from "next/navigation";

export default function Configurator() {
  const router = useRouter();
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [size, setSize] = useState("medium");
  const [cadence, setCadence] = useState<"monthly" | "quarterly">("monthly");
  const [theme, setTheme] = useState("playful");
  const [extras, setExtras] = useState<string[]>(["treats"]);

  const base = cadence === "monthly" ? 39 : 99;
  const extraPrice = extras.length * 6;
  const total = base + extraPrice;

  const summary = useMemo(() => ({
    species,
    size,
    cadence,
    theme,
    extras: extras.join(", ") || "none"
  }), [species, size, cadence, theme, extras]);

  function toggleExtra(extra: string) {
    setExtras((prev) => prev.includes(extra) ? prev.filter((item) => item !== extra) : [...prev, extra]);
  }

  function addConfigured(goCheckout = false) {
    addToCart({
      id: `custom-${Date.now()}`,
      slug: "custom-pet-box",
      title: `${cadence === "monthly" ? "Monthly" : "Quarterly"} Custom ${species === "dog" ? "Dog" : "Cat"} Box`,
      price: total,
      quantity: 1,
      type: "custom-box",
      cadence,
      species,
      category: "Custom Box",
      metadata: {
        size,
        theme,
        extras: extras.join(", "),
      }
    });
    router.push(goCheckout ? "/checkout" : "/cart");
  }

  return (
    <div className="configurator">
      <div className="config-grid">
        <div className="card">
          <div className="card-body">
            <h2>Build your pet box</h2>

            <div className="field-block">
              <label>Pet type</label>
              <div className="pill-row">
                {["dog", "cat"].map((value) => (
                  <button key={value} className={`pill ${species === value ? "active" : ""}`} onClick={() => setSpecies(value as "dog" | "cat")}>
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <label>Pet size</label>
              <div className="pill-row">
                {["small", "medium", "large"].map((value) => (
                  <button key={value} className={`pill ${size === value ? "active" : ""}`} onClick={() => setSize(value)}>{value}</button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <label>Delivery</label>
              <div className="pill-row">
                {["monthly", "quarterly"].map((value) => (
                  <button key={value} className={`pill ${cadence === value ? "active" : ""}`} onClick={() => setCadence(value as "monthly" | "quarterly")}>{value}</button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <label>Theme</label>
              <div className="pill-row">
                {["playful", "cozy", "outdoor", "calm"].map((value) => (
                  <button key={value} className={`pill ${theme === value ? "active" : ""}`} onClick={() => setTheme(value)}>{value}</button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <label>Extras</label>
              <div className="check-grid">
                {["treats", "toy upgrade", "care item", "photo accessory"].map((value) => (
                  <label key={value} className="check-item">
                    <input type="checkbox" checked={extras.includes(value)} onChange={() => toggleExtra(value)} />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="action-row wrap">
              <button className="btn" onClick={() => addConfigured(false)}>Add to cart</button>
              <button className="btn btn-secondary" onClick={() => addConfigured(true)}>Buy now</button>
            </div>
          </div>
        </div>

        <div className="card preview-card">
          <div className="card-body">
            <img src={species === "dog" ? "/images/dog-box.svg" : "/images/cat-box.svg"} alt="Pet box preview" className="preview-image" />
            <span className="tag">Live summary</span>
            <h3>{cadence === "monthly" ? "Monthly" : "Quarterly"} {species === "dog" ? "Dog" : "Cat"} Box</h3>
            <ul className="summary-list">
              <li><strong>Size:</strong> {summary.size}</li>
              <li><strong>Theme:</strong> {summary.theme}</li>
              <li><strong>Extras:</strong> {summary.extras}</li>
              <li><strong>Delivery:</strong> {summary.cadence}</li>
            </ul>
            <p className="price">{money(total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
