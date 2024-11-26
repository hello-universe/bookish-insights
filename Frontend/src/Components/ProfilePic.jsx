import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "../axios"
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import { Context } from "../context/Context";

function ProfilePic() {
    const navigate = useNavigate()
  const fileInput = useRef(null);
  const { setProfilePicModal } = useContext(Context);
  const [profileImg, setProfileImg] = useState(null)

  const notifyOnError = (msg) => toast.error(msg);

  const notifyOnSuccess = (msg) => toast.success(msg);
  const uploadAction = () => {
    fileInput.current.click();
  };
  const closeAction = () => setProfilePicModal(false);

  const postImage = async ()=>{
    const formData = new FormData();
    formData.append("image", profileImg);


    try{
        const res = await axios.put("/profile/updatepic", formData, {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            }
        })
        console.log(res);
        const resData = await res.data
        if(res.status !== 200){
            notifyOnError(resData.message)
        }
        else{
            notifyOnSuccess(resData.message)
            setProfilePicModal(false)
            location.reload()
        }
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    if(profileImg){
        postImage()
    }
  }, [profileImg])
  return (
    <div>
      <div className="modal w-screen h-screen absolute inset-0 bg-[rgba(0,0,0,0.2)]">
        <div className="container w-96 h-56 absolute shadow-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#fff3f3] text-gray-600 p-2 flex flex-col gap-5 text-center items-center justify-center rounded-lg">
          <button
            className="closeBtn absolute right-2 top-2"
            onClick={closeAction}
          >
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-semibold">Change Profile Photo</h2>
          <div className="actions flex flex-col gap-8 w-full justify-center items-center">
            <div className="upload-photo">
              <button
                className="logout bg-red-600 px-3 py-1.5 rounded text-white hover:translate-y-[-5px] duration-500"
                onClick={uploadAction}
              >
                Upload Photo
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInput}
                onChange={(e)=>setProfileImg(e.target.files[0])}
              />
            </div>
            <button
              className="cancel bg-[#22577a] px-3 py-1.5 rounded text-white hover:translate-y-[-5px] duration-500"
              onClick={closeAction}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePic;
