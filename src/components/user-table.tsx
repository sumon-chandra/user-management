import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import UserTableRow from "./user-table-row";

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  return (
    <Table className="mt-6">
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
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
          <UserTableRow user={user} key={user.id} />
        ))}
      </TableBody>
    </Table>
  );
}
