import { useEffect, useState, useRef } from "react";
import Api from "./services/api";
import Table from "./component/table/table";
import Drawer from "./component/drawer";
import Profile from "./layout/profile";
import Notes from "./layout/notes";
import AddNotes from "./layout/add-notes";
import { toHumanTime, getStatus, getStatusColor } from "./utils/";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [notes, setNotes] = useState(false);

  const clientData = useRef();

  const onGetJobs = async () => {
    const response = await Api.getJobs();
    if (response) {
      setJobs(response);
    }
  };

  const onViewClient = (row) => {
    if (row.original?.client) {
      clientData.current = row.original?.client;
      setIsOpen(true);
    }
  };

  const onClickNotes = async (row) => {
    if (row.original?.id) {
      const response = await Api.getJob(row.original?.id);
      if (response) {
        setNotes(response);
        setOpenNotes(true);
      }
    }
  };

  const columns = [
    {
      Header: "Name",
      accessor: "client.name",
      Cell: (props) => {
        return (
          <div
            className="cursor-pointer text-sky-700 hover:font-medium"
            onClick={() => onViewClient(props.row)}
          >
            {props.value}
          </div>
        );
      },
    },
    {
      Header: "Job",
      accessor: "title",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (props) => (
        <p
          className={`rounded-full p-2 text-center text-white ${getStatusColor(
            props.value
          )}`}
        >
          {getStatus(props.value)}
        </p>
      ),
    },
    {
      Header: "Created",
      accessor: "createdAt",
      Cell: (props) => <p> {toHumanTime(props.value)}</p>,
    },
    {
      Header: "Actions",
      accessor: "id",
      Cell: (props) => (
        <div onClick={() => onClickNotes(props.row)}>
          <DocumentPlusIcon className="w-5 fill-sky-700" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    onGetJobs();
  }, []);

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {clientData.current && <Profile data={clientData.current ?? {}} />}
      </Drawer>
      <Drawer isOpen={openNotes} setIsOpen={setOpenNotes}>
        {notes && <Notes data={notes} setNotes={setNotes} />}
        <AddNotes data={notes} setNotes={setNotes} />
      </Drawer>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-3">
          <Table columns={columns} data={jobs} />
        </main>
      </div>
    </>
  );
};

export default App;
