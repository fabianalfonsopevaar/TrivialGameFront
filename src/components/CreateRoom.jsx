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

export default function CreateRoom() {
  const [roomCode, setRoomCode] = useState(3);

  const { socket } = useContext(SocketContext);
  let navigate = useNavigate();

  return (
    <MDBContainer style={{ height: "200px" }}>
      <MDBRow className="align-items-center h-100">
        <MDBCol className="text-center">
          <h3>Create room</h3>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center mb-5">
        <MDBCol className="text-center"></MDBCol>
        <MDBCol className="text-center">
          <MDBInput
            value={roomCode}
            label="Enter the new room code"
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
        <MDBCol className="text-center">
          <MDBBtn
            onClick={() => {
              socket.emit(Constants.CREATE_ROOM, { room_number: roomCode });
            }}
          >
            Create
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
