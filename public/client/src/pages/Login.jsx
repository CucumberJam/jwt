import {useState, useEffect} from 'react';
import {FaSignInAlt} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import {login, register, reset} from "../features/auth/authSlice";
import Spinner from '../components/Spinner';
function Login () {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth);

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(password === '' || email === ''){
            toast.error('Please fill all fields');
        }else{
            const userData = {
                email,
                password
            }
            dispatch(login(userData));
        }
    }

    if(isLoading){
        return <Spinner/>
    }

    return <>
        <section className='heading'>
            <h1><FaSignInAlt/>   Login</h1>
            <p>Enter</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <label className='form-group'>
                    <input type='email'
                           className='form-control'
                           id='email'
                           name='email'
                           value={email}
                           placeholder='Enter your email'
                           onChange={onChange}/>
                </label>
                <label className='form-group'>
                    <input type='password'
                           className='form-control'
                           id='password'
                           name='password'
                           value={password}
                           placeholder='Enter your password'
                           onChange={onChange}/>
                </label>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'></button>
                </div>
            </form>
        </section>
    </>
}


export default Login;