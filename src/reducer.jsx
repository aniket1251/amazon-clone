export const initialState = {
    cart: [],
    user: null
};

// selector

export const getCartTotal = (cart) =>
    cart?.reduce((amount, item)=> item.price + amount, 0);


const reducer =(state, action)=>{
    switch (action.type) {
        case "ADD_TO_CART":
            return{
                ...state,
                cart:[...state.cart, action.item]
            };

        case "REMOVE_FROM_BASKET":
            const index = state.cart.findIndex((cartItem)=> cartItem.id === action.id);

            let newCart = [ ...state.cart];

            if (index >= 0 ){
                newCart.slice(index, 1);
            }else{
                console.warn(
                    `can't remove product (id: ${action.id}) as its not in cart!`
                )
            }

            return {
                ...state,
                cart: newCart
            }

            case "SET_USER":
                return{
                    ...state,
                    user: action.user
                }

        default:
            return state
            
    }
};

export default reducer;