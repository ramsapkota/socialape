import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "../types";

//add message
export const addFalshMessage = message => dispatch => {
  dispatch({
    type: ADD_FLASH_MESSAGE,
    payload: message
  });
};
// delete message
export const deleteFlashMessage = id => dispatch => {
  console.log(id);
  dispatch({
    type: REMOVE_FLASH_MESSAGE,
    payload: id
  });
};
