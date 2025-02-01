
export async function POST() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Response("OK");
}