import axios from "axios";

export const downloadFile = (file_Inf) => {
  var fileurl = file_Inf.down_file;

  var link = document.createElement("a");
  link.setAttribute(
    "download",
    fileurl.split("/")[fileurl.split("/").length - 1]
  );
  link.href = fileurl;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const getAllChannels = async (adType, medType) => {
  const res = await axios.get(
    "http://localhost:3001/api/channels?type1=" + medType + "&type2=" + adType
  );
  return res.data.data;
};

export const getAllFiles = async (adType, medType, channelName) => {
  const res_file = await axios.get(
    "http://localhost:3001/api/medias?type1=" +
      medType +
      "&type2=" +
      adType +
      "&channel=" +
      channelName
  );
  const res_logo = await axios.get(
    "http://localhost:3001/api/logos?channel=" + channelName
  );
  const res_text = await axios.get(
    "http://localhost:3001/api/texts?channel=" + channelName
  );
  return { file: res_file, logo: res_logo, text: res_text };
};

export const getDateTimeString = (dateValue) => {
  var retStr =
    dateValue.$y +
    "." +
    (dateValue.$M + 1 > 10 ? dateValue.$M + 1 : "0" + (dateValue.$M + 1)) +
    "." +
    (dateValue.$D > 10 ? dateValue.$D : "0" + dateValue.$D) +
    "." +
    (dateValue.$H > 10 ? dateValue.$H : "0" + dateValue.$H) +
    "." +
    (dateValue.$m > 10 ? dateValue.$m : "0" + dateValue.$m) +
    "." +
    (dateValue.$s > 10 ? dateValue.$s : "0" + dateValue.$s);
  return retStr;
};

export const toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};
