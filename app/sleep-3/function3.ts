"use server";

import { sleep } from "./sleep";

export async function sleeper3() {
    await sleep(1000);
    return "sleeper3";
}