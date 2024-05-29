import { Input } from "@/components/ui/input";
import { SyntheticEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { PropsRefetch } from "../header";

export default function FilterByName({ refetch }: PropsRefetch) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    const searchText = target.name.value;
    setSearchParams((prev) => {
      prev.set("name", searchText);
      return prev;
    });
    refetch();
  };
  const q = searchParams.get("name");

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Filter by name</h3>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Enter a name" name="name" defaultValue={q!} />
      </form>
    </div>
  );
}
