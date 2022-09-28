import base from "../services/base.js";

const getJobs = async () => {
  return await base({
    url: "/jobs",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const Api = {
  getJobs,
};

export default Api;
