import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from "./add-user-form";
import { useState } from "react";

export function AddUserDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add user</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="flex flex-col gap-2 items-center">
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Add all user information in the form.
          </DialogDescription>
        </DialogHeader>
        {/* ##### Add user Form ####### */}
        <AddUserForm handleModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
}
