"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CartItem, getCart, setCart } from "@/lib/client-store";
import { money } from "@/lib/helpers";

function getCartImage(item: CartItem) {
  if (item.image) return item.image;
  if (item.type === "plan") return "/images/box-generic.svg";
  if (item.species === "cat") return "/images/cat-box.svg";
  if (item.species === "dog") return "/images/dog-box.svg";
  return "/images/box-generic.svg";
}

export default function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const refresh = () => setItems(getCart());
    refresh();
    window.addEventListener("petbox-cart-changed", refresh);
    return () => window.removeEventListener("petbox-cart-changed", refresh);
  }, []);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  function updateQty(id: string, quantity: number) {
    const next = items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item);
    setCart(next);
  }

  function removeItem(id: string) {
    setCart(items.filter((item) => item.id !== id));
  }

  return (
    <div className="container section-grid cart-layout">
      <div>
        {items.length === 0 ? (
          <div className="card">
            <div className="card-body empty-cart">
              <h2>Your cart is empty</h2>
              <p className="muted">Add a pet box, a one-time treat, or build a custom crate to get started.</p>
              <Link href="/shop" className="btn">Shop now</Link>
            </div>
          </div>
        ) : items.map((item) => (
          <article key={item.id} className="card cart-item-card">
            <div className="cart-media-wrap">
              <img src={getCartImage(item)} alt={item.title} className="cart-thumb" />
            </div>

            <div className="cart-main">
              <div className="cart-copy-top">
                <span className="tag">{item.type === "plan" ? "Subscription" : item.type === "custom-box" ? "Custom box" : item.category || "Product"}</span>
                <h3>{item.title}</h3>
                <p className="muted cart-subline">
                  {item.category || "Pet pick"}
                  {item.cadence ? ` • ${item.cadence}` : ""}
                  {item.species ? ` • ${item.species}` : ""}
                </p>
              </div>

              {item.metadata ? (
                <div className="cart-meta-row">
                  {Object.entries(item.metadata).map(([key, value]) => (
                    value ? <span key={key} className="meta-pill"><strong>{key}</strong>: {value}</span> : null
                  ))}
                </div>
              ) : null}
            </div>

            <div className="cart-actions">
              <div className="qty-row" aria-label={`Quantity for ${item.title}`}>
                <button onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
              </div>
              <strong className="cart-price">{money(item.price * item.quantity)}</strong>
              <button className="link-btn remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </article>
        ))}
      </div>
      <aside className="card summary-card">
        <div className="card-body">
          <h3>Order summary</h3>
          <p className="muted">Shipping is calculated simply for the local demo. Subscriptions and one-time products can be checked out together.</p>
          <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className="summary-line"><span>Shipping</span><strong>{subtotal > 0 ? "$8.00" : "$0.00"}</strong></div>
          <div className="summary-line total"><span>Total</span><strong>{money(subtotal + (subtotal > 0 ? 8 : 0))}</strong></div>
          <Link href="/checkout" className="btn full">Checkout</Link>
        </div>
      </aside>
    </div>
  );
}
