# csp-utils
## About
V 1.0

csp-utils is a simple typescript library that can be used to solve constraint satisfaction problems.

The dev branch contains a tests folder and a package.json file (to be used with node). If bash is installed, running **npm test** will run the tests for csp-utils. If bash is not installed, modify the **test** property of **scripts** in the package.json file to a command that will run **tests/run-tests.sh**. Download this branch if you would like to extend or improve csp-utils.

The build branch contains this readme file and **csp-utils.ts**. Download this branch if you do not plan on modifying the library.  

## How to use csp-utils
A constraint satisfaction problem is a problem which involves assigning values to a set of variables such that each assignment to a variable does not violate any constraints given by the problem.

### The Classes
csp-utils contains three classes: **Variable**, **Constraint**, and **CSP**. 

The **Variable** class has a **name** and **domain**. The **name** is used to identify the variable and the **domain** is list of possible values that the variable could be assigned to. If you want the variable to be treated as a constant (has a set assignment), use the setConstant method.

The **Constraint** class has a **name**, **scope** and **constraintFunc**. The **name** is used to identify the constraint, the **scope** is a list of **Variable** objects that the **constraintFunc** operates on to see if all variable assignments are valid. When creating the **constraintFunc**, the **variables** parameter will be a list of variables equivalent to the **scope**, thus keep in mind the order of variables in the **scope** when making the constraint function.

The **CSP** class has a **name** and **constraints**. The **name** is used to identify the CSP and **constraints** contains all the constraints of the problem (variables are infered from constraints). When creating a **CSP**, first create all your variables and set any as a constant if necessary. Then, use these variables to create a list of constraints for the **CSP**. Finally, create the **CSP** by providing a name and the list of constraints made previously. The **variables** list of the **CSP** will be automatically filled using the scopes.

### Solving a CSP
To solve a **CSP**, call either the **backtrackSolve** or **GACSolve** methods on the **CSP** class. The **GACSolve** method should offer substantial performance benefits over **backtrackSolve** and should be used in most cases. After calling either of these methods, if false is returned then the **CSP** is unsolvable, otherwise a solution has been found. The solution can be accessed by looping though the **assigned_val** property of each of the variables.  
