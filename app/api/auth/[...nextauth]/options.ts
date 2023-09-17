import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDatabase from '@/lib/mongo'
import User from '@/lib/models/User'
import { redirect } from 'next/navigation'

export const options:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: ""},
        password: { label: "Password", type: "password"},
      },
      // function to validate credentials
      async authorize(credentials, req) {
        // Find the user with the given email
        try {
          await connectToDatabase()
          const user = await User.findOne({email: credentials?.email})
          const userObj = JSON.parse(JSON.stringify(user))
          // Check that password is valid if we found a user
          if (userObj && userObj.password === credentials?.password) {
              return userObj
          } else if (!userObj) {
            // Create the new user
            User.create({
              email: credentials?.email,
            })
          }
          return null
        } catch (err) {
          console.log({err})
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({session}) {
      await connectToDatabase()
      // Attach the user id to the session user
      const sessionUser = await User.findOne({email: session?.user?.email})
      const sessionWithId = {...session, user: {...session.user, id: sessionUser._id.valueOf()}}
      return sessionWithId
    },
    async signIn({ profile }) {
      await connectToDatabase()
      // Create the user if account is new
      try {
        console.log({profile})
        const user = await User.findOne({email: profile?.email})
        if (!user) {
          User.create({email: profile?.email, name: profile?.name, image: (profile as {picture: string}).picture})
        }
        // TODO: Send user to dashboard
        return true
      } catch (err) {
        console.log({err})
        return false
      }
    }
  },
  pages: {
    signIn: "/login",
    signOut: `${process.env.DEV_URL}/api/auth/signout`,
  },
}