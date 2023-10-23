import React from "react";
import { jsonFileDownload, jsonFileUpload } from "../utilities";
import styled from "styled-components";

type Props = {
  dataToDownload: DaysWithTask;
  className?: string;
};

const Container = styled.div`
  .upload {
    p {
      margin-bottom: 10px;
    }
    margin-bottom: 12px;
  }
`;

const FileProcess = (props: Props) => {
  const { dataToDownload, className } = props;
  return (
    <Container className={className}>
      <div className="upload">
        <p>Upload Calendar:</p>
        <input type="file" onChange={jsonFileUpload} />
      </div>
      <button onClick={() => jsonFileDownload(dataToDownload)}>
        Download Calendar
      </button>
    </Container>
  );
};

export default FileProcess;
