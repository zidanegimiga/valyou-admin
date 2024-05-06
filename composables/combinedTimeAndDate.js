export const time_date = (date, desiredTime) => {
  let originalDate = new Date(date);
  if (desiredTime != undefined) {
    let [time, period] = desiredTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) {
      hours += 12;
    }
    originalDate.setHours(hours, minutes, 0, 0);
  }
  return originalDate.toISOString();
};
