import React, { useEffect, useRef, useState } from "react";
import MessageTemp from "./MessageTemp";
import { validatePhoneNumber, validateEmail } from "../Functions/MyFunctions";
import axios from "axios";
import { BsXCircleFill } from "react-icons/bs";
const mydata = {
  anyHarassment: "",
  safe: "",
  organization: "",
  name: "",
  location: "",
  contactNumber: "",
  email: "",
  employeeOrStudentId: "",
  isEthnicMinority: "",
  gender: "",
  assaulted: "",
  oneOffIncident: "",
  dateOfIncident: "",
  nameOfAssaulter: "",
  reportAnonymously: "",
  reportToManagement: "",
  locationOfIncident: "",
};
const dataForDepression = {
  organization: "",
  name: "",
  email: "",
  gender: "",
  location: "",
  employeeOrStudentId: "",
  regularIssue: "",
  consultingDoctor: "",
  reportToSchoolAuthority: "",
  makeSpecialArrangements: "",
  detail: "",
};
const Chatbox = (props) => {
  const [userResponse, setUserResponse] = useState("");
  const [index, setIndex] = useState(1);
  const [answer, setAnswer] = useState([""]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const bottomRef = useRef(null);
  useEffect(() => {
    // Update screenWidth when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Remove the resize event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  });

  const chatBotWidth = screenWidth < 768 ? "90%" : "470px";
  const chatBotPosition = screenWidth < 768 ? "20px" : "35px";
  const predefinedQuestions = [
    "Hi 👋, my name is Mr Safe. How can I help you today?🤔",
    "1. Sexual Harassment \n 2. Rape\n3. Harassment\n4. Hate Crime\n5. Depression or Anxiety\n6. Other Health Problems",
    "Before we go further, we need to know about you. Please help us by answering some questions",
    "Are you currently safe? Yes/No",
    "Which organization or university do you work for or study in? (Eg. - Sasefied, FoodPiazza)",
    "What is your name?",
    "Where are you based? (Eg.- India, United Kingdom, USA)",
    "What is your contact number?",
    "What is your email address?",
    "What is your employee or student id?",
    "Do you recognize as an ethnic minority? Yes/No",
    "Your Gender? Male/Female/Others",
    "Are you assaulted? Yes/No",
    "Was it a one-off incident? Yes/No",
    "Date of incident(s)?",
    "Location of incident",
    "Name of person(s) who assaulted you?",
    "Would you like to report anonymously or with your details? Yes/No",
    "Would you like to report this to management? Yes/No",
    "Thankyou so much! Our team would contact you soon",
  ];

  const predefinedQuestionsForDepression = [
    "Before we go further, we need to know about you. Please help us by answering some questions",
    "Which organization or university do you work for or study in? (Eg. - Sasefied, FoodPiazza)",
    "What is your name?",
    "Where are you based? (Eg.- India, United Kingdom, USA)",
    "What is your contact number?",
    "What is your email address?",
    "What is your employee or student id?",
    "Your Gender? Male/Female/Others",
    "Is your health situation a regular issue? (Yes/No)",
    "Are you consulting a doctor or counselor? (Yes/No) ",
    "Would you like to speak in detail with school appointed authority? (Yes/No)",
    "Would you like the institute to make any special arrangements? (Yes/No) ",
    "Please provide detail in few words",
  ];
  const [divElement, setDivElement] = useState([
    <MessageTemp
      IAmSending={true}
      scrollableRef={bottomRef}
      message={predefinedQuestions[0]}
    />,
    <MessageTemp
      IAmSending={true}
      scrollableRef={bottomRef}
      message={predefinedQuestions[1]}
    />,
  ]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [divElement]);
  const SaveResponses = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const data = await axios.post(
        "https://sasefied-backend.onrender.com/api/createQuery",
        mydata,
        { headers }
      );
      console.log(mydata);
    } catch (error) {
      console.log(error);
    }
  };
  const SaveResponseForDepression = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const data = await axios.post(
        "https://sasefied-backend.onrender.com/api/createHealthIssueQuery",
        dataForDepression,
        { headers }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleSaveResponse = () => {
    switch (index) {
      case 1:
        {
          if (
            userResponse === "1" ||
            userResponse === "2" ||
            userResponse === "3" ||
            userResponse === "4"
          ) {
            setAnswer((answer) => [...answer, userResponse, ""]);
            mydata.anyHarassment = userResponse;
            setDivElement([
              ...divElement,
              [
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestions[index + 1]}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestions[index + 2]}
                />,
              ],
            ]);
            setIndex(3);
          } else if (userResponse === "5" || userResponse === "6") {
            setAnswer((answer) => [...answer, userResponse, ""]);
            setDivElement([
              ...divElement,
              [
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[0]}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[1]}
                />,
              ],
            ]);
            setIndex(3);
          } else {
            setDivElement([
              ...divElement,
              [
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={"Please give answer in range 1 to 6."}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestions[index]}
                />,
              ],
            ]);
            setIndex(2);
          }
        }
        break;
      case 2:
        {
          if (
            userResponse === "1" ||
            userResponse === "2" ||
            userResponse === "3" ||
            userResponse === "4"
          ) {
            setAnswer((answer) => [...answer, userResponse, ""]);
            mydata.anyHarassment = userResponse;
            setDivElement([
              ...divElement,
              [
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestions[index]}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestions[index + 1]}
                />,
              ],
            ]);
            setIndex(3);
          } else {
            setDivElement([
              ...divElement,
              [
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={"Please give ans in range 1 to 6."}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestions[index - 1]}
                />,
              ],
            ]);
            setIndex(2);
          }
        }
        break;
      case 3:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            dataForDepression.organization = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestionsForDepression[2]}
              />,
            ]);
            setIndex(4);
          } else if (userResponse.toLowerCase() === "no") {
            mydata.safe = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please call on 999"}
              />,
            ]);
            SaveResponses();
            setIndex(20);
            break;
          } else if (userResponse.toLowerCase() === "yes") {
            mydata.safe = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[4]}
              />,
            ]);

            setIndex(4);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please answer only Yes/No"}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[3]}
              />,
            ]);

            setIndex(3);
          }
        }
        break;
      case 4:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            dataForDepression.name = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestionsForDepression[3]}
              />,
            ]);
            setIndex(5);
          } else {
            mydata.organization = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[5]}
              />,
            ]);
            setIndex(5);
          }
        }
        break;
      case 5:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            dataForDepression.location = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestionsForDepression[4]}
              />,
            ]);
            setIndex(6);
          } else {
            mydata.name = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[6]}
              />,
            ]);
            setIndex(6);
          }
        }
        break;
      case 6:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            if (!validatePhoneNumber(userResponse)) {
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={
                    "Please provide correct phone number(i.e of 10 digits)"
                  }
                />,
              ]);
            } else {
              dataForDepression.contact = userResponse;
              setAnswer([...answer, userResponse]);
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[5]}
                />,
              ]);
              setIndex(9);
            }
          } else {
            mydata.location = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[7]}
              />,
            ]);
            setIndex(7);
          }
        }
        break;
      case 7:
        {
          if (!validatePhoneNumber(userResponse)) {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={
                  "Please provide correct phone number(i.e of 10 digits)"
                }
              />,
            ]);
          } else {
            mydata.contactNumber = userResponse;
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[8]}
              />,
            ]);
            setAnswer([...answer, userResponse]);
            setIndex(8);
          }
        }
        break;
      case 8:
        {
          if (!validateEmail(userResponse)) {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please provide correct email address(Ex. abc@bcd.ckd"}
              />,
            ]);
          } else {
            mydata.email = userResponse;
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[9]}
              />,
            ]);
            setAnswer([...answer, userResponse]);
            setIndex(9);
          }
        }
        break;
      case 9:
        if (answer[1] === "5" || answer[1] === "6") {
          if (!validateEmail(userResponse)) {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please provide correct email address(Ex. abc@bcd.ckd"}
              />,
            ]);
          } else {
            dataForDepression.email = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestionsForDepression[6]}
              />,
            ]);
            setIndex(10);
          }
        } else {
          mydata.employeeOrStudentId = userResponse;
          setAnswer([...answer, userResponse]);
          setDivElement([
            ...divElement,
            <MessageTemp
              IAmSending={false}
              scrollableRef={bottomRef}
              message={userResponse}
            />,
            <MessageTemp
              IAmSending={true}
              scrollableRef={bottomRef}
              message={predefinedQuestions[10]}
            />,
          ]);
          setIndex(10);
        }
        break;
      case 10:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            dataForDepression.employeeOrStudentId = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestionsForDepression[7]}
              />,
            ]);
            setIndex(11);
          } else if (
            userResponse.toLowerCase() === "yes" ||
            userResponse.toLowerCase() === "no"
          ) {
            mydata.isEthnicMinority = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[11]}
              />,
            ]);
            setIndex(11);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please answer only Yes/No"}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[10]}
              />,
            ]);
            setIndex(10);
          }
        }
        break;
      case 11:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            if (
              userResponse.toLowerCase() === "male" ||
              userResponse.toLowerCase() === "female" ||
              userResponse.toLowerCase() === "other"
            ) {
              dataForDepression.gender = userResponse;
              setAnswer([...answer, userResponse]);
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[8]}
                />,
              ]);
              setIndex(12);
            } else {
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={"Please answer gender in Male/Female/Others"}
                />,
              ]);
            }
          } else if (
            userResponse.toLowerCase() === "male" ||
            userResponse.toLowerCase() === "female" ||
            userResponse.toLowerCase() === "other"
          ) {
            mydata.gender = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[12]}
              />,
            ]);
            setIndex(12);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please answer gender in Male/Female/Others"}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[11]}
              />,
            ]);
            setIndex(11);
          }
        }
        break;
      case 12:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            if (
              userResponse.toLowerCase() === "yes" ||
              userResponse.toLowerCase() === "no"
            ) {
              dataForDepression.regularIssue = userResponse;
              setAnswer([...answer, userResponse]);
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[9]}
                />,
              ]);
              setIndex(13);
            } else {
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={"Please answer only Yes/No"}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[8]}
                />,
              ]);
              setIndex(12);
            }
          } else if (userResponse.toLowerCase() === "no") {
            mydata.assaulted = userResponse;
            setAnswer([...answer, userResponse, "", "", "", ""]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[17]}
              />,
            ]);
            setIndex(17);
          } else if (userResponse.toLowerCase() === "yes") {
            mydata.assaulted = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[13]}
              />,
            ]);
            setIndex(13);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please answer in Yes/No"}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[12]}
              />,
            ]);
            setIndex(12);
          }
        }
        break;
      case 13:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            if (
              userResponse.toLowerCase() === "yes" ||
              userResponse.toLowerCase() === "no"
            ) {
              dataForDepression.consultingDoctor = userResponse;
              setAnswer([...answer, userResponse]);
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[10]}
                />,
              ]);
              setIndex(14);
            } else {
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={"Please answer only Yes/No"}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[9]}
                />,
              ]);
              setIndex(13);
            }
          } else if (
            userResponse.toLowerCase() === "yes" ||
            userResponse.toLowerCase() === "no"
          ) {
            mydata.oneOffIncident = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[14]}
              />,
            ]);
            setIndex(14);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please answer in Yes/No."}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[13]}
              />,
            ]);
            setIndex(13);
          }
        }
        break;
      case 14:
        {
          if (answer[1] === "5" || answer[1] === "6") {
            if (
              userResponse.toLowerCase() === "yes" ||
              userResponse.toLowerCase() === "no"
            ) {
              dataForDepression.reportToSchoolAuthority = userResponse;
              setAnswer([...answer, userResponse]);
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={`${
                    userResponse.toLowerCase() === "no"
                      ? "Your request is acknowledged. Institute will not take any action on the subject as requested"
                      : "Your request is acknowledged"
                  } `}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[11]}
                />,
              ]);
              setIndex(15);
            } else {
              setDivElement([
                ...divElement,
                <MessageTemp
                  IAmSending={false}
                  scrollableRef={bottomRef}
                  message={userResponse}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={"Please answer in Yes/No."}
                />,
                <MessageTemp
                  IAmSending={true}
                  scrollableRef={bottomRef}
                  message={predefinedQuestionsForDepression[10]}
                />,
              ]);
              setIndex(14);
            }
          } else {
            mydata.dateOfIncident = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[15]}
              />,
            ]);
            setIndex(15);
          }
        }
        break;
      case 15:
        if (answer[1] === "5" || answer[1] === "6") {
          if (
            userResponse.toLowerCase() === "yes" ||
            userResponse.toLowerCase() === "no"
          ) {
            dataForDepression.makeSpecialArrangements = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={`${
                  userResponse.toLowerCase() === "no"
                    ? "Your request is acknowledged. Institute will not take any action on the subject as requested"
                    : "Your request is acknowledged"
                } `}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestionsForDepression[12]}
              />,
            ]);
            setIndex(16);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please answer in Yes/No."}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestionsForDepression[11]}
              />,
            ]);
            setIndex(15);
          }
        } else {
          mydata.locationOfIncident = userResponse;
          setAnswer([...answer, userResponse]);
          setDivElement([
            ...divElement,
            <MessageTemp
              IAmSending={false}
              scrollableRef={bottomRef}
              message={userResponse}
            />,
            <MessageTemp
              IAmSending={true}
              scrollableRef={bottomRef}
              message={predefinedQuestions[16]}
            />,
          ]);
          setIndex(16);
        }
        break;
      case 16:
        if (answer[1] === "5" || answer[1] === "6") {
          dataForDepression.detail = userResponse;
          setAnswer([...answer, userResponse]);
          setDivElement([
            ...divElement,
            <MessageTemp
              IAmSending={false}
              scrollableRef={bottomRef}
              message={userResponse}
            />,
            <MessageTemp
              IAmSending={true}
              scrollableRef={bottomRef}
              message={"Thankyou so much! Our team would contact you soon"}
            />,
          ]);
          SaveResponseForDepression();
          setIndex(20);
        } else {
          mydata.nameOfAssaulter = userResponse;
          setAnswer([...answer, userResponse]);
          setDivElement([
            ...divElement,
            <MessageTemp
              IAmSending={false}
              scrollableRef={bottomRef}
              message={userResponse}
            />,
            <MessageTemp
              IAmSending={true}
              scrollableRef={bottomRef}
              message={predefinedQuestions[17]}
            />,
          ]);
          setIndex(17);
        }
        break;
      case 17:
        {
          if (
            userResponse.toLowerCase() === "yes" ||
            userResponse.toLowerCase() === "no"
          ) {
            mydata.reportAnonymously = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[18]}
              />,
            ]);
            setIndex(18);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"please answer in Yes/No"}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[17]}
              />,
            ]);
            setIndex(17);
          }
        }
        break;
      case 18:
        {
          if (
            userResponse.toLowerCase() === "yes" ||
            userResponse.toLowerCase() === "no"
          ) {
            mydata.reportToManagement = userResponse;
            setAnswer([...answer, userResponse]);
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[19]}
              />,
            ]);
            SaveResponses();
            setIndex(20);
          } else {
            setDivElement([
              ...divElement,
              <MessageTemp
                IAmSending={false}
                scrollableRef={bottomRef}
                message={userResponse}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={"Please answer in Yes/No"}
              />,
              <MessageTemp
                IAmSending={true}
                scrollableRef={bottomRef}
                message={predefinedQuestions[18]}
              />,
            ]);

            setIndex(18);
          }
        }
        break;
      default:
        break;
    }

    setUserResponse("");
  };
  const handleSaveResponseByKey = (e) => {
    if (e.key === "Enter") {
      handleSaveResponse();
    }
  };
  return (
    <div
      style={{
        height: "80%",
        position: "fixed",
        right: `${chatBotPosition}`,
        bottom: "90px",
        width: `${chatBotWidth}`,
        background: "#fff",
        borderRadius: "15px",
      }}
    >
      <header
        style={{
          height: "15%",
          background: "#111",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <h2>ChatBot</h2>
        <BsXCircleFill
          className="cross_chat"
          style={{
            fontSize: "2em",
            background: "#111",
            position: "absolute",
            right: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            props.setOpenChat(false);
          }}
        />
      </header>
      <div style={{ height: "70%", overflowY: "scroll" }}>
        {divElement}
        <div ref={bottomRef} />
      </div>
      <div
        style={{
          height: "15%",
          width: "90%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          onKeyDown={handleSaveResponseByKey}
          placeholder="Enter your message.."
          onChange={(e) => setUserResponse(e.target.value)}
          value={userResponse}
          style={{
            width: "100%",
            height: "40px",
            fontSize: "18px",
            border: "1px solid grey",
            borderRadius: "8px",
            padding: "10px",
          }}
        />
        <span
          id="send-btn"
          onClick={handleSaveResponse}
          style={{
            background: "#111",
            padding: "10px",
            borderRadius: "12px",
            color: "#fff",
            margin: "0px 9px",
            cursor: "pointer",
          }}
          className="material-symbols-rounded"
        >
          send
        </span>
      </div>
    </div>
  );
};
export default Chatbox;
