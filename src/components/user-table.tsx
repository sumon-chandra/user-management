import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import DeleteAlertDialog from "./widgets/delete-alert-dialog";
import EditUserDialog from "./widgets/edit-user-dialog";

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  return (
    <Table className="mt-6">
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Profession</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.profession}</TableCell>
            <TableCell>{user.location.city}</TableCell>
            <TableCell>{user.location.country}</TableCell>
            <TableCell className="flex items-start gap-2">
              <DeleteAlertDialog userId={user.id} />
              <EditUserDialog user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
