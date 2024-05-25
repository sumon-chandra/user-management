import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { createUser } from "@/lib/actions";
import { User } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { AddUserZodSchema } from "../../lib/zod-shema";
import { Dispatch, SetStateAction, useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";

export type AddUserType = z.infer<typeof AddUserZodSchema>;
interface Props {
  handleModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddUserForm({ handleModalOpen }: Props) {
  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async (user: Omit<User, "id" | "created">) => {
      const response = await createUser(user as User);
      return response.data;
    },
  });

  useMemo(() => {
    if (isSuccess) {
      console.log("success");
      handleModalOpen(false);
    }
  }, [isSuccess]);

  const form = useForm<AddUserType>({
    resolver: zodResolver(AddUserZodSchema),
  });

  const onSubmit: SubmitHandler<AddUserType> = (userData) => {
    console.log(userData);
    mutate(userData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="23" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input placeholder="Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Dhaka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Bangladesh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="ms-auto text-lg min-w-32 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? <ImSpinner2 className="animate-spin" /> : "Add user"}
        </Button>
      </form>
    </Form>
  );
}
