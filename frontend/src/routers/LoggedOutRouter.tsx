import React from "react";

function LoggedOutRouter() {
  const onclick = () => {};
  return (
    <div>
      <h1>로그아웃</h1>
      <button onClick={onclick}>click to login</button>
    </div>
  );
}

export default LoggedOutRouter;
