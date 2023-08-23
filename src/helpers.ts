import { z } from "zod"
import employeesJSON from "../scripts/employees.json" assert { type: "json" }

const employeeSchema = z.object({
    id: z.number(),
    role: z.string(),
    name: z.string(),
    description: z.string(),
    picture: z.string()
})

export type Employee = z.infer<typeof employeeSchema>



export const getEmployee = (id: string) => {
    const employees = employeeSchema.array().parse(employeesJSON)
    return employees.find(employee => employee.id === Number(id))
}

export const getEmployees = (ids: string[]) => {
    const employees = employeeSchema.array().parse(employeesJSON)
    const employeeMap = employees.reduce<Record<string, Employee>>((acc, employee) => {
        acc[employee.id] = employee
        return acc
    }, {})

    return ids.map(id => employeeMap[id])
}
