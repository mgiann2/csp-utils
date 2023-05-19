import { runTests } from "./test-helper.js"
import { Variable } from "../csp-utils.js"

const tests = [
    testVariableCreation,
    testIsAssigned,
    testCurrDomSize
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

function testIsAssigned(): boolean
{
    let name = "Var 1"
    let domain = ['1', '2', '3']
    let v = new Variable(name, domain)
    if (v.isAssigned()) {return false}
    v.assigned_val = '1'
    if (!v.isAssigned()) {return false}
    return true
}

function testCurrDomSize(): boolean
{
    let v = new Variable("V1", ['1', '2', '3'])
    v.curr_domain = [true, true, false]
    if(v.currDomSize() === 2) {return true}
    return false 
}

runTests("Variable Tests", tests)