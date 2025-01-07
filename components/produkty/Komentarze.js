import React, { useState, useEffect } from "react";
import Komentarz from "./Komentarz";

function Komentarze() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, []);

  return (
    <div>
      <h2>Komentarze</h2>
      {comments.map((c) => (
        <Komentarz
          key={c.id}
          id={c.id}
          body={c.body}
          postId={c.postId}
          likes={0}
          user={{
            id: c.user.id,
            username: c.user.username,
            fullName: "",
          }}
        />
      ))}
    </div>
  );
}

export default Komentarze;
