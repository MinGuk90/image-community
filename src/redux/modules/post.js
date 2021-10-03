import { createAction, handleAction, handleActions } from "redux-actions";
import produce, { Produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// action creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

// initialState
const initialState = {
  list: [],
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "minguk",
  //   user_profile:
  //     "https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjlfMzcg/MDAxNTUzODI3OTU3NTg1.geQ7whX1F1DWXBeARbVmBfuqZWp_Db152hko56ZQneIg.5fjMBtfCJeBPcwr1CIndT4qQGbepVcgI9skIDJkEDq8g.JPEG.petianbooks/%25EA%25B0%2595%25EC%2595%2584%25EC%25A7%2580_%25EA%25B0%25B8%25EC%259A%25B0%25EB%259A%25B1.jpg?type=w800",
  // },
  image_url:
    "https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjlfMzcg/MDAxNTUzODI3OTU3NTg1.geQ7whX1F1DWXBeARbVmBfuqZWp_Db152hko56ZQneIg.5fjMBtfCJeBPcwr1CIndT4qQGbepVcgI9skIDJkEDq8g.JPEG.petianbooks/%25EA%25B0%2595%25EC%2595%2584%25EC%25A7%2580_%25EA%25B0%25B8%25EC%259A%25B0%25EB%259A%25B1.jpg?type=w800",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    
    postDB
      .add({ ...user_info, ..._post })
      .then((doc) => {
        let post = {user_info, ..._post, id:doc.id};
        dispatch(addPost(post));
        history.replace("/");
      })
      .catch((err) => {
        console.log("post 작성에 실패했어요!", err);
      });
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = doc.data();

        // ['comment_cnt', 'contents', ..]
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        post_list.push(post);
      });

      console.log(post_list);

      dispatch(setPost(post_list));
    });
  };
};

// reducer  << 불변성을 위해 immer사용 immer produce>>
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
    }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
};

export { actionCreators };
