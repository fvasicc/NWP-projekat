export interface RegisterUserDto {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    zip: number,
    age: number,
    gender: string,
    imageUrl: string
}

export interface LoggedUserDto {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    zip: number,
    age: number,
    gender: string,
    imageUrl: string
}