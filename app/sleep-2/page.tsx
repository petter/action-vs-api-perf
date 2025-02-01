import { ActionDispatcher } from "./action-dispatcher";

export default function Page() {
  async function withSleep() {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "OK";
  }

  return <ActionDispatcher action={withSleep} />;
}
