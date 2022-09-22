import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Constants from "../Constants";
import { SocketContext } from "../context/SocketContext";

export default function AdminRoom() {
  const { socket, gameData } = useContext(SocketContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomNumber, setRoomNumber] = useState(searchParams.get("room_number"));
  const [questions, setQuestions] = useState();

  const changeStatus = (status) => {
    socket.emit(Constants.CHANGE_STATUS, {
      room_number: roomNumber,
      status: status,
    });
  };

  const dummyFunction = (param) => {
    if(param){
      setSearchParams()
      setRoomNumber(0)
    }
  }
  
  useEffect(() => {
    dummyFunction(false)
  },[])

  let navigate = useNavigate();

  return (
    <MDBContainer style={{ height: "200px" }}>
      <MDBRow className="align-items-center h-100">
        <MDBCol className="text-center">
          Configure your room: {roomNumber}
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center">
        <MDBCol className="text-center">Status: {gameData.status}</MDBCol>
      </MDBRow>
      <MDBRow style={{ height: "100px" }} className="align-items-center">
        <MDBCol className="text-center">
          <MDBBtn color="primary" onClick={() => changeStatus("STARTING")}>
            Change status to "STARTING"
          </MDBBtn>
        </MDBCol>
        <MDBCol className="text-center">
          <MDBBtn color="success" onClick={() => changeStatus("STARTED")}>
            Change status to "STARTED"
          </MDBBtn>
        </MDBCol>
        <MDBCol className="text-center">
          <MDBBtn color="info" onClick={() => changeStatus("PAUSED")}>
            Change status to "PAUSED"
          </MDBBtn>
        </MDBCol>
        <MDBCol className="text-center">
          <MDBBtn color="danger" onClick={() => changeStatus("FINISHED")}>
            Change status to "FINISHED"
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow style={{ height: "100px" }} className="align-items-center">
        <MDBCol className="text-center">
          <MDBBtn
            color="danger"
            onClick={() =>
              socket.emit(Constants.RESET_GAME, { room_number: roomNumber })
            }
          >
            RESET GAME
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center">
        <MDBCol className="text-center">
          <div>Load questions:</div>
          <MDBTextArea
            style={{ color: "white" }}
            label="Questions"
            id="textAreaExample"
            placeholder='[{
               "id":"some unique id",
               "name": "question name",
               "answers": [{
                    "id": "some unique id",
                    "answer": "You can put here 1..n answers",
                    "score": 1
                }] 
              }]'
            rows={10}
            onChange={(e) => {
              setQuestions(e.target.value);
            }}
          />
        </MDBCol>
        <MDBCol className="text-center">
          <MDBRow>
            <MDBBtn
              color="success"
              onClick={() =>
                socket.emit(Constants.DEFAULT_QUESTIONS, {
                  room_number: roomNumber,
                  questions: questions,
                })
              }
            >
              LOAD DEFAULT QUESTIONS
            </MDBBtn>
          </MDBRow>
          <MDBRow className="my-5">
            <MDBBtn
              color="success"
              onClick={() =>
                socket.emit(Constants.UPDATE_QUESTIONS, {
                  room_number: roomNumber,
                  questions: questions,
                })
              }
            >
              UPDATE QUESTIONS
            </MDBBtn>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center">
        <MDBCol className="text-center">
          Questions loaded: {gameData.questions.length}
        </MDBCol>
        <MDBCol className="text-center">
          Start question: {gameData.startQuestion}
        </MDBCol>
        <MDBCol className="text-center">
          To question: {gameData.endQuestion}
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center">
        <MDBCol className="text-center">
          <MDBBtn
            color="success"
            onClick={() =>
              socket.emit(Constants.GET_USERS, {
                room_number: roomNumber,
              })
            }
          >
            GET USERS INFO
          </MDBBtn>
        </MDBCol>
        <MDBCol className="text-center">
          <MDBBtn
            color="success"
            onClick={() =>
              socket.emit(Constants.ASK_DATA, {
                room_number: roomNumber,
              })
            }
          >
            ASK DATA
          </MDBBtn>
        </MDBCol>
        <MDBCol className="text-center">
          <MDBBtn
            color="success"
            onClick={() =>
              console.log(gameData)
            }
          >
            ASK GAME DATA
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center h-100">
        <MDBCol className="text-center">
          <MDBBtn
            color="danger"
            onClick={() =>
              socket.emit(Constants.RESET_ALL_INSTANCES, {
                room_number: roomNumber,
              })
            }
          >
            RESET ALL INSTANCES
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center h-100">
        <MDBCol className="text-center">
          <MDBBtn
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
