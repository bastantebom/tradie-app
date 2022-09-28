import { data } from "autoprefixer";
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

const getJob = async (id) => {
  return await base({
    url: `/jobs/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateNotes = async (id, data = {}) => {
  return await base({
    url: `/jobs/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
};

const Api = {
  getJobs,
  getJob,
  updateNotes,
};

export default Api;
