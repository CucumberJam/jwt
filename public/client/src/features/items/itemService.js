import axios from "axios";
const API_URL = 'http://localhost:8000/api/items';
class ItemService{
    config = (token) => ({
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    // Create new item:
    create = async(itemData, token)=> {
        const response = await axios.post(API_URL, itemData, this.config(token));
        return response.data;
    }

    // Get user's items:
    getAll = async(token) => {
        const response = await axios.get(API_URL, this.config(token));
        return response.data;
    }

    // Delete user's item:
    remove = async(itemId, token) => {
        const response = await axios.delete(`${API_URL}/${itemId}`, this.config(token));
        return response.data;
    }

}
export default new ItemService();