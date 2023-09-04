import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDatabase from '@/lib/mongo'
import Users from '@/lib/models/Users'

export const options:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "" as string,
      clientSecret: "" as string,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Username", type: "text", placeholder: ""},
    //     password: { label: "Password", type: "password"},
    //   },
      // function to validate credentials
      // async authorize(credentials, req) {
      //   connectToDatabase()
      //   // Find the user with the given email
      //   try {
      //     const user = Users.findOne({email: credentials?.email})
      //     return user // either null or the user's information
      //   } catch (err) {
      //     console.log({err})
      //     return null;
      //   }
      // }
    // })
  ],
  
}