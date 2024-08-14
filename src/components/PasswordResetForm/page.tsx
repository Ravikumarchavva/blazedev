"use client";
import { Reset } from "@/actions/send-email-verification";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/models/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { passwordChange } from "@/actions/password-reset";
import { useSearchParams } from "next/navigation";

export default function PasswordRestForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const passwordResetForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password:"",
      confirmPassword: "",
    },
    });
    const onSubmit = async (values:z.infer<typeof changePasswordSchema>)=>{
        if(success || error) return;
        if(!token){
          setError('Token is required');
          return;
        }
        startTransition(() => {
            passwordChange(token,values).then((data)=>{
            if(data.success){
                setSuccess(data.message);
            }
            else{
                setError(data.message);
            }
            });
        })
    }


  return (
    <Form {...passwordResetForm}>
      <form
        onSubmit={passwordResetForm.handleSubmit(onSubmit)}
        className="space-y-6 w-full px-2"
      >
        <FormField
          control={passwordResetForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="******"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordResetForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <FormControl>
                <Input
                  {...field} className="font-semibold"
                  placeholder="******"
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
          Reset password
        </Button>
      </form>
    </Form>
  );
};