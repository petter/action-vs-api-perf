"use server";

import { sleep } from "./sleep";

export async function sleeper4() {
    await sleep(1000);
    return "sleeper4";
}