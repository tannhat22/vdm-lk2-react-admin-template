import React, { useState } from 'react';
import XLSX from 'xlsx';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './ProducePlan.css';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ProducePlan = () => {
  const [data, setData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  console.log(data);
  const handleFiles = (files) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: null,
      });
      // ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
      setData(jsonData);
      console.log(JSON.stringify(jsonData));
    };
    reader.readAsBinaryString(files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // handleFiles(e.dataTransfer.files);
    // console.log(e.dataTransfer.files);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          minHeight: '50vh',
          backGround: 'linear-gradient(#e7baff, #c2b6d9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={(e) => handleFiles(e.target.files)} />
        </Button> */}
        <div
          style={{
            width: '460px',
            maxHeight: '360px',
            padding: '28px',
            background: '#fff',
            textAlign: 'center',
            borderRadius: '14px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          >
            {/* <input type="file" onChange={(e) => handleFiles(e.target.files)} hidden /> */}
            <CloudUploadIcon color="primary" sx={{ fontSize: 80, marginTop: '40px', pointerEvents: 'none' }} />
            <p style={{ pointerEvents: 'none' }}>Kéo và Thả File vào đây để tải lên file excel</p>
          </div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            // startIcon={<CloudUploadIcon />}
            sx={{ width: '100%', padding: '16px', marginTop: '10px', borderRadius: '14px' }}
          >
            Chọn file excel
            <VisuallyHiddenInput type="file" onChange={(e) => handleFiles(e.target.files)} />
          </Button>
        </div>
      </Box>

      {/* <div>
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                {Array.from({ length: 20 }, (_, i) => (
                  <th key={i}>{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Array.from({ length: 20 }, (_, i) =>
                    row[i] !== undefined ? <td key={i}>{row[i]}</td> : <td key={i}></td>,
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </div>
  );
};

export default ProducePlan;
