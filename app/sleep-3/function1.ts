"use server";

import { sleep } from "./sleep";

export async function sleeper1() {
    await sleep(1000);
    return "sleeper1";
}