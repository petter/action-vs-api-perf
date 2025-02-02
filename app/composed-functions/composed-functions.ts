"use server"

import { sleeper1 } from "./function1";
import { sleeper2 } from "./function2";
import { sleeper3 } from "./function3";
import { sleeper4 } from "./function4";
import { sleeper5 } from "./function5";

export async function composedAction() {
    return Promise.all([
        sleeper1(),
        sleeper2(),
        sleeper3(),
        sleeper4(),
        sleeper5(),
    ])
}