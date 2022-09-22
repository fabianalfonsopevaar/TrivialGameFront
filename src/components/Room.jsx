import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBProgress,
  MDBProgressBar,
  MDBBadge,
  MDBRadio,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useContext, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Constants from "../Constants";
import { SocketContext } from "../context/SocketContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function shuffleArray(array) {
  if (!array) return [];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Room() {
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const username = useState(searchParams.get("username"));
  const roomNumber = useState(searchParams.get("room_number"));

  let { socket, data, gameData, resetGame, setResetGame } = useContext(
    SocketContext
  );

  const [outOfQuestions, setOutOfQuestions] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [actualQ, setActualQ] = useState({
    name: "",
    answers: [],
  });
  const [score, setScore] = useState(0);

  const dummyFunction = (param) => {
    if(param){
      setSearchParams()
    }
  }

  const nextQuestion = (randomScore = 0) => {
    let scoreToSend = randomScore === 0 ? score : randomScore;
    if (scoreToSend !== 0) {
      socket.emit(Constants.SEND_SCORE, {
        score: scoreToSend,
        username,
        room_number: roomNumber,
      });
      setScore(0);
      if (questions.length > 0) {
        let q = questions.shift();
        setQuestions(questions);
        if (q) {
          setActualQ(q);
        }
      } else {
        setGameStarted(false);
        setOutOfQuestions(true);
        socket.emit(Constants.USER_FINISHED, {
          username,
          room_number: roomNumber,
        });
      }
    } else {
      toast.error("You must select an answer");
    }
  };

  const resetMyGame = () => {
    setOutOfQuestions(false);
    setResetGame(false);
    setGameStarted(false);

    dummyFunction(false)
  };

  useEffect(() => {
    setGameStatus(gameData.status);
    if (gameData && gameData.status === "STARTING") {
      if (resetGame) {
        resetMyGame();
      }

      let arr = shuffleArray(gameData.questions ? gameData.questions : []);
      let q = arr.shift();
      setQuestions(arr);
      if (q) {
        setActualQ(q);
      }
    }
  }, [gameData, score]);

  return (
    <MDBContainer style={{ height: "200px" }}>
      <MDBRow className="align-items-center h-100">
        <MDBCol>
          <div>Users conected: {data ? data.length : 0}</div>
          <div className="text-center">Trivial Game</div>
        </MDBCol>
      </MDBRow>
      {data ? (
        data.slice(0, 5).map((d) => {
          return (
            <MDBRow className="align-items-center" key={d.socketId}>
              <MDBCol style={{ textAlign: "end" }} size={2}>
                <MDBBadge className="ms-2" color="danger">
                  {d.username}
                </MDBBadge>
              </MDBCol>
              <MDBCol className="text-center" size={10}>
                <MDBProgress height="20">
                  <MDBProgressBar
                    width={(d.score / gameData.maxScore) * 100}
                    valuemin={0}
                    valuemax={gameData.maxScore}
                  >
                    {((d.score / gameData.maxScore) * 100).toFixed(2)}%{" "}
                    {d.finished ? "(Finished)" : <></>}
                  </MDBProgressBar>
                </MDBProgress>
              </MDBCol>
            </MDBRow>
          );
        })
      ) : (
        <div></div>
      )}
      {gameStatus === "STARTING" ? (
        <MDBRow className="align-items-center h-100">
          <MDBCol className="text-center">Starting</MDBCol>
        </MDBRow>
      ) : (
        <></>
      )}
      {outOfQuestions ? (
        <MDBRow className="align-items-center h-100">
          <MDBCol className="text-center">You finished</MDBCol>
        </MDBRow>
      ) : (
        <></>
      )}
      {!outOfQuestions && gameStatus === "STARTED" && !gameStarted ? (
        <MDBRow className="align-items-center h-100">
          <MDBCol
            className="text-center d-flex"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className="mx-5">Game starts in</div>
            <CountdownCircleTimer
              onComplete={() => {
                setGameStarted(true);
              }}
              key={"started"}
              size={130}
              strokeWidth={6}
              isPlaying
              duration={10}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </MDBCol>
        </MDBRow>
      ) : (
        <></>
      )}
      {gameStarted && (
        <div>
          <MDBRow style={{ height: "90px" }} className="align-items-center">
            <MDBCol
              className="text-center d-flex"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="mx-5">Question: {actualQ.name}</div>
              <CountdownCircleTimer
                onComplete={() => {
                  var item =
                    actualQ.answers[
                      Math.floor(Math.random() * actualQ.answers.length)
                    ];
                  nextQuestion(item.score);
                }}
                key={actualQ.id}
                size={50}
                strokeWidth={6}
                isPlaying
                duration={45}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </MDBCol>
          </MDBRow>
          <MDBRow className="align-items-center">
            <MDBCol className="text-center">
              {actualQ.answers.map((ans) => {
                return (
                  <MDBRadio
                    name={"inlineRadio" + actualQ.id}
                    id={"inlineRadio1" + ans.id}
                    value={ans.score}
                    label={ans.answer}
                    key={ans.id}
                    inline
                    onClick={() => {
                      setScore(ans.score);
                    }}
                  />
                );
              })}
            </MDBCol>
          </MDBRow>
          <MDBRow style={{ height: "90px" }} className="align-items-center">
            <MDBCol className="text-center">
              <MDBBtn onClick={() => nextQuestion()}>Next</MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
      )}

      <MDBRow className="align-items-center h-100">
        <MDBCol className="text-center">
          <MDBBtn
            onClick={() => {
              if (window.confirm("Are you sure you wanna leave?")) {
                socket.emit(Constants.LEAVE_ROOM, {
                  username,
                  room_number: roomNumber
                })
                navigate("/");
              }
            }}
          >
            Back
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
