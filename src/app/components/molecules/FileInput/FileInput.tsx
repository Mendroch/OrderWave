import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import "../../../vendor/doka.min.css";
import { create } from "../../../vendor/doka.esm.min.js";

interface FileInputProps {
  setImage: (data: string) => void;
}

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

const FileInput = ({ setImage }: FileInputProps) => {
  const [pondFiles, setPondFiles] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (pondFiles.length === 0) setImage("");
    // eslint-disable-next-line
  }, [pondFiles]);

  const handleInput = (output: any) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event.target) setImage(event.target.result as string);
    };
    reader.readAsDataURL(output);
  };

  return (
    <FilePond
      files={pondFiles}
      onupdatefiles={(fileItems: any) => setPondFiles(fileItems)}
      onpreparefile={(_, output) => handleInput(output)}
      allowImageResize
      imageResizeTargetWidth={136}
      imageResizeTargetHeight={136}
      imageResizeUpscale={false}
      imageResizeMode={"contain"}
      imageEditEditor={create({
        cropMinImageWidth: 0,
        cropMinImageHeight: 0,
      })}
      labelIdle={`${t("filepond__direction")} <span class="filepond--label-action">${t(
        "filepond__browse"
      )}</span>`}
    />
  );
};

export default FileInput;
