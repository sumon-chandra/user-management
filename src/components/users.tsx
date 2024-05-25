import { UserTable } from "../components/user-table";
import { getAllUsers } from "../lib/actions";
import { useQuery } from "@tanstack/react-query";
import { PiSpinnerGapBold } from "react-icons/pi";
import Header from "./header";

export default function Users() {
  const {
    data: users,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    refetchInterval: 10000,
    staleTime: 10000,
  });

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-3xl font-bold text-neutral-400">
        <PiSpinnerGapBold className="animate-spin" size={30} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-3xl font-bold text-neutral-400">
        <h3>Failed to load all users </h3>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <UserTable users={users!} />
    </div>
  );
}
