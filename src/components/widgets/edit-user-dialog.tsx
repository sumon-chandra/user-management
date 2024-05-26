import { FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { User } from "@/types";
import EditUserForm from "../forms/edit-user-form";

interface Props {
  user: User;
}

export default function EditUserDialog({ user }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FilePenLine size={20} className="cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="flex flex-col gap-2 items-center">
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Add all user information in the form.
          </DialogDescription>
        </DialogHeader>
        {/* ##### Edit user Form ####### */}
        <EditUserForm user={user} handleModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
}
