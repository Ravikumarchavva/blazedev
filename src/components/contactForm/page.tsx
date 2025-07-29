"use client";
import { contactMessage } from "@/actions/contact-action";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { contactSchema } from "@/models/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormError } from "../Form-Error";
import { FormSuccess } from "../Form-Success";
import { z } from "zod";

const ContactForm = () => {
  const user = useCurrentUser();
  const contactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      subject: "",
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const handleSubmit = (values: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      setError(undefined);
      setSuccess(undefined);

      try {
        if (!user || !user.email) {
          setError("Sign in to send message");
          return; // Skip sending message if user is not signed in
        }
        const response = await contactMessage(values, user.email);

        if (response.success) {
          setSuccess("Message sent successfully!");
          setTimeout(() => {
            contactForm.reset(); // Reset form after successful submission
          }, 2000); // Reset form after 2 seconds delay
        } else {
          setError(response.message);
        }
      } catch (error: any) {
        console.error("Error sending message:", error);
        setError("Failed to send message.");
      }
    });
  };

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(handleSubmit)}
        className="font-semibold w-full min-h-[65vh] bg-primary shadow-xl flex flex-col items-center py-8 rounded-lg 
        portrait:w-[95%] portrait:h-auto portrait:mt-5 px-[5vw] space-y-4 lg:w-1/2 lg:space-y-6 lg:py-12 lg:px-10"
        aria-live="polite" // Helps with accessibility for screen readers
      >
        <FormField
          control={contactForm.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-md">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="w-full text-primary dark:text-white"
                  placeholder="Enter your name"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-md">Subject</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="w-full text-primary text-white"
                  placeholder="Contacting for "
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-md">Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="text-primary text-white"
                  rows={6}
                  placeholder="Write your message here"
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
          className="w-full bg-secondary hover:bg-secondary/70"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
