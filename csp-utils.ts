/**
 * This class represents a variable in a constraint satisfaction
 * problem. Each variable has a domain of values that it can be 
 * assigned to. 
 */
export class Variable 
{
    name: string
    domain: string[]
    curr_domain: boolean[]
    assigned_val: string = null

    constructor(name: string, domain: string[])
    {
        this.name = name
        this.domain = [...domain]
        this.curr_domain = new Array(domain.length).fill(true)
    }

    /**
     * This function returns true if the variable has been assigned and
     * false otherwise.
     * @returns whether the variable has been assigned a value
     */
    isAssigned(): boolean
    {
        return this.assigned_val !== null
    }

    /**
     * This function assigns a variable to the given value. This function
     * will do nothing if the value provided is not in the domain. If the
     * variable is already assigned then this function will assign the variable
     * to the new value.
     * @param value the value that the variable will be assigned to
     */
    assignValue(value: string): void 
    {
        if (this.domain.includes(value)) 
        {
            this.assigned_val = value
        }
        else
        {
            console.log("ERROR: value is not in variable's domain")
        }
    }

    /**
     * This function unassigns a value to the variable. If the variable
     * is already unassigned then the function will do nothing.
     */
    unassignValue(): void
    {
        if (this.isAssigned())
        {
            this.assigned_val = null
        }
        else
        {
            console.log("ERROR: Variable has not been assigned")
        }
    }
}

/**
 * This class represents a constraint in a constraint satisfaction problem.
 * Each constraint has a scope of variables that it operates on. Furthermore,
 * each constraint has a function that uses the variables in it's scope and 
 * determines if the assigned values satisfy the constraint. IMPORTANT: the
 * order of variables in the scope are used to identify variables for the 
 * constraint function.
 */
export class Constraint 
{
    name: string
    scope: Variable[]
    constraintFunc: (vars: Variable[]) => boolean

    constructor(name:string, scope :Variable[], constraintFunc: (vars: Variable[]) => boolean)
    {
        this.name = name
        this.scope = [...scope]
        this.constraintFunc = constraintFunc
    }

    /**
     * This function checks if all variables in the scope are assigned.
     * @returns whether all the variables in the scope are assigned
     */
    allVarsAssigned(): boolean 
    {
        for(let i=0; i < this.scope.length; i++) 
        {
            if(!this.scope[i].isAssigned())
            {
                return false
            }
        }
        return true
    }

    /**
     * This function determines whether the current assignments to the
     * variables in the scope satisfy the constraint.
     * @returns whether the variables satisfy this constraint
     */
    isSatisfied(): boolean 
    {
        if (!this.allVarsAssigned()) {return false}
        return this.constraintFunc(this.scope)
    }
}

/**
 * This class represents a constraint satisfaction problem (CSP). Each CSP
 * has a set of variables and a set of constraints defining it. This class provides
 * a way to define and solve CSPs.
 */
export class CSP 
{
    name: string
    variables: Variable[]
    constraints: Constraint[]

    constructor(name: string)
    {
        this.name = name
    }

    /**
     * Solves the CSP by assigning a value to each variable such that each
     * constraint is satisfied. The CSP is solved using backtracking search.
     * The function returns true if the CSP is solved. false is returned if 
     * the CSP is unsatisfiable.
     * @returns a boolean representing if the CSP was able to be solved
     */
    backtrackSolve(): boolean
    {
        // TODO
        return false
    }

    /**
     * Solves the CSP by assigning a value to each variable such that each
     * constraint is satisfied. The CSP is solved using backtracking search
     * with GAC-based pruning for better performance.
     * The function returns true if the CSP is solved. false is returned if 
     * the CSP is unsatisfiable.
     * @returns a boolean representing if the CSP was able to be solved
     */
    GACSolve(): boolean
    {
        // TODO
        return false
    }
}