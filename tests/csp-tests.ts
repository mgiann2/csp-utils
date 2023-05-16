import { runTests } from "./test-helper.js";
import { CSP, Constraint, Variable } from "../csp-utils.js";

const tests = [
    testCSPCreation,
    testAllVarsAssignedFalse,
    testAllVarsAssignedTrue
]

function testCSPCreation(): boolean 
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let constraintFunc = (vars) => {
        return true
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new CSP(name, constraints)

    if (csp.name !== name){return false}
    for(let i = 0; i < scope.length; i++)
    {
        if(!csp.variables.includes(scope[i]))
        {
            return false
        }
    }
    if (!csp.constraints.includes(c)){return false}

    return true
}

function testAllVarsAssignedFalse(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    v1.assignValue('1')
    v2.assignValue('2')
    v3.assignValue('3')
    let constraintFunc = (vars) => {
        return true
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new CSP(name, constraints)
    
    return csp.allVarsAssigned()
}

function testAllVarsAssignedTrue(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    v1.assignValue('1')
    v2.assignValue('2')
    let constraintFunc = (vars) => {
        return true
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new CSP(name, constraints)
    
    return !csp.allVarsAssigned()
}

runTests("CSP Tests", tests)