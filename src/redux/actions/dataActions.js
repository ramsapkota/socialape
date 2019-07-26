import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from "../type";
import axios from "axios";

//get all screams
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_SCREAMS, payload: [] });
    });
};

//Like a scream
// export const likeScream =(screamId)=>(dispatch)=>{
//     axios.get() 8:12:23
// }
//Unlike a scream
