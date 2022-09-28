import { DateTime } from "luxon";

const statuses = [
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
