import { useDispatch, useSelector } from "react-redux";
import { asyncLogOutUser } from "../../../store/actions/userActions";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [display, setDisplay] = useState("none");

  return (
    <div className="w-full h-full">
      <nav className="w-full relative px-[2vw] font-bold h-[10vh] bg-[#6d8eef] text-slate-200 flex items-center justify-between">
        <div className="filler w-[1.5vw] sm:w-max">
          <p className="hidden sm:block">Stock-Whisperer</p>
        </div>
        <p className="capitalize">
          {user?.firstName} {user?.lastName}
        </p>
        <div className="filler">
          <i
            onClick={() => {
              const id = document.getElementById("menu");
              if (display == "none") {
                setDisplay("block");
              } else {
                setDisplay("none");
              }
              id.classList.toggle("ri-menu-line");
              id.classList.toggle("ri-close-line");
            }}
            id="menu"
            className="ri-menu-line cursor-pointer"
          ></i>
        </div>
        <div
          style={{ display: `${display}` }}
          className="navSide bg-white  z-50 w-[30vw] sm:w-[15vw] text-center shadow-2xl py-[5vh] absolute top-[10vh] right-0 text-slate-700"
        >
          <div className="border-slate-300 py-[2vh] border-b-2 mb-[3vh]">
            <p
              className="mb-[3vh]"
              onClick={() => {
                navigate(`/user/${id}/terms-and-conditions`);
              }}
            >
              Terms And Condition
            </p>
            {/* <p
              onClick={() => {
                navigate(`/user/${id}/contact-us`);
              }}
            >
              Contact Us
            </p> */}
          </div>

          <p
            className=" cursor-pointer"
            onClick={() => {
              // console.log("log out user");
              dispatch(asyncLogOutUser());
            }}
          >
            <i className="ri-user-line me-1 "></i>Logout
          </p>
        </div>
      </nav>
      <div className="w-[70%] mx-auto mt-[5vh] text-slate-700 py-[4vh] px-[4vw] flex flex-col gap-[2vh] rounded shadow-lg sm:w-[50vw]">
        <p>
          Name : {user?.firstName} {user?.lastName}
        </p>
        <p>Email : {user?.email}</p>
        <p>Balance : Rs {user?.balance}</p>
      </div>
    </div>
  );
};

export default UserProfile;
