import { User } from "@/types";
import { TableCell, TableRow } from "./ui/table";
import DeleteAlertDialog from "./widgets/delete-alert-dialog";
import EditUserDialog from "./widgets/edit-user-dialog";

interface Props {
  user: User;
}
export default function UserTableRow({ user }: Props) {
  return (
    <TableRow>
      <TableCell>
        {user?.avatar?.url ? (
          <img
            src={user?.avatar?.url}
            alt={user?.name}
            className="size-10 lg:size-12 rounded-full object-cover"
          />
        ) : (
          <div className="size-10 lg:size-12 rounded-full bg-slate-200 font-bold text-4xl flex items-center justify-center">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{user?.name}</TableCell>
      <TableCell>{user?.email}</TableCell>
      <TableCell>{user?.age}</TableCell>
      <TableCell>{user?.profession}</TableCell>
      <TableCell>{user?.location?.city}</TableCell>
      <TableCell>{user?.location?.country}</TableCell>
      <TableCell className="flex items-start gap-2">
        <DeleteAlertDialog userId={user.id} />
        <EditUserDialog user={user} />
      </TableCell>
    </TableRow>
  );
}
