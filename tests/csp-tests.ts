import { runTests } from "./test-helper.js";
import { CSP, Constraint, Variable } from "../csp-utils.js";

const tests = [
    testCSPCreation
]

function testCSPCreation(): boolean 
{
    let name = "CSP 1"
    let csp = new CSP(name);
    if (csp.name !== name){return false}
    return true
}

runTests("CSP Tests", tests)