import dayjs from "dayjs";

export const useDateWithTime = (date: Date) => {
  return dayjs(date).format("MMM DD, YYYY hh:mm a");
};
