import { useEffect } from "react"

const useTitle =(title)=>{
    useEffect(()=>{
        document.title=`${title} - TaskManager`
    },[title])
}
export default useTitle