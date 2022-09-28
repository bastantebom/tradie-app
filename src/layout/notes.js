import { PencilIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Context } from "../context";

export default function Notes({ data, setNotes }) {
  const { setActiveNote } = useContext(Context);

  const onEditNotes = (id, note) => {
    setActiveNote({ id, note });
  };

  return data.notes?.map(({ id, note }) => (
    <div key={id} className="flex flex-row relative overflow-auto">
      <div className="bg-blue-200 p-5 rounded-md mb-2 w-full" key={id}>
        {note}
      </div>
      <div
        onClick={() => onEditNotes(id, note)}
        className="absolute right-2 top-2 w-8 h-8 bg-sky-100 rounded-full flex justify-center items-center"
      >
        <PencilIcon className="w-4 fill-black" />
      </div>
    </div>
  ));
}
