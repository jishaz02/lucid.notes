import React, { useEffect, useState, useCallback } from "react";
import Note from "./Note";
import AddIcon from "../icons8-plus.svg";
import CheckIcon from "../checkmark.svg";
import timer from "timer";

const NoteContainer = () => {
  const [notesList, setNotesList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("https://lucid-notes.herokuapp.com/getNotes")
      .then((res) => res.json())
      .then((data) => setNotesList(data))
      .catch((err) => console.log(err));
  }, []);

  const saveReload = useCallback(() => {
    fetch("https://lucid-notes.herokuapp.com/getNotes")
      .then((res) => res.json())
      .then(async (data) => {
        setNotesList(data);
        setShow(true);
        await timer(2000);
        setShow(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteReload = useCallback(() => {
    fetch("https://lucid-notes.herokuapp.com/getNotes")
      .then((res) => res.json())
      .then(async (data) => {
        setNotesList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className=" h-screen grid grid-cols-2 z-0">
        {notesList.map((note) => (
          <Note
            key={note.id}
            note={note}
            saveReload={saveReload}
            deleteReload={deleteReload}
          />
        ))}
      </div>
      {show && (
        <div className=" w-full z-10 bottom-0 mb-10 flex justify-center items-center fixed">
          <div className=" bg-white rounded-3xl h-12 w-32 flex justify-center items-center">
            <img className="h-6 mr-2" src={CheckIcon} alt="Check" />
            <p className=" italic font-bold">Saved!</p>
          </div>
        </div>
      )}
      <div
        className=" bg-[#E8AA42] rounded-full h-16 w-16 flex justify-center items-center z-10 fixed bottom-0 right-0 m-10 cursor-pointer"
        onClick={() =>
          fetch("https://lucid-notes.herokuapp.com/addNote")
            .then((res) => res.json())
            .then((data) => setNotesList(data))
            .catch((err) => console.log(err))
        }
      >
        <img src={AddIcon} alt="Add" className="h-10" />
      </div>
    </div>
  );
};

export default NoteContainer;
