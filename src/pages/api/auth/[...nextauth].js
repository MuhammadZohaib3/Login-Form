import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getByEmail, verifyPassword } from "../../../../services/user";

export const authOptions = {
  // Configure one or more authentication providers
  session : {
     jwt :true
  },
  providers: [
    CredentialsProvider({
       async authorize ({ email, password }) {
         const user = await getByEmail(email);
         if(!user) {
              throw new Error("User not found");
         }
         const isValid = await verifyPassword(user.password,password);
         if(!isValid) {
            throw new Error("Incorrect Password");
         }
         return{ email };
        }
    })
  ],
}

export default NextAuth(authOptions)