import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { User } from "./models/userModel";
import { compare } from "bcryptjs";
import { connectDb } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;
                if (!email || !password) throw new CredentialsSignin({ cause: 'Please Provide Email and Password' });
                connectDb();

                const user = await User.findOne({ email }).select('+password');
                if (!user) throw new CredentialsSignin({cause:'Invalid Email and Password'})
                if (!user.password) throw new CredentialsSignin({cause:'You have to sign in with google'})
                const isMatch = await compare(password, user.password)
                if (!isMatch) throw new CredentialsSignin({cause:'Invalid Password'})
                else return { name: user.name, email: user.email, id: user._id };
            }
        }),
    ],
    pages: {
        signIn: "/sign-in"
    }
})