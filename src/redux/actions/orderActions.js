import axios from "axios"
import { isAuthenticated } from "../../API/userAPI"
import { API } from "../../config"
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async(dispatch, getState)=>
{
    const {token} = isAuthenticated()
    try{
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        //post data into backend
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        // axios -> response.data
        // fetch -> response.json()
        const {data} = await axios.post(`${API}/placeorder`,order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.error
        })
    }
}