import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDatabase from '@/lib/mongo'
import User from '@/lib/models/User'
import { globalConnection } from '@/lib/mongo'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/prisma/dbConnection'
const bcrypt = require("bcrypt")

export const options:NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
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
          const user = await prisma.users.findFirst({where: {email: credentials?.email}})
          // Check if user exists
          if (!user) {
            return false
          }

          const userObj = JSON.parse(JSON.stringify(user))
          // Check whether account exists with another provider such as google
          if (!userObj.hashedPassword) {
            // throw new Error("Email is already linked to another provider")
            return false // user must log in with google
          }
          // Check that password is valid if we found a user
          const passwordMatches = await bcrypt.compare(credentials?.password, userObj.hashedPassword)
          if (passwordMatches) {
            // Convert _id to id
            const id = userObj._id
            delete userObj._id
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
      // Add user to the session along with the access token
      const sessionUser = await prisma.users.findFirst({where: {email: session?.user?.email as string}})
      const sessionWithId = {...session, user: {...session.user, id: sessionUser?.id, token}}
      return sessionWithId
    },
    async jwt({token, account, user, session}) {
      let access_token
      // If the provider is Google use the access token given by them
      if (account?.provider === "google") {
        access_token = account?.access_token
      } else {
        // Grab access token for credentials
      }
      // Return the access token if the user has logged in
      if (user) {
        return {...token, access_token}
      }
      return token // otherwise return token w/o id
    },
    async signIn({profile, account}) {
      try {
        // Create new user in database if one doesn't already exist
        const userExists = await prisma.users.findFirst({where: {email: profile?.email}})
        if (!userExists && account?.provider === "google") {
          await prisma.users.create({
            data: {name: profile?.name as string, email: profile?.email as string, 
                  image: profile?.image as string, createdAt: new Date(), updatedAt: new Date() }
          })
          await prisma.user_templates.create({
            data: {user: profile?.name as string, templates: []}
          })
        }
        return true
      } catch (error) {
        console.log({error})
        return false
      }
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