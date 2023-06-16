import { useQuery,useQueryClient } from "@tanstack/react-query"

const useUser = () => {
   
    const { data: User = [], refetch } = useQuery(["User"], async () => {
        const result = await fetch("http://localhost:5000/users");
        return result.json();
      });
return [User,refetch]
}
export default useUser;
