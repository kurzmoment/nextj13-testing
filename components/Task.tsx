import React from "react";

type Props = {
  id: string;
  name: string;
  text: string;
  created: string;
};

function Task({ id, name, text, created }: Props) {
  return (
    <div key={id} className="bg-slate-400 m-6 p-4 rounded-md">
      <h1 className="font-bold text-white">{text}</h1>
      <p className="text-white">{name}</p>
      <p className="text-white">{created}</p>
    </div>
  );
}

export default Task;
