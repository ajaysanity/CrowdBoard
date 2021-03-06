export interface AdminModel{
approved: boolean,
description: string,
email: string,
firstName: string,
id: string,
lastName: string,
location: string,
name: string,
ownerId: string,
phone:string,
zipcode: string
}

export interface PackageModel{
    id:string,
    name: string,
    description: string,
    price: string
}