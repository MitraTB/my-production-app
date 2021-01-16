export default{
    SET_PRODUCT:(state , payload)=>{
        state.products= payload
    },
    ADD_PRODUCT: (state , payload) =>{
        state.products.push(payload)
    },
    DELETE_PRODUCT: (state , payload) =>{
        state.products = state.products.filter(product => product.id != payload);
    },
    EDIT_PRODUCT : (state , payload) =>{
        state.products = state.products.map(product => {
            if (product.id === payload.id){
                return payload;
            }
            return product;
        })
    }
}