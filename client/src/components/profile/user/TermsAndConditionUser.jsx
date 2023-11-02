import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogOutUser } from "../../../store/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
const TermsAndConditionUser = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [display, setDisplay] = useState("none");
  const termsAndCondition = {
    "Acceptance of Terms":
      "By downloading, installing, or using the App, you accept and agree to be bound by these Terms. If you do not agree with these Terms, please do not use the App.",
    License:
      "The Company grants you a limited, non-exclusive, non-transferable, and revocable license to use the App for personal and non-commercial purposes. You may not reproduce, modify, distribute, or create derivative works based on the App.",
    "User Account":
      "To access certain features of the App, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information. You must provide accurate and current information during the registration process. You are solely responsible for all activities that occur under your account.",
    "Privacy Policy":
      "Your use of the App is subject to our Privacy Policy, which outlines how we collect, use, and share your personal information. By using the App, you consent to the practices described in the Privacy Policy.",
    "Risk Disclosure":
      "Investing in stocks and securities carries inherent risks. The App provides information for informational purposes only and does not constitute financial or investment advice. You are solely responsible for your investment decisions, and we are not liable for any financial losses incurred through your use of the App.",
    "Prohibited Activities":
      "You agree not to use the App for any unlawful or unauthorized purpose. You may not engage in any activity that disrupts or interferes with the App's operation or violates these Terms.",
    "Intellectual Property":
      "All content, trademarks, and intellectual property related to the App are owned by the Company. You may not use, copy, reproduce, or modify our intellectual property without our explicit permission.",
    Termination:
      "We reserve the right to terminate or suspend your access to the App at our discretion, with or without notice.",
    Disclaimer:
      "The App is provided 'as is' without any warranties or guarantees. We are not responsible for the accuracy, completeness, or timeliness of the information provided through the App.",
    "Limitation of Liability":
      "To the extent permitted by applicable law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages.",
    "Governing Law":
      "These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction].",
    "Contact Information":
      "If you have any questions or concerns about these Terms, please contact us at [Contact Email].",
  };
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
            className="ri-menu-line cursor-pointer "
          ></i>
        </div>
        <div
          style={{ display: `${display}` }}
          className="navSide bg-white z-50 w-[30vw] sm:w-[15vw] text-center shadow-2xl py-[5vh] absolute top-[10vh] right-0 text-slate-700"
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
              console.log("log out user");
              dispatch(asyncLogOutUser());
            }}
          >
            <i className="ri-user-line me-1 "></i>Logout
          </p>
        </div>
      </nav>
      <div className="text-center mx-auto w-[80%] px-[1vw] py-[2vh] shadow-2xl">
        <p className="text-slate-700 text-lg font-extrabold">
          Stock Market App - Terms and Conditions
        </p>
        <p className="text-slate-600 text-sm mb-[2vh]">
          These terms and conditions ("Terms") govern your use of the stock
          market application (the "App") provided by [Your Company Name]
          ("Company," "we," "us," or "our"). By accessing or using the App, you
          agree to be bound by these Terms.
        </p>
        {Object.entries(termsAndCondition).map(([term, description]) => {
          return (
            <div key={term} className="mb-[2vh]">
              <p className="text-slate-700 text-md font-semibold w-full">
                {term} :-
              </p>
              <p className="text-slate-600 text-sm w-full">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TermsAndConditionUser;
