export default function Page() {
  async function withSleep() {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "OK";
  }

  return (
    <form action={withSleep as (formData: FormData) => void}>
      <button type="submit">Sleep</button>
    </form>
  );
}
