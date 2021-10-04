// PostList.js
import React from "react";

import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        console.log(p);

        if (user_info && p.user_info.user_id === user_info?.uid) {
          return <Post key={p.id} {...p} is_me />;
        } else {
          return <Post key={p.id} {...p} />;
        }
      })}
    </React.Fragment>
  );
};

export default PostList;
