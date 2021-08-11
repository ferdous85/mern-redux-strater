import { NOTES_LIST_FAIL, NOTES_LIST_REQUIST, NOTES_LIST_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUIST, NOTE_LIST_SUCCESS } from "../constants/noteConstants"


export const noteListReducer = (state={notes: []}, action) =>{
  switch (action.type) {
    case NOTES_LIST_REQUIST:
      return {loading:true}
    case NOTES_LIST_SUCCESS:
      return {loading:false, notes: action.payload}
    case NOTES_LIST_FAIL:
      return {loading:false, error: action.payload} 
     default:
      return state 
  }
}

