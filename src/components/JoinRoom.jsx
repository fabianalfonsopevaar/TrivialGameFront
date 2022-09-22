import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../Constants";
import { SocketContext } from "../context/SocketContext";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("3");
  const [userName, setUserName] = useState("Guest_" + new Date().getTime());
  const { socket } = useContext(SocketContext);
  let navigate = useNavigate();

  return (
    <MDBContainer style={{ height: "200px" }}>
      <MDBRow className="align-items-center h-100">
        <MDBCol className="text-center">
          <h3>Join room</h3>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center mb-5">
        <MDBCol className="text-center"></MDBCol>

        <MDBCol className="text-center">
          <MDBInput
            value={userName}
            label="Enter your username"
            id="username"
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </MDBCol>
        <MDBCol className="text-center"></MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center mb-5">
        <MDBCol className="text-center"></MDBCol>
        <MDBCol className="text-center">
          <MDBInput
            value={roomCode}
            label="Enter the room code"
            id="room_code"
            type="text"
            onChange={(e) => {
              setRoomCode(e.target.value);
            }}
          />
        </MDBCol>
        <MDBCol className="text-center"></MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center ">
        <MDBCol className="text-center"></MDBCol>

        <MDBCol className="text-center">
          <MDBBtn
            onClick={() => {
              socket.emit(Constants.JOIN_ROOM, {
                username: userName,
                room_number: roomCode,
              });
            }}
          >
            Join
          </MDBBtn>
        </MDBCol>
        <MDBCol className="text-center"></MDBCol>
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
