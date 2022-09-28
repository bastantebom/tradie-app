import { useEffect, useState } from "react";
import Api from "./services/api";
import Table from "./component/table/table";
import { toHumanTime, getStatus, getStatusColor } from "./utils/";

const App = () => {
  const [jobs, setJobs] = useState([]);

  const onGetJobs = async () => {
    const response = await Api.getJobs();
    if (response) {
      setJobs(response);
    }
  };

  const columns = [
    {
      Header: "Name",
      accessor: "client.name",
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
  ];

  useEffect(() => {
    onGetJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-3">
        <Table columns={columns} data={jobs} />
      </main>
    </div>
  );
};

export default App;
