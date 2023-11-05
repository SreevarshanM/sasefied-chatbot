import React, { useState } from "react";
import bg from "../Image/bg.png";
import Chatbox from "./Chatbox";
import openChatIcon from "../Image/chatbot-2-removebg-preview.png";
const Home = () => {
  const [openChat, setOpenChat] = useState(false);
  const handleOpenChat = () => {
    setOpenChat(!openChat);
  };
  return (
    <div
      style={{
        height: "120vh",
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="chatbot-toggler"
        onClick={handleOpenChat}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "30px",
          outline: "none",
          border: "none",
          height: "20vh",
          width: "20vh",
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          transition: "all 0.2s ease",
        }}
      >
        {
          <img
            src={openChatIcon}
            style={{
              height: "15vh",
              width: "15vh",
              display: !openChat ? "flex" : "none",
              transition: "display 0.3s",
            }}
          />
        }
      </div>
      {openChat && <Chatbox setOpenChat={setOpenChat} />}
    </div>
  );
};

export default Home;
