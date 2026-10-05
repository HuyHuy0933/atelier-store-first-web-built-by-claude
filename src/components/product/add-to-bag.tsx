"use client";

import { useEffect, useState } from "react";

import { BagIcon } from "@/components/icons";

// UI only until the cart exists: confirms locally and does not persist anything.
export function AddToBag({ productName, soldOut }: { productName: string; soldOut: boolean }) {
  const [added, setAdded] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifySent, setNotifySent] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2500);
    return () => clearTimeout(timer);
  }, [added]);

  if (soldOut) {
    return (
      <div className="flex flex-col gap-3">
        <button type="button" disabled className="btn w-full">
          Sold out
        </button>
        {notifySent ? (
          <p role="status" className="text-xs">
            Thank you. We&apos;ll email you when it&apos;s back.
          </p>
        ) : notifyOpen ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setNotifySent(true);
            }}
            className="flex flex-col gap-3"
          >
            <label htmlFor="notify-email" className="text-xs">
              Email me when this is back in stock
            </label>
            <input
              id="notify-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email address"
              className="input"
            />
            <button type="submit" className="btn btn-secondary w-full">
              Notify me
            </button>
          </form>
        ) : (
          <button type="button" onClick={() => setNotifyOpen(true)} className="btn btn-secondary w-full">
            Notify me when available
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={() => setAdded(true)} className="btn btn-primary w-full">
        <BagIcon />
        {added ? "Added to bag" : "Add to bag"}
      </button>
      <p role="status" className="min-h-4 text-xs">
        {added ? `${productName} was added to your bag.` : ""}
      </p>
    </div>
  );
}
