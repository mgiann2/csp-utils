import { runTests } from "./test-helper.js";
import { CSP, Constraint, Variable } from "../csp-utils.js";

class TestCSP extends CSP
{
    pickVariable(): Variable
    {
        return super.pickVariable()
    }
}

const tests = [
    testCSPCreation,
    testAllVarsAssignedFalse,
    testAllVarsAssignedTrue,
    testPickVariable,
    testPickVariableAssigned,
    testBTSolve,
    testBTSolveMultipleConstraints,
    testBTSolveUnsolvable,
    testGACSolve,
    testGACSolveMultipleConstraints,
    testGACSolveUnsolvable
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

function testPickVariable()
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    v3.curr_domain = [true, true, false]
    let scope = [v1, v2, v3]
    let constraintFunc = (vars) => {
        return true
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new TestCSP(name, constraints)
    return csp.pickVariable() == v3
}

function testPickVariableAssigned()
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    v1.assignValue('1')
    let v2 = new Variable("V2", domain)
    v2.assignValue('2')
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let constraintFunc = (vars) => {
        return true
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new TestCSP(name, constraints)
    return csp.pickVariable() == v3
}

function testBTSolve(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let constraintFunc = (vars: Variable[]) => {
        return vars[0].assigned_val === '3' && vars[1].assigned_val === '2' && vars[2].assigned_val === '1'
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new TestCSP(name, constraints)
    if(!csp.backtrackSolve()){return false}
    return constraintFunc(csp.variables)
}

function testBTSolveMultipleConstraints(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let consFunc1 = (vars: Variable[]) => {
        return vars[0].assigned_val === '3'
    }
    let consFunc2 = (vars: Variable[]) => {
        return vars[0].assigned_val === '2'
    }
    let consFunc3 = (vars: Variable[]) => {
        return vars[0].assigned_val === '1'
    }
    let c1 = new Constraint("C1", [v1], consFunc1)
    let c2 = new Constraint("C2", [v2], consFunc2)
    let c3 = new Constraint("C3", [v3], consFunc3)
    let constraints = [c1, c2, c3]
    let csp = new TestCSP(name, constraints)
    if(!csp.backtrackSolve()){return false}
    return v1.assigned_val === '3' && v2.assigned_val === '2' && v3.assigned_val === '1'
}

function testBTSolveUnsolvable(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    v3.assignValue('3')
    let scope = [v1, v2, v3]
    let constraintFunc = (vars: Variable[]) => {
        return vars[0].assigned_val === '3' && vars[1].assigned_val === '2' && vars[2].assigned_val === '1'
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new TestCSP(name, constraints)
    return !csp.backtrackSolve()
}

function testGACSolve(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let scope = [v1, v2, v3]
    let constraintFunc = (vars: Variable[]) => {
        return vars[0].assigned_val === '3' && vars[1].assigned_val === '2' && vars[2].assigned_val === '1'
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new TestCSP(name, constraints)
    if(!csp.GACSolve()){return false}
    return constraintFunc(csp.variables)
}

function testGACSolveMultipleConstraints(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    let consFunc1 = (vars: Variable[]) => {
        return vars[0].assigned_val === '3'
    }
    let consFunc2 = (vars: Variable[]) => {
        return vars[0].assigned_val === '2'
    }
    let consFunc3 = (vars: Variable[]) => {
        return vars[0].assigned_val === '1'
    }
    let c1 = new Constraint("C1", [v1], consFunc1)
    let c2 = new Constraint("C2", [v2], consFunc2)
    let c3 = new Constraint("C3", [v3], consFunc3)
    let constraints = [c1, c2, c3]
    let csp = new TestCSP(name, constraints)
    if(!csp.GACSolve()){return false}
    return v1.assigned_val === '3' && v2.assigned_val === '2' && v3.assigned_val === '1'
}

function testGACSolveUnsolvable(): boolean
{
    let name = "CSP 1"
    let domain = ['1', '2', '3']
    let v1 = new Variable("V1", domain)
    let v2 = new Variable("V2", domain)
    let v3 = new Variable("V3", domain)
    v3.assignValue('3')
    let scope = [v1, v2, v3]
    let constraintFunc = (vars: Variable[]) => {
        return vars[0].assigned_val === '3' && vars[1].assigned_val === '2' && vars[2].assigned_val === '1'
    }
    let c = new Constraint("C1", scope, constraintFunc)
    let constraints = [c]
    let csp = new TestCSP(name, constraints)
    return !csp.GACSolve()
}

runTests("CSP Tests", tests)