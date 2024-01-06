import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import "../../../vendor/doka.min.css";
import { create } from "../../../vendor/doka.esm.min.js";
import { FilePondInitialFile } from "filepond";

interface FileInputProps {
  setImage: (data: string) => void;
  defaultValue?: string;
  resolution?: number;
  isRequired?: boolean;
}

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
  FilePondPluginFileValidateType
);

const FileInput = ({
  setImage,
  defaultValue = "",
  resolution = 136,
  isRequired = false,
}: FileInputProps) => {
  const [pondFiles, setPondFiles] = useState<FilePondInitialFile[]>(
    defaultValue.length
      ? [
          {
            source: defaultValue,
            options: {
              type: "local",
            },
          },
        ]
      : []
  );
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
      imageResizeTargetWidth={resolution}
      imageResizeTargetHeight={resolution}
      imageResizeUpscale={false}
      imageResizeMode={"contain"}
      imageEditEditor={create({
        cropMinImageWidth: 0,
        cropMinImageHeight: 0,
      })}
      acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}
      labelIdle={`${t("filepond__direction")} <span class="filepond--label-action">${t(
        "filepond__browse"
      )}</span>`}
      labelFileLoading={`${t("filepond__loading")}`}
      labelFileWaitingForSize={`${t("filepond__size")}`}
      labelTapToCancel={`${t("filepond__cancel")}`}
      required={isRequired}
    />
  );
};

export default FileInput;
