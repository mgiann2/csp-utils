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

    isAssigned(): boolean
    {
        return this.assigned_val !== null
    }

    assignValue(value: string): void 
    {
        if (this.isAssigned())
        {
            console.log("ERROR: Variable " + this.name + " is already assigned.")
        } 
        else if (this.domain.includes(value)) 
        {
            this.assigned_val = value
        }
        else
        {
            console.log("ERROR: value is not in variable's domain")
        }
    }

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

export class Constraint 
{
    name: string
    scope: Variable[]
    constraint_func: (vars: Variable[]) => boolean

    constructor(name:string, scope :Variable[], constraint_func: (vars: Variable[]) => boolean)
    {
        this.name = name
        this.scope = [...scope]
        this.constraint_func = constraint_func
    }
}

export class CSP 
{
    name: string
    variables: Variable[]
    constraints: Constraint[]

    constructor(name: string)
    {
        this.name = name
    }
}