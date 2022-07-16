import React, { useState, memo } from "react";
import DeleteIcon from "../delete.svg";
import SaveIcon from "../save.svg";
const Note = (props) => {
  const note = props.note;
  const saveReload = props.saveReload;
  const deleteReload = props.deleteReload;

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  return (
    <div className=" bg-[#E8AA42] h-80 w-1/2 m-4 p-4 flex flex-col justify-between">
      <div>
        <input
          type="text"
          className="text-xl font-bold bg-transparent outline-none w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          className=" text-xl bg-transparent outline-none w-full resize-none scrollbar-hide"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-between">
        <p className="text-lg italic">{note.date}</p>
        <div className="flex">
          <img
            src={SaveIcon}
            alt="Save"
            className="h-6 cursor-pointer mr-4"
            onClick={() => {
              fetch("http://localhost:5000/updateNote", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: note.id,
                  title: title,
                  content: content,
                }),
              })
                .then(saveReload)
                .catch((err) => console.log(err));
            }}
          />
          <img
            src={DeleteIcon}
            alt="Delete"
            className="h-6 cursor-pointer"
            onClick={() => {
              fetch("http://localhost:5000/deleteNote", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: note.id,
                }),
              })
                .then(deleteReload)
                .catch((err) => console.log(err));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Note);
