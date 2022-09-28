import { useEffect } from "react";
import "./App.css";
import Api from "./services/api";

const App = () => {
  const onGetJobs = async () => {
    const jobs = await Api.getJobs();
    console.log(jobs);
  };

  useEffect(() => {
    onGetJobs();
  }, []);

  return (
    <div className="App">
      <p>TEST</p>
    </div>
  );
};

export default App;
