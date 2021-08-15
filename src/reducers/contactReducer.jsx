import initialState from "./InitialState.json";

const contactReducer = (state=initialState.contact, action) => {
    switch(action.type){
        case "Update-Contact":
            return action.payload;
        default:
            return state;
    }
}
 
export default contactReducer;