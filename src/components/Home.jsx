import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  return (
    <MDBContainer style={{ height: "200px" }}>
      <MDBRow className="align-items-center h-100">
        <MDBCol className="text-center">
          <h1>Trivial Game Pevaar</h1>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center">
        <MDBCol className="text-center">
          <MDBBtn
            onClick={() => {
              navigate("/create");
            }}
          >
            Create a private room
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center my-5">
        <MDBCol className="text-center">
          <MDBBtn
            onClick={() => {
              navigate("/join");
            }}
          >
            Join room
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
