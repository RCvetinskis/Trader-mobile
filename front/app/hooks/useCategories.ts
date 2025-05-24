import { useQuery } from "@tanstack/react-query";
import { Category, getCategories } from "../lib/api/category-api";

const useCategories = () => {
  const query = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return {
    ...query,
    data: query.data ?? [],
  };
};

export default useCategories;
