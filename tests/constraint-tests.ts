import { runTests } from "./test-helper.js"
import { Constraint, Variable } from "../csp-utils.js"

const tests = [
    testConstraintCreation,
    testAllVarsAssignedTrue,
    testAllVarsAssignedFalse
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

function testAllVarsAssignedTrue(): boolean
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
    v1.assignValue('1')
    v2.assignValue('2')
    v3.assignValue('3')
    let c = new Constraint(name, scope, constraint_func)
    return c.allVarsAssigned()
}

function testAllVarsAssignedFalse(): boolean
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
    v1.assignValue('1')
    v2.assignValue('2')
    let c = new Constraint(name, scope, constraint_func)
    return !c.allVarsAssigned()
}

runTests("Constraint Tests", tests)