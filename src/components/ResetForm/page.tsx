"use client";
import { Reset } from "@/actions/send-email-verification";
import { Input } from "@/components/ui/input";
import { resetSchema } from "@/models/schemas";
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

export default function RestForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email:""
    },
  });
  const onSubmit = async (values:z.infer<typeof resetSchema>)=>{
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      Reset(values).then((data)=>{
      setSuccess(data?.success);
      setError(data?.error);
    });
    })
  }


  return (
    <Form {...resetForm}>
      <form
        onSubmit={resetForm.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={resetForm.control}
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
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/80"
        >
          Send reset email
        </Button>
      </form>
    </Form>
  );
};