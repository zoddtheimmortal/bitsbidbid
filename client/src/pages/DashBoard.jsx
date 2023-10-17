import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import Logo from "../components/Logo";

export default function DashBoard() {

  const user = useSelector((state) => state.user.user);
  const [res,setRes]=useState([]);
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate("/search");
  }

  return (
    <div>
      <Logo/>
      <h1>DashBoard</h1>
      <p>Welcome - {`${user.firstName} ${user.lastName?user.lastName:""}`}</p>
      <div>
        <img src={user.pictureUrl} alt="" className="
        rounded-full
        "/>
        </div>
      <p>user: {JSON.stringify(user)}</p>
      <PillButton children="Products" onClick={handleClick}/>
    </div>
  );
}
