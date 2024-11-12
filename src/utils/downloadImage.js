import axios from "axios";
import fileDownload from "js-file-download";
import { errorToast } from "./customToast";

// Download image with urls
export const downloadImage = async (url) => {
  if (!url) {
    return alert("No image url found!");
  }

  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.download = "download.jpg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
