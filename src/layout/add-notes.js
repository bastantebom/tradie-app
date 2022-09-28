import { useState, useContext, useEffect } from "react";
import Api from "../services/api";
import { Oval } from "react-loader-spinner";
import { Context } from "../context";

export default function AddNotes({ data, setNotes }) {
  const [currentNote, setCurrentNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { activeNote } = useContext(Context);

  const noteChange = (event) => {
    setCurrentNote(event.target.value);
  };

  const onSaveNotes = async () => {
    if (currentNote.trim().length) {
      let allNotes = [...data.notes];

      if (activeNote.id) {
        let allNotes = [...data.notes];
        const objIndex = allNotes.findIndex((obj) => obj.id === activeNote.id);
        allNotes[objIndex].note = currentNote;
      } else {
        const newNote = {
          id: allNotes.length + 1,
          note: currentNote,
        };
        allNotes = allNotes.concat(newNote);
      }

      setLoading(true);
      const response = await Api.updateNotes(data.id, { notes: allNotes });
      setNotes(response);
      setCurrentNote("");
      setLoading(false);
    }
  };

  const onEditNotes = () => {
    setCurrentNote(activeNote.note);
  };

  useEffect(() => {
    if (activeNote.id) {
      onEditNotes();
    }
  }, [activeNote]);

  return (
    <div className="mt-8">
      <textarea
        className="w-full p-2"
        value={currentNote}
        onChange={noteChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={onSaveNotes}
        disabled={loading}
      >
        {loading ? (
          <Oval
            height={25}
            width={25}
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          "Add note"
        )}
      </button>
    </div>
  );
}
