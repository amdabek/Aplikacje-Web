import React, { useState } from "react";

function Komentarz({ id, body, postId, likes, user }) {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => setLikeCount(likeCount + 1);
  const handleDislike = () => setLikeCount(likeCount - 1);

  return (
    <div style={{ border: "1px solid black", margin: "5px" }}>
      <p>
        <strong>Post ID:</strong> {postId}
      </p>
      <p>
        <strong>Autor:</strong> {user.fullName} "{user.username}"
      </p>
      <p>
        <strong>Komentarz:</strong> {body}
      </p>
      <p>
        <strong>Likes:</strong> {likeCount}
      </p>
      <button onClick={handleLike}>LIKE</button>
      <button onClick={handleDislike}>DISLIKE</button>
    </div>
  );
}

export default Komentarz;
