
import {z} from "zod";


export const registerSchema = z.object({
    userName : z.string().min(1 , "Username is required").max(10, "less than 10 chars please"),
    email : z.string().email("Invalid Email format"),
    password : z.string().min(6 , "password must be 6 chars long"), 
    phone : z.string().min(10 , "invalid number"),
    address : z.array(z.string()).nonempty("Address must have only one property")
})