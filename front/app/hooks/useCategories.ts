import { useQuery } from "@tanstack/react-query";
import {
  Category,
  getCategories,
  getSubCategories,
} from "../lib/api/category-api";

const useCategories = () => {
  const topLevelQuery = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const getSubCategoriesQuery = (parentId: number) => {
    return useQuery<Category[]>({
      queryKey: ["subCategories", parentId],
      queryFn: () => getSubCategories(parentId),
      enabled: !!parentId,
    });
  };
  return {
    isTopLevelLoading: topLevelQuery.isLoading,
    topLevelCategories: topLevelQuery.data ?? [],

    getSubCategoriesQuery,
  };
};

export default useCategories;
