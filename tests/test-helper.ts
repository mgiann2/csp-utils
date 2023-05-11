function runTest(name: string, testFunc: () => boolean): number 
{
    console.log("Running " + name)
    try {
        if (testFunc())
        {
            console.log("Pass")
            return 1
        }
        throw "Incorrect return value"
    } catch (error) {
        console.log("Fail: " + error)
        return 0
    }
}

export function runTests(name: string, testFuncs: any) 
{
    console.log("==============================")
    console.log("Running " + name)
    console.log("==============================")
    let totalTests = testFuncs.length
    let passedTests = 0
    testFuncs.forEach((testFunc) => {
        passedTests += runTest(testFunc.name, testFunc)
    })
    console.log("")
    console.log("Passed: " + passedTests + " / " + totalTests)
    console.log("==============================")
}