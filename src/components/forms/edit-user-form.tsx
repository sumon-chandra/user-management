import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { createUser, editUser } from "@/lib/actions";
import { User } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { EditUserZodSchema } from "../../lib/zod-shema";
import { Dispatch, SetStateAction, useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";
import { Label } from "../ui/label";

export type EditUserType = z.infer<typeof EditUserZodSchema>;
interface Props {
  handleModalOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

export default function EditUserForm({ handleModalOpen, user }: Props) {
  //   console.log(user);

  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async (user: User) => {
      const response = await editUser(user);
      return response.data;
    },
  });

  useMemo(() => {
    if (isSuccess) {
      console.log("success");
      handleModalOpen(false);
    }
  }, [isSuccess]);

  const form = useForm<EditUserType>();

  const onSubmit: SubmitHandler<EditUserType> = (userData) => {
    const updatableUser: User = {
      id: user.id!,
      created: user.created!,
      name: userData.name!,
      email: userData.email!,
      age: userData.age!,
      profession: userData.profession!,
      location: {
        city: userData.location.city!,
        country: userData.location.country!,
      },
    };

    mutate(updatableUser);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={user.name}
              {...form.register("name")}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={user.email}
              {...form.register("email")}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              defaultValue={user.age}
              {...form.register("age")}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="profession" className="text-right">
              Profession
            </Label>
            <Input
              id="profession"
              defaultValue={user.profession}
              {...form.register("profession")}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="city" className="text-right">
              city
            </Label>
            <Input
              id="city"
              defaultValue={user.location.city}
              {...form.register("location.city")}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              defaultValue={user.location.country}
              {...form.register("location.country")}
              className="col-span-3"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="ms-auto text-lg min-w-32 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? <ImSpinner2 className="animate-spin" /> : "Update user"}
        </Button>
      </form>
    </Form>
  );
}
