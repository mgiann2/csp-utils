import { runTests } from "./test-helper.js"
import { Constraint, Variable } from "../csp-utils.js"

const tests = [
    testConstraintCreation
]

function testConstraintCreation(): boolean
{
    let name = "C1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let constraint_func = (vars) => {
        return true
    }
    let c = new Constraint(name, scope, constraint_func)
    if (c.name != name) {return false}
    if (c.constraint_func != constraint_func) {return false}
    for (let i=0; i < scope.length; i++) 
    {
        if (c.scope[i] !== scope[i]) {return false}
    }
    return true
}

runTests("Constraint Tests", tests)