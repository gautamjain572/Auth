"use server"
import { User } from '@/models/userModel';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { connectDb } from './db';
import { signIn } from '@/auth';
import { CredentialsSignin } from 'next-auth';

export const signUp = async (values: any) => {
  await connectDb()
  const { username, email, password } = values;
  const user = await User.findOne({ email });
  if (user) throw new Error('User already exists');
  const hashPassword = await hash(password, 10);
  await User.create({ username, email, password: hashPassword })
  redirect('/sign-in')
};

export const Login = async (values: any) => {
  await connectDb()
  const { email, password } = values;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: '/',
    })
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};