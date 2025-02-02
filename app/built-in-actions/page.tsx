import { ActionDispatcher } from "./action-dispatcher";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <ActionDispatcher />
      <ActionDispatcher />
    </div>
  );
}
