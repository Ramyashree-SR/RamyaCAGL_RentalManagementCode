import moment from "moment/moment";

let datePickerFormat = (val) => {
  let formattedEndDate = val?.split(" ")[0];
  let formatDatePicker = formattedEndDate?.split("-");
  let requiredDate = `${formatDatePicker[2]}-${formatDatePicker[1]}-${formatDatePicker[0]}`;
  console.log(requiredDate);
  return requiredDate;
};

// format date to backend format
let formatDateToBackEndReqirement = (val) => {
  let data = moment(val).format("YYYY-MM-DD");
  return data;
};

export { datePickerFormat, formatDateToBackEndReqirement };
