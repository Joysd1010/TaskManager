import {useQuery} from '@tanstack/react-query'
import {useContext} from 'react';
import {AuthContext} from '../Provider/AuthProvider';


const useCart = () => {
    const {user} = useContext(AuthContext)
    const { data: cart = [], refetch } = useQuery(["cart"], async () => {
        const result = await fetch(`http://localhost:5000/cart/${user.email}`);
        return result.json();
      });
return [cart,refetch]
}
export default useCart;

