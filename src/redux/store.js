import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartReducer from "./cartReducer";
import { myOrderReducer, orderDetailsReducer, orderReducer } from "./orderReducer";



const reducer = combineReducers({
    cart: cartReducer,
    newOrder: orderReducer,
    myOrder: myOrderReducer,
    orderDetail: orderDetailsReducer
})

let initialState={
    cart:{
        cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): {}
    }
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store