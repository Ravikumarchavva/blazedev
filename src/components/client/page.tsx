"use client";
import { credentialSignUp } from "@/actions/signUp";
import { credentialLogin } from "@/actions/signIn";
import { Input } from "@/components/ui/input";
import { loginSchema, signUpSchema } from "@/models/schemas";
import { DEFAULT_REDIRECT_PATH } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormError } from "../Form-Error";
import { FormSuccess } from "../Form-Success";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_REDIRECT_PATH;
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Account already in use by different provider" : '' 
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      credentialLogin(values).then((data)=>{
        if(data.success){
          setSuccess(data.message);
          toast("Login Succesfull!");
          window.location.assign(callbackUrl); // Redirect to the callbackUrl and reload the page
        }
        else{
          setError(data.message);
        }
      })
    });
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
        className="space-y-6"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="example@email.com"
                  type="email"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="Password"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <Button size={"sm"} variant={"link"} asChild className="px-0 text-black dark:text-white"><Link href={'/reset'}>Forgot password?</Link></Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/80"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSignUpSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");
      credentialSignUp(values).then((data) => {
        if (data.success) {
          setSuccess(data.message);
        } else {
          setError(data.message);
        }
      });
    });
  };

  return (
    <Form {...signUpForm}>
      <form
        className="space-y-6"
        onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
      >
        <FormField
          control={signUpForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="Your Name"
                  type="name"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="example@email.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="*********"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="*********"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/80"
        >
          Sign Up
        </Button>
      </form>
    </Form>
    
  );
};

export { LoginForm, SignUpForm };

