"use client";

import { useState } from "react";

export function ActionDispatcher({
  action,
}: {
  action: () => Promise<unknown>;
}) {
  const [amount, setAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col gap-2 items-start">
      <label className="flex flex-col gap-2">
        How many actions should be dispatched?
        <input
          type="number"
          name="sleep"
          value={amount}
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        type="button"
        onClick={async () => {
          if (isLoading) return;

          setIsLoading(true);
          const promises = new Array(amount).fill(0).map(() => action());
          await Promise.all(promises);
          setIsLoading(false);
        }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Go!!"}
      </button>
    </div>
  );
}
