import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "./constants/cartConstants"

const initialData ={
    cartItems: [],
    shippingInfo: {}
}

const cartReducer = (state=initialData, action) => {
    switch(action.type){
        case ADD_TO_CART: 
        const item = action.payload
        const itemExists = state.cartItems.find(i=>i.product === item.product)
        if(itemExists){
            return {
                ...state, 
                cartItems: state.cartItems.map(i=>i.product===itemExists.product?item: i)

                // apple, samsung, nokia
                // samsung
                // apple, samsung, nokia
            }
        }
        else{
            return {
                ...state, 
                cartItems : [...state.cartItems, item]
            }
        }

        case REMOVE_FROM_CART:
            console.log(action.payload)
            return {
                ...state,
                cartItems : state.cartItems.filter(i=>i.product!=action.payload.product)
            }

        case CLEAR_CART:
            return {
                ...state,
                cartItems :  []
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload.shipping_info
            }

        default:
            return state
    }
}

export default cartReducer