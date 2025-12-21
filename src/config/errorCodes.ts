export interface IErrors {
    [key: string]: string
    P1001: string,
    P1003: string,
    P1004: string,
    P1005: string,
}

export const errors: IErrors = {
    P1001: "All fields are required",
    P1003: "User already exists",
    P1004: "Invalid email or password",
    P1005: "Internal server error",
}