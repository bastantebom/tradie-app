import { useEffect, useState, useRef } from "react";
import Api from "./services/api";
import Table from "./component/table/table";
import Drawer from "./component/drawer";
import Profile from "./layout/profile";
import Notes from "./layout/notes";
import AddNotes from "./layout/add-notes";
import { toHumanTime, getStatus, getStatusColor, statuses } from "./utils/";
import { DocumentPlusIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Modal } from "./component/dialog";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [notes, setNotes] = useState(false);
  const [isEditStatus, setIsEditStatus] = useState(false);
  const [toEditJob, setToEditJob] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const clientData = useRef();

  const onGetJobsdsds = async () => {
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

  const onEditStatus = (row) => {
    setToEditJob(row.original);
    setIsEditStatus(true);
  };

  const onHandleUpdateStatus = async (status, job) => {
    const newStatusId = statuses.find((s) => s.value === status).id;
    setIsLoading(true);
    const response = await Api.updateJob(job.id, { status: newStatusId });
    if (response) {
      let allJobs = [...jobs];
      const objIndex = allJobs.findIndex((obj) => obj.id === job.id);
      allJobs[objIndex].status = response.status;
      setJobs([...allJobs]);
      setIsEditStatus(false);
      setIsLoading(false);
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
        <div onClick={() => onEditStatus(props.row)}>
          <p
            className={`rounded-full p-2 text-center text-white ${getStatusColor(
              props.value
            )}`}
          >
            {getStatus(props.value)}
          </p>
        </div>
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
        <div className="flex flex-row justify-between items-center">
          <div onClick={() => onClickNotes(props.row)}>
            <DocumentPlusIcon className="w-5 fill-sky-700 hover:fill-sky-400" />
          </div>
          <div onClick={() => onEditStatus(props.row)}>
            <PlayIcon className="w-5 fill-sky-700 hover:fill-sky-400" />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    onGetJobs();
  }, []);

  return (
    <>
      {toEditJob && (
        <Modal
          isOpen={isEditStatus}
          setIsOpen={setIsEditStatus}
          data={toEditJob}
          handleUpdate={onHandleUpdateStatus}
          isLoading={isLoading}
        />
      )}
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
