// components/HeartButton.js
// Botón corazón para añadir/quitar un libro de la wishlist

import { useState } from "react";

export default function HeartButton({ libro, user, isInWishlist, onToggle, onNeedLogin }) {
  const [animating, setAnimating] = useState(false);
  const active = isInWishlist(libro.slug);

  async function handleClick(e) {
    e.stopPropagation();

    if (!user) {
      onNeedLogin?.();
      return;
    }

    setAnimating(true);
    await onToggle(libro);
    setTimeout(() => setAnimating(false), 400);
  }

  return (
    <>
      <button
        className={`heart-btn ${active ? "active" : ""} ${animating ? "pop" : ""}`}
        onClick={handleClick}
        title={active ? "Quitar de mi lista" : "Añadir a mi lista"}
        aria-label={active ? "Quitar de mi lista" : "Añadir a mi lista"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <style jsx>{`
        .heart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 0.5px solid #D3D1C7;
          background: #fff;
          color: #C8C6BD;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .heart-btn:hover {
          border-color: #e8788a;
          color: #e8788a;
          background: #FFF0F2;
        }
        .heart-btn.active {
          border-color: #e8788a;
          color: #e8788a;
          background: #FFF0F2;
        }
        .heart-btn.pop {
          transform: scale(1.3);
        }
      `}</style>
    </>
  );
}
