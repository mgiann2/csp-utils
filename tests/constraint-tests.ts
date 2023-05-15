import { runTests } from "./test-helper.js"
import { Constraint, Variable } from "../csp-utils.js"

const tests = [
    testConstraintCreation,
    testAllVarsAssignedTrue,
    testAllVarsAssignedFalse,
    testIsSatisfiedTrue,
    testIsSatisfiedFalse
]

function testConstraintCreation(): boolean
{
    let name = "C1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let constraintFunc = (vars) => {
        return true
    }
    let c = new Constraint(name, scope, constraintFunc)
    if (c.name != name) {return false}
    if (c.constraintFunc != constraintFunc) {return false}
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
    let constraintFunc = (vars) => {
        return true
    }
    v1.assignValue('1')
    v2.assignValue('2')
    v3.assignValue('3')
    let c = new Constraint(name, scope, constraintFunc)
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
    let constraintFunc = (vars) => {
        return true
    }
    v1.assignValue('1')
    v2.assignValue('2')
    let c = new Constraint(name, scope, constraintFunc)
    return !c.allVarsAssigned()
}

function testIsSatisfiedTrue(): boolean
{
    let name = "C1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let constraintFunc = (vars) => {
        return true
    }
    v1.assignValue('1')
    v2.assignValue('2')
    v3.assignValue('3')
    let c = new Constraint(name, scope, constraintFunc)
    return c.isSatisfied()
}

function testIsSatisfiedFalse(): boolean
{
    let name = "C1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let allDiff = (vars: Variable[]) => {
        for(let i=0; i < vars.length; i++) 
        {
            for(let j=0; j < vars.length; j++) 
            {
                if(i !== j && vars[i].assigned_val === vars[j].assigned_val) 
                {
                    return false
                }
            }
        }
        return true
    }
    v1.assignValue('1')
    v2.assignValue('2')
    v3.assignValue('2')
    let c = new Constraint(name, scope, allDiff)
    return !c.isSatisfied()
}

runTests("Constraint Tests", tests)