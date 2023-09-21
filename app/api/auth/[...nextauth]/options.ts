import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDatabase from '@/lib/mongo'
import User from '@/lib/models/User'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { globalConnection } from '@/lib/mongo'
const bcrypt = require("bcrypt")

export const options:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: ""},
        password: { label: "Password", type: "password"}
      },
      // function to validate credentials
      async authorize(credentials, req) {
        // Find the user with the given email
        try {
          await connectToDatabase()
          const user = await User.findOne({email: credentials?.email})
          console.log("User database info ", user)
          console.log("login attempt")
          // Check if user exists
          if (!user) {
            return false
          }

          const userObj = JSON.parse(JSON.stringify(user))
          // Check that password is valid if we found a user
          const passwordMatches = await bcrypt.compare(credentials?.password, userObj.password)
          if (passwordMatches) {
            // Convert _id to id
            const id = userObj._id
            delete userObj._id
            console.log({userObj})
            return {...userObj, id}
          }
          return false
        } catch (err) {
          console.log({err})
          return false
        }
      }
    })
  ],
  // TODO: find adapter for mongodb that allows for getting token info
  callbacks: {
    async session({session, token}) {
      // await connectToDatabase()
      // // Attach the user id to the session user along with the jwt
      // const sessionUser = await User.findOne({email: session?.user?.email})
      // const userId = sessionUser?.id
      console.log({...session, token})
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
    async jwt({token, account, user, session}) {
      console.log("jwt: ", {token, user, session, account})
      let access_token
      // If the provider is Google use the access token given by them
      if (account?.provider === "google") {
        access_token = account?.access_token
      } else {
        // Grab access token for credentials
      }
      if (user) {
        // Return the token + the id of the user
        return {...token, access_token, id: user.id}
      }
      return token // otherwise return token w/o id
    },
  },
  pages: {
    signIn: "/login",
    // TODO: edit this to be the production url when needed
    signOut: `${process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL}/api/auth/signout`,
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === 'development',
}