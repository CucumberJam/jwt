import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import ItemForm from "../components/ItemForm";
import Spinner from "../components/Spinner";
import {getAll, reset} from "../features/items/itemSlice";
import Item from "../components/Item";


function Dashboard () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {items, isLoading, isError, message} = useSelector((state) => state.items)


    useEffect(() => {
        if(isError){
            console.log(message);
        }
        if(!user){
            return navigate('/login');
        }
        dispatch(getAll());

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch]);


    if(isLoading){
        return <Spinner/>
    }

    return <>
        <section className='heading'>
            <h1>Welcome {user && user.name}</h1>
            <p>Dashboard</p>
        </section>

        <ItemForm/>
        <section className='content'>
            {items.length > 0 ?
                (
                    <div className='items'>
                        {items.map((item) => (
                            <Item key={item._id} item={item}/>
                        ))}
                    </div>
                )
                :  (<h3>You have not any goals</h3>)}
        </section>
    </>
}


export default Dashboard;