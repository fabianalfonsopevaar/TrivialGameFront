import React, { createContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import io from "socket.io-client";
import Constants from "../Constants";

import { useNavigate } from "react-router-dom";

const socket = io.connect(process.env.REACT_APP_SOCKET);

export const SocketContext = createContext();
export function SocketContextProvider(props) {
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState({
    room_number: 0,
    status: "STARTING",
    questions: [],
    startQuestion: 0,
    endQuestion: 0,
  });

  const [resetGame, setResetGame] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    socket.on(Constants.GET_GAME, (data) => {
      setData(data);
    });
    socket.on(Constants.GET_GAME_DATA, (data) => {
      data.questions = JSON.parse(data.questions);
      setGameData(data);
    });
    socket.on(Constants.GET_USERS_DATA, (data) => {
      console.log(data);
    });
    socket.on(Constants.RESET_ALL_INSTANCES_REDIRECT, (data) => {
      toast.info("All the instances had been reseted");
      navigate("/");
    });
    socket.on(Constants.ERROR, (data) => {
      toast.error(data.error);
    });
    socket.on(Constants.RESET_GAME_ALL, (data) => {
      setResetGame(true);
    });
    socket.on(Constants.USER_CONNECTED, (data) => {
      navigate(
        "/room?room_number=" + data.room_number + "&username=" + data.username,
        { replace: true }
      );
    });
    socket.on(Constants.ROOM_CREATED, (data) => {
      toast.info("The room was created succesfully");
      navigate("/adminRoom?room_number=" + data.room_number, { replace: true });
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        data,
        gameData,
        resetGame,
        setResetGame,
      }}
    >
      {props.children}
      <ToastContainer theme="dark" />
    </SocketContext.Provider>
  );
}
