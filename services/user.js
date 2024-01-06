import { error } from 'console';
import fs from 'fs';
import path from 'path';
import { compare, hash }  from 'bcryptjs'


const filePath = path.join(process.cwd(),"src", "data", "users.json");

export function getAll () {
const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}
export function getById (id) {
    const data = getAll();
   return data.find(p => p.id === Number(id)
    )
    }
    export function getByEmail (email) {
      const data = getAll();
     return data.find(p => p.email.toLowerCase() === email.toLowerCase()
      );
      } 
       export async function verifyPassword (hashPassword, password) {
        const isValid = await compare(password, hashPassword);
        const data = getAll();
       return isValid;
        }
    export function getBypassword (password) {
        const data = getAll();
        return data.find(p => p.password === Number(password)
     )
}
    
 export async function save (email,password) {
  const found =  getByEmail(email);
  if(found) {
 throw new Error( "User already exist")
  }
 const data = getAll();
 const hashPassword = await hash(password, 12);
 data.push({
  id: data.length + 1,
  email,
  password : hashPassword
 }
);
fs.writeFileSync(filePath, JSON.stringify(data));
}