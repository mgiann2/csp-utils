class Variable 
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
}

class Constraint 
{
    name: string
    scope: Variable[]
    constraint_func: (vars: Variable[]) => boolean

    constructor(scope :Variable[], constraint_func: (vars: Variable[]) => boolean)
    {
        this.scope = [...scope]
        this.constraint_func = constraint_func
    }
}

class CSP 
{
    name: string
    variables: Variable[]
    constraints: Constraint[]

    constructor(name: string)
    {
        this.name = name
    }
}