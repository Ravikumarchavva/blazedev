"use client";

import { profileUpdate } from "@/actions/profile-update";
import { FormError } from "@/components/Form-Error";
import { FormSuccess } from "@/components/Form-Success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { settingsSchema } from "@/models/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Profile = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const profileForm = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
    },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user, profileForm]);
  const handleSubmit = (values: z.infer<typeof settingsSchema>) => {
    startTransition(async () => {
      console.log("Form submitted with values:", values);
      setError(undefined);
      setSuccess(undefined);
      const result = await profileUpdate(values);
      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <Form {...profileForm}>
      <form
        className={cn(
          "w-full max-w-3xl flex flex-col items-start justify-start pb-10",
        )}
        onSubmit={profileForm.handleSubmit(handleSubmit)}
      >
        <div className="h-[10vh]">
          <h2 className="text-3xl font-semibold text-primary-foreground">
            Profile
          </h2>
          <p className="text-gray-100 pt-2">
            This is how you will see on your site.
          </p>
        </div>
        <div className="border-b border-gray-300 my-4 w-full"></div>
        <div className="h-[15vh] w-full">
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl text-primary-foreground">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Username"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="h-[15vh] w-full">
          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="h-[20vh] w-full">
          <FormField
            control={profileForm.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={2}
                    placeholder="I am a recruiter"
                    disabled={isPending}
                    className="text-black placeholder-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="submit" className="bg-secondary hover:bg-secondary/80">
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default Profile;
