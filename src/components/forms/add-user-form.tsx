import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { ImSpinner2 } from "react-icons/im";
import { uploadAvatar } from "@/lib/avatar";

export type AddUserType = z.infer<typeof AddUserZodSchema>;
interface Props {
  handleModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddUserForm({ handleModalOpen }: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async (user: Omit<User, "id" | "created">) => {
      const response = await createUser(user as User);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const onSubmit: SubmitHandler<AddUserType> = async (userData) => {
    const url = await uploadAvatar(selectedImage!);
    const user = { ...userData, avatar: { url } };

    mutate(user);
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
          <FormField
            control={form.control}
            name="avatar.url"
            render={() => (
              <FormItem>
                <FormLabel className="cursor-pointer">Add avatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleChange}
                    className="sr-only"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedImage && (
            <div className="size-20 rounded-full">
              <img
                src={URL.createObjectURL(selectedImage!)}
                alt="Avatar"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          )}
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
