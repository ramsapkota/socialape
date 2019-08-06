import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "../types";
import shortid from "shortid";
import findIndex from "lodash/findIndex";

const initialState = [
  {
    type: "success",
    text: "Post added successful",
    id: "2WXIyVcMl"
  },
  {
    type: "success",
    text: "Post added successful",
    id: "EjfRiCwTS"
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          type: action.payload.type,
          text: action.payload.text,
          id: shortid.generate()
        }
      ];
    case REMOVE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.payload });
      console.log(action.payload, index);
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    default:
      return state;
  }
}
