import { sleep } from "../sleep-3/sleep";

export function ActionDispatcher() {
  async function action() {
    "use server";
    await sleep(1000);
  }
  return (
    <form action={action}>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        type="submit"
      >
        Go!
      </button>
    </form>
  );
}
