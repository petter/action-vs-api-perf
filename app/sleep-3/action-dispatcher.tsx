"use client";

import { useState, useTransition } from "react";
import { sleeper1 } from "./function1";
import { sleeper2 } from "./function2";
import { sleeper3 } from "./function3";
import { sleeper4 } from "./function4";
import { sleeper5 } from "./function5";

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
            const result = await Promise.all([
              sleeper1(),
              sleeper2(),
              sleeper3(),
              sleeper4(),
              sleeper5(),
            ]);
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
