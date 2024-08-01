import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Context } from "../context/Context";
import {useNavigate} from 'react-router-dom'

function Modal() {
  const { setModalOpen } = useContext(Context);
  const navigate = useNavigate()
  return (
    <div className="modal w-screen h-screen absolute inset-0 bg-[rgba(0,0,0,0.2)]">
      <div className="container w-96 h-56 absolute shadow-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#fff3f3] text-gray-600 p-2 flex flex-col gap-5 text-center items-center justify-center rounded-lg">
        <button
          className="closeBtn absolute right-2 top-2"
          onClick={() => setModalOpen(false)}
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-semibold">Confirm</h2>
        <p className="text-lg">Are you sure you want to logout?</p>
        <div className="actions flex gap-8 w-full justify-center items-center">
          <button className="logout bg-red-600 px-3 py-1.5 rounded text-white hover:translate-y-[-5px] duration-500" onClick={()=>{
            localStorage.removeItem("token")
            setModalOpen(false)
            navigate("/login")
          }}>
            Logout
          </button>
          <button className="cancel bg-[#22577a] px-3 py-1.5 rounded text-white hover:translate-y-[-5px] duration-500" onClick={()=> setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
