import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { getUserInfo } from "../api/getUserInfo";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import { postLoginToken } from "../api/postLoginToken";
import Logo from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onGoogleSignIn = async (res) => {
    setLoading(true);
    await postLoginToken(res.credential);
    const user = await getUserInfo();
    dispatch(setUser(user));
    setLoading(false);
    navigate("/search");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Logo style={"text-8xl"}/>
      <div className="
        text-xl
        italic
        text-royal-green
        font-barlow
      ">EAT,SLEEP,BID,REPEAT</div>
      {loading && <p>loading...</p>}
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="Login" />
    </div>
  );
}
