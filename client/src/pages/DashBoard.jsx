import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {

  const user = useSelector((state) => state.user.user);
  const [res,setRes]=useState([]);
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate("/search");
  }

  return (
    <div>
      <h1>DashBoard</h1>
      <p>Welcome - {`${user.firstName} ${user.lastName?user.lastName:""}`}</p>
      <div><img src={user.pictureUrl} alt="" /></div>
      <p>user: {JSON.stringify(user)}</p>
      <button onClick={handleClick}>Products</button>
    </div>
  );
}
