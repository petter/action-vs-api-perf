import { simple } from "./action";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <form action={simple as (data: FormData) => void}>
        <button type="submit">Simple</button>
      </form>
    </div>
  );
}
