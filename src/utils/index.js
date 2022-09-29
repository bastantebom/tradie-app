import { DateTime } from "luxon";

export const statuses = [
  { id: 1, value: "Scheduled" },
  { id: 2, value: "Active" },
  { id: 3, value: "Invoicing" },
  { id: 4, value: "To priced" },
  { id: 5, value: "Completed" },
];

export const toHumanTime = (isoString, localize = "en-US") =>
  DateTime.fromISO(isoString, { locale: localize }).toRelative();

export const getStatus = (currentStatus) =>
  statuses.find((status) => status.id === currentStatus)?.value ?? "Active";

export const getStatusColor = (currentStatus) => {
  let statusClass;
  switch (currentStatus) {
    case 1:
      statusClass = "bg-lime-300";
      break;
    case 2:
      statusClass = "bg-amber-300";
      break;
    case 3:
      statusClass = "bg-stone-300";
      break;
    case 4:
      statusClass = "bg-cyan-300";
      break;
    case 5:
      statusClass = "bg-emerald-300";
      break;
    default:
      statusClass = "bg-orange-300";
      break;
  }
  return statusClass;
};
