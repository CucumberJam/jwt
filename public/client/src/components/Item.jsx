import {useDispatch} from "react-redux";
import {remove} from '../features/items/itemSlice';


function Item ({item}) {

    const dispatch = useDispatch();

    return <div className='item'>
                <div className=''>
                    {new Date(item.createdAt).toLocaleDateString('en-US')}
                </div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
            <button className='close' onClick={() => dispatch(remove(item._id))}>X</button>
            </div>
}


export default Item;