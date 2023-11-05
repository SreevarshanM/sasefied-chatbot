import React, { useEffect, useState } from "react";
import SmsSharpIcon from "@mui/icons-material/SmsSharp";
import chatbotSenderIcon from "../Image/chatbot_sender_icon.jpeg";
import typinggif from "../Image/typing.gif";
const MessageTemp = (props) => {
  // const scrollToBottom=ContextState()
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTyping(false);
    }, 2000);
    props.scrollableRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typing]);

  return (
    <>
      {typing && props.IAmSending ? (
        <img
          src={typinggif}
          style={{
            display: `${props.IAmSending ? "flex" : "none"}`,
            width: "70px",
            height: "50px",
            color: "#fff",
            cursor: "default",
            textAlign: "center",
            lineHeight: "40px",
            alignSelf: "flex-end",
            background: "#724ae8",
            borderRadius: "4px",
            fontSize: "2em",
            margin: "50px 0px 0px 20px",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: `${props.IAmSending ? "flex-start" : "flex-end"}`,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "70%",
              justifyContent: `${props.IAmSending ? "flex-start" : "flex-end"}`,
            }}
          >
            <img
              src={chatbotSenderIcon}
              style={{
                display: `${props.IAmSending ? "flex" : "none"}`,
                width: "40px",
                height: "40px",
                color: "#fff",
                cursor: "default",
                textAlign: "center",
                lineHeight: "40px",
                alignSelf: "flex-end",
                background: "#111",
                borderRadius: "4px",
                fontSize: "2em",
                margin: "0px 0px 0px 20px",
              }}
            />
            {
              <p
                style={{
                  background: `${props.IAmSending ? "#ccc" : "#111"}`,
                  color: `${props.IAmSending ? "black" : "white"}`,
                  margin: "20px 10px 0px",
                  padding: "10px 10px 5px",
                  borderRadius: "10px 10px 10px 0px",
                  textAlign: "left",
                }}
              >
                {props.message}
              </p>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default MessageTemp;
