import { useQuery,useQueryClient } from "@tanstack/react-query"

const useUser = () => {
   
    const { data: User = [], refetch } = useQuery(["User"], async () => {
        const result = await fetch("https://task-manager-server-puce.vercel.app/users");
        return result.json();
      });
return [User,refetch]
}
export default useUser;
