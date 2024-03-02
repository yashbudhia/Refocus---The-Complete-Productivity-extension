"use client";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { prisma } from "@/prisma";

const languages = [
  { label: "College Student", value: "C-student" },
  { label: "School Student", value: "S-student" },
  { label: "Programmer", value: "programmer" },
  { label: "Business Owner", value: "business" },
  { label: "Doctor", value: "doctor" },
  { label: "Public servant", value: "government" },
  { label: "Organisation", value: "organisation" },
  { label: "Other", value: "Other" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.string().min(1, {
    message: "Age must not be empty.,",
  }),
  occupation: z.string({
    required_error: "Please select an occupation",
  }),
  email: z.string().email("Please entire an appropriate email"),
});

export default function Signin() {
  const [currentstep, setCurrentstep] = useState(0);
  const { data: session } = useSession();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      occupation: "",
      email: "",
    },
  });
  /* Defining register and handleSubmit

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  late night commit
  */
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signIn("email", { email: values.email });

      console.log(values);

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });

      // Update the step after successful form submission
      setCurrentstep(2);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center top-[120px] z-50 ">
        {currentstep === 0 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md"
            >
              <p>Fill in the details and continue</p>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>Enter your name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Age <br />
                    </FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        placeholder="age"
                        className="p-2 bg-inherit border rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your age.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Occupation</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select Occupation"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Occupation..." />
                          <CommandEmpty>No Occupation found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("occupation", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Choose the occupation which describes you best
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  type="button"
                  onClick={() => {
                    setCurrentstep(1);
                  }}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        )}
        {currentstep === 1 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md"
            >
              <p>Enter your email to verify </p>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@xyz.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" flex items-center justify-center gap-x-6 ">
                <Button type="button" onClick={() => setCurrentstep(0)}>
                  Previous
                </Button>
                <Button type="submit">Submit</Button>
              </div>
              <FormDescription className=" flex items-center justify-center">
                Or
              </FormDescription>
              <div className="flex flex-col gap-5 items-center justify-center dark:bg-inherit">
                <button
                  onClick={() => signIn("google")}
                  className="px-4 py-2 border flex gap-2 border-slate-200 dark:bg-inherit rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                >
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Login with Google</span>
                </button>
                <button
                  onClick={() => signIn("github")}
                  className="px-4 py-2 border flex gap-2 border-slate-200 dark:bg-inherit rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                >
                  <img
                    className="w-6 h-6 "
                    src="https://www.svgrepo.com/show/439171/github.svg"
                    loading="lazy"
                    alt="github logo"
                  />
                  <span>Login with Github</span>
                </button>
              </div>
            </form>
          </Form>
        )}
        {currentstep === 2 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md"
            >
              <p>
                A link has been sent to your email. Click the link to verify{" "}
              </p>
            </form>
          </Form>
        )}
      </div>
    </>
  );
}
