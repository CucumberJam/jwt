import {useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {create} from '../features/items/itemSlice';

function ItemForm () {
    const [formData, setFormData] = useState({
        title: '',
        text: ''
    });
    const {title, text} = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    const dispatch= useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if(title === '' || text === ''){
            toast.error('Please fill all fields');
        }else{
            const itemData = {
                title,
                text
            }
            dispatch(create(itemData));

            setFormData(() => ({
                title: '',
                text: ''
            }));
        }
    }

    return <>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Item name:</label>
                    <input type='text' id='title' name='title'
                           value={title}
                           onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='text'>Item description: </label>
                    <input type='text' id='text' name='text'
                           value={text}
                           onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'></button>
                </div>
            </form>
        </section>
    </>
}


export default ItemForm;