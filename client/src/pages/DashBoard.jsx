import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";

export default function DashBoard() {

  const user = useSelector((state) => state.user.user);
  const [res,setRes]=useState([]);

  const onClick=async()=>{
    const response=await axios.get("http://localhost:8080/products/all");
    console.log(response.data);
    setRes(response.data);
  }

  return (
    <div>
      <h1>DashBoard</h1>
      <p>Welcome - {`${user.firstName} ${user.lastName?user.lastName:""}`}</p>
      <div><img src={user.pictureUrl} alt="" /></div>
      <p>user: {JSON.stringify(user)}</p>
      <button onClick={onClick}>Click me!</button>
      <ul>{res.map(item=><li key={item.uid}>
        <div>Name: {item.name}</div>
        <div>Desc: {item.desc}</div>
        <div>Price: {item.price}</div>
      </li>)}</ul>
      <SearchBar></SearchBar>
    </div>
  );
}
