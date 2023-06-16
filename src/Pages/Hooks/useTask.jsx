import { useQuery,useQueryClient } from "@tanstack/react-query"

const useClass = () => {
   
    const { data: task = [], refetch } = useQuery(["tasks"], async () => {
        const result = await fetch("http://localhost:5000/alltask");
        return result.json();
      });
return [task,refetch]
}
export default useClass;
