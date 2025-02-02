"use server";

import { sleep } from "./sleep";

export async function sleeper5() {
    await sleep(1000);
    return "sleeper5";
}