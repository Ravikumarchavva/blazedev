"use client";
import { credentialSignUp } from "@/actions/createAccount";
import { credentialLogin } from "@/actions/login";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema, signUpSchema } from "@/models/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
} from "../ui/form";
import { z } from "zod";
import { FormError } from "../Form-Error";
import { FormSuccess } from "../Form-Success";
import { useState, useTransition } from "react";
import { DEFAULT_REDIRECT_PATH } from "@/routes";

const LoginForm = () => {
  const router = useRouter();
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
          toast("Login Succesfull!")
          router.push(DEFAULT_REDIRECT_PATH);
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
          Login
        </Button>
      </form>
    </Form>
    // <form
    //   action={async (formdata: FormData) => {
    //     const email = formdata.get("email") as string;
    //     const password = formdata.get("password") as string;
    //     if (!email || !password) {
    //       toast.error("Provide All Details");
    //       return;
    //     }

    //     const result = await credentialLogin(email, password);
    //     if (result.success) {
    //       toast.success("Login successful");
    //       router.push("/");
    //     } else {
    //       toast.error(result.message || "Invalid Email or Password");
    //     }
    //   }}
    // >
    //   <div className="space-y-1">
    //     <Label htmlFor="email">Email</Label>
    //     <Input
    //       name="email"
    //       id="email"
    //       type="email"
    //       placeholder="example@example.com"
    //     />
    //   </div>
    //   <div className="space-y-1">
    //     <Label htmlFor="password">Password</Label>
    //     <Input name="password" id="password" type="password" />
    //   </div>
    //   <div className="mt-5">
    //     <Button
    //       type="submit"
    //       className="w-full space-y-2 bg-secondary dark:hover:bg-secondary-foreground dark:hover:text-black mx-auto"
    //     >
    //       Login
    //     </Button>
    //   </div>
    // </form>
  );
};

const SignUpForm = () => {
  const router = useRouter();
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
    // <form
    //   action={async (formdata: FormData) => {
    //     const name = formdata.get("name") as string;
    //     const email = formdata.get("email") as string;
    //     const password = formdata.get("password") as string;
    //     const retypedpassword = formdata.get("retypedpassword") as string;

    //     if (!name || !email || !password || !retypedpassword) {
    //       toast.error("Provide All Details");
    //       return;
    //     }
    //     if (password.length < 6) {
    //       toast.error("Password must be at least 5 characters long");
    //       return;
    //     }
    //     if (password !== retypedpassword) {
    //       toast.error("Passwords do not match");
    //       return;
    //     }

    //     const result = await credentialSignUp(name, email, password);
    //     if (result.success) {
    //       toast.success(result.message);
    //       router.push("/");
    //     } else {
    //       toast.error(result.message);
    //     }
    //   }}
    // >
    //   <div className="space-y-1">
    //     <Label htmlFor="name">Name</Label>
    //     <Input name="name" id="name" type="name" placeholder="Your Name" />
    //   </div>
    //   <div className="space-y-1">
    //     <Label htmlFor="email">Email</Label>
    //     <Input
    //       name="email"
    //       id="email"
    //       type="email"
    //       placeholder="example@example.com"
    //     />
    //   </div>
    //   <div className="space-y-1">
    //     <Label htmlFor="password">Password</Label>
    //     <Input name="password" id="password" type="password" />
    //   </div>
    //   <div className="space-y-1">
    //     <Label htmlFor="current">Re-enter password</Label>
    //     <Input name="retypedpassword" id="current" type="password" />
    //   </div>
    //   <div className="mt-5">
    //     <Button className="w-full bg-secondary dark:hover:bg-secondary-foreground dark:hover:text-black mx-auto">
    //       Sign Up
    //     </Button>
    //   </div>
    // </form>
  );
};

export { LoginForm, SignUpForm };
