import { Input } from "@/components/ui/input";
import { SyntheticEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { PropsRefetch } from "../header";

export default function FilterByEmail({ refetch }: PropsRefetch) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    const searchText = target.email.value;
    setSearchParams((prev) => {
      prev.set("email", searchText);
      return prev;
    });
    refetch();
  };
  const q = searchParams.get("email");
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Filter by email</h3>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Enter a email" name="email" defaultValue={q!} />
      </form>
    </div>
  );
}
