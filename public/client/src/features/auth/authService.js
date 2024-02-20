import axios from "axios";
const API_URL = 'http://localhost:8000/api/users';
class AuthService{

    // Register user
    register = async(userData)=> {
        const response = await axios.post(API_URL + '/registration', userData);
        if(response.data){
            localStorage.setItem('user-JWT-MERN', JSON.stringify(response.data));
        }

        return response.data;
    }
    login = async (userData) => {
        const response = await axios.post(API_URL + '/login', userData);
        if(response.data){
            localStorage.setItem('user-JWT-MERN', JSON.stringify(response.data));
        }

        return response.data;
    }
    logout = async() => {
        localStorage.removeItem('user-JWT-MERN');
    }
}


export default new AuthService();


