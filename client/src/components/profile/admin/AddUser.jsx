import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddUser } from "../../../store/actions/adminActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = ({ display, setDisplay }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    balance: "",
    password: "",
  });
  const [error, setError] = useState({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({});

    if (formData.firstName === "") {
      setError({ firstName: "First Name is required" });
      return;
    }
    if (formData.lastName === "") {
      setError({ lastName: "Last Name is required" });
      return;
    }
    if (formData.email === "") {
      setError({ email: "Email is required" });
      return;
    }
    if (!emailPattern.test(formData.email)) {
      setError({ email: "Please fill a valid email address" });
      return;
    }
    if (formData.balance === "") {
      console.log("Empty balance before update:", formData.balance);
      const name = "balance";
      setFormData({
        ...formData,
        [name]: 0,
      });
      console.log("Updated balance:", formData.balance);
    }
    if (formData.password === "") {
      setError({ password: "Password is required" });
      return;
    }
    if (formData.password.length < 6 || formData.password.length > 15) {
      setError({
        password: "Password must be between 6 to 15 characters",
      });
      return;
    }
    SubmitForm();
  };

  const SubmitForm = () => {
    console.log(formData);
    const toastId = toast("Adding User", { type: "info", autoClose: false });
    dispatch(asyncAddUser(formData))
      .then((status) => {
        if (status == 200) {
          toast.update(toastId, {
            render: "User added successfully",
            type: "success",
            autoClose: 3000,
          });
          setDisplay("none");
        } else if (status == 409) {
          setError({ email: "Email already in use!" });
          toast.update(toastId, {
            render: "Email already exists!",
            type: "error",
            autoClose: 3000,
          });
        }
      })
      .catch(() => {
        toast.update(toastId, {
          render: "Error adding user: " + error.message,
          type: "error",
          autoClose: 3000,
        });
      });
  };

  return (
    <div
      className="w-full h-[90vh]  bg-[rgba(0,0,0,0.8)] text-white absolute left-0 top-0"
      style={{ display: `${display}`, transition: ".3s all" }}
    >
      <div className="text-end text-lg px-[2vw]">
        <button
          onClick={() => {
            setDisplay("none");
          }}
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
      <p className="text-lg font-bold mb-[2vh] ">Add User</p>
      <form
        className="w-[60vw] mx-auto uppercase text-sm font-thin text-start sm:w-[90%]"
        onSubmit={ValidateForm}
        method="post"
      >
        <div className="flex flex-col gap-[1vh] mb-[4vh]">
          <label htmlFor="firstName">firstName</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            placeholder="John"
            onChange={HandleInput}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
          />
          <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
            {error.firstName ? error.firstName : ""}
          </small>
        </div>
        <div className="flex flex-col gap-[1vh] mb-[4vh]">
          <label htmlFor="lastName">lastName</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={HandleInput}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
          />
          <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
            {error.lastName ? error.lastName : ""}
          </small>
        </div>
        <div className="flex flex-col gap-[1vh] mb-[4vh]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={HandleInput}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
          />
          <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
            {error.email ? error.email : ""}
          </small>
        </div>
        <div className="flex flex-col gap-[1vh] mb-[4vh]">
          <label htmlFor="balance">Balance(optional)</label>
          <input
            type="text"
            name="balance"
            id="balance"
            placeholder="5000"
            value={formData.balance}
            onChange={HandleInput}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
          />
          <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
            {error.balance ? error.balance : ""}
          </small>
        </div>
        <div className="flex flex-col gap-[1vh] mb-[4vh]">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            value={formData.password}
            onChange={HandleInput}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
          />
          <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
            {error.password ? error.password : ""}
          </small>
        </div>
        <div className="text-center">
          <button className="text-slate-700 bg-white px-[4vw] rounded-[3vh] py-[1vh]">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
