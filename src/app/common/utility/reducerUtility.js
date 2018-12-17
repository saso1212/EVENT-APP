
//this is function that set states with values that we pass try the function
export const createReducer=(initialState,fnMap)=>{
    return (state=initialState,{type,payload})=>{
        const handler=fnMap[type];
        return handler ? handler(state,payload) :state
    }
}