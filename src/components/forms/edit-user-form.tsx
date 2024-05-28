import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/lib/actions";
import { User } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { EditUserZodSchema } from "../../lib/zod-shema";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ImSpinner2 } from "react-icons/im";
import { Label } from "../ui/label";
import { updateAvatar } from "@/lib/avatar";

export type EditUserType = z.infer<typeof EditUserZodSchema>;
interface Props {
  handleModalOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

export default function EditUserForm({ handleModalOpen, user }: Props) {
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleUpdateAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const updateUrl = await updateAvatar(
        user?.avatar?.url!,
        e.target.files[0]
      );
      setNewAvatarUrl(updateUrl);
    }
  };

  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (user: User) => {
      const response = await editUser(user);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      // console.log("success");
      handleModalOpen(false);
    }
  }, [handleModalOpen, isSuccess]);

  const form = useForm<EditUserType>();

  const onSubmit: SubmitHandler<EditUserType> = (userData) => {
    // console.log(userData);

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
      avatar: {
        url: newAvatarUrl || user.avatar.url || null,
      },
    };

    mutate(updatableUser);
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <Label htmlFor="avatar" className="text-right size-44">
          {newAvatarUrl || user?.avatar?.url ? (
            <img
              src={newAvatarUrl || user.avatar.url!}
              alt={user.name}
              className="rounded-full object-cover w-full h-full cursor-pointer"
            />
          ) : (
            <div className="size-44 rounded-full bg-slate-200 font-bold text-7xl flex items-center justify-center cursor-pointer">
              {user?.name.charAt(0)}
            </div>
          )}
        </Label>
        <Input
          type="file"
          id="avatar"
          onChange={handleUpdateAvatar}
          className="sr-only"
        />
      </div>
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
