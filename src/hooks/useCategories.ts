import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/quizApi";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchCategories(),
  });
};

export default useCategories;
