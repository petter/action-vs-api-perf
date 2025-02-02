"use client";

import { useState, useTransition } from "react";
import { composedAction } from "./composed-functions";

export function ActionDispatcher() {
  const [result, setResult] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        type="button"
        onClick={async () => {
          if (isPending) return;

          startTransition(async () => {
            const result = await composedAction();
            setResult(result);
          });
        }}
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Go!!"}
      </button>

      {result.map((r) => (
        <div key={r}>{r}</div>
      ))}
    </div>
  );
}
