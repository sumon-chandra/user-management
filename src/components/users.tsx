import { UserTable } from "../components/user-table";
import { getAllUsers } from "../lib/actions";
import { useQuery } from "@tanstack/react-query";
import { PiSpinnerGapBold } from "react-icons/pi";
import Header from "./header/header";
import { useSearchParams } from "react-router-dom";

export default function Users() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  const {
    data: users,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", name, email],
    queryFn: () => getAllUsers({ name, email }),
  });

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-3xl font-bold text-neutral-700">
        <PiSpinnerGapBold className="animate-spin" size={30} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-3xl font-bold text-neutral-700">
        <h3>Failed to load all users </h3>
      </div>
    );
  }

  return (
    <div>
      <Header refetch={refetch!} />
      <UserTable users={users!} />
    </div>
  );
}
