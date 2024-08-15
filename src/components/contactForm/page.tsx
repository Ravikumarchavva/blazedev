"use client";
import { contactMessage } from "@/actions/contact-action";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { contactSchema } from "@/models/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormError } from "../Form-Error";
import { FormSuccess } from "../Form-Success";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const user = useCurrentUser();
  const contactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: user?.email || "", // Set the email default value
      subject: "",
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const handleSubmit = async (values: FormData) => {
    startTransition(() => {
      setError(undefined);
      setSuccess(undefined);
    });

    try {
      if (user?.email) {
        values.email = user.email; // Ensure email is set from the user object
      }
      const response = await contactMessage(values);
      if (response.success) {
        setSuccess("Message sent successfully!");
        console.log(response.message);
        console.log(user)
        // contactForm.reset(); // Reset form after successful submission
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to send message.");
    }
  };

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(handleSubmit)}
        className="font-semibold w-full min-h-[65vh] mx-[1vw] bg-primary shadow-xl flex flex-col items-center py-8 rounded-lg 
        portrait:w-[95%] portrait:h-auto portrait:mt-5 px-[5vw] space-y-4 lg:w-1/2 lg:space-y-6 lg:py-12 lg:px-10"
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
                  className="w-full text-primary"
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
                  className="w-full text-primary"
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
                  className="text-primary"
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
