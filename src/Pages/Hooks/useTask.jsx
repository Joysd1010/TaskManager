import { useQuery,useQueryClient } from "@tanstack/react-query"

const useClass = () => {
   
    const { data: task = [], refetch } = useQuery(["tasks"], async () => {
        const result = await fetch("https://task-manager-server-puce.vercel.app/alltask");
        return result.json();
      });
return [task,refetch]
}
export default useClass;
