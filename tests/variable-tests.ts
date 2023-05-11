import { runTests } from "./test-helper.js"
import { Variable } from "../csp-utils.js"

const tests = [
    testVariableCreation
]

function testVariableCreation(): boolean
{
    let name = "Var 1"
    let domain = ['1', '2', '3']
    let v = new Variable(name, domain)
    if (v.name !== name) {return false}
    if (v.domain.toString() !== domain.toString()) {return false}
    if (v.curr_domain.toString() !== new Array(domain.length).fill(true).toString()) {return false}
    if (v.assigned_val !== null) {return false}
    return true
}

runTests("Variable Tests", tests)