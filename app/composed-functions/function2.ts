"use server";

import { sleep } from "./sleep";

export async function sleeper2() {
    await sleep(1000);
    return "sleeper2";
}