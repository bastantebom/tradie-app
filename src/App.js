import { useEffect, useState } from "react";
import "./App.css";
import Api from "./services/api";
import Table from "./component/table";
import { toHumanTime, getStatus } from "./utils/format";

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
      Cell: (props) => <p> {getStatus(props.value)}</p>,
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
    <div className="App">
      <h1>Job Dashboard</h1>
      <Table columns={columns} data={jobs} />
    </div>
  );
};

export default App;
