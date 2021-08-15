// let initialState = {
//     document:{
//         id:"",
//         skinCd:false
//     }
// }
import initialState from "./InitialState.json";

export default function documentReducer(state=initialState.document, action){
    switch(action.type){
        case "Update-Skin":
            return {
                id:action.payload.id,
                skinCd:action.payload.skinCd
            }
        default:
            return state;
    }
}