import React, { useState, useContext, Fragment } from 'react';
import XLSX from 'xlsx';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  IconButton,
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Modal,
  LinearProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './ProducePlan.css';
import RosPropsContext from 'context/RosPropsContext';
import ROSLIB from 'roslib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  padding: 0,
};

const ProducePlan = () => {
  const [data, setData] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [status, setStatus] = useState('');
  const [successServ, setSuccessServ] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [values, setValues] = useState({
    pass: '',
    showPass: false,
  });

  // console.log(data);
  const ros = useContext(RosPropsContext);

  const updateProduceClient = new ROSLIB.Service({
    ros: ros,
    name: '/update_produce_plan',
    serviceType: 'vdm_machine_msgs/UpdateProducePlan',
  });

  function UpdateServiceCall(password, excel_json) {
    setIsLoad(true);
    let requestReset = new ROSLIB.ServiceRequest({
      password,
      excel_json,
    });

    updateProduceClient.callService(requestReset, function (result) {
      setIsLoad(false);

      if (result.success) {
        setOpenLogin(false);
        setOpenSuccess(true);
      } else {
        setStatus(result.status);
        setSuccessServ(false);
      }
    });
  }

  const handleOpen = () => {
    setSuccessServ(true);
    setOpenLogin(true);
  };
  const handleClose = () => {
    if (isLoad) return;
    setOpenLogin(false);
    setOpenSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    UpdateServiceCall(values.pass, data);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordHide = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  const handleFiles = (files) => {
    // console.log(files[0].name);
    setFileName(files[0].name);
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
      setData(JSON.stringify(jsonData));
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
      // e.dataTransfer.clearData();
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

  const handleClickCancelFile = (e) => {
    setFileName('');
    setData('');
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
          {data ? (
            <Fragment>
              <div className={`drop-zone`}>
                <FontAwesomeIcon icon={faFileExcel} size="4x" color="#186D3F" style={{ marginTop: '60px' }} />
                <p style={{ pointerEvents: 'none' }}>{fileName}</p>
                <IconButton
                  aria-label="cancel"
                  color="primary"
                  sx={{ position: 'absolute', top: '10px', right: '10px' }}
                  onClick={handleClickCancelFile}
                >
                  <CancelIcon />
                </IconButton>
              </div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                // startIcon={<CloudUploadIcon />}
                sx={{ width: '100%', padding: '16px', marginTop: '10px', borderRadius: '14px' }}
                onClick={handleOpen}
              >
                Cập nhật kế hoạch sản xuất
              </Button>
            </Fragment>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </div>
      </Box>
      <Modal
        open={openLogin || openSuccess}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {openSuccess ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '160px',
              padding: 0,
            }}
          >
            <Paper
              elelvation={2}
              sx={{ padding: 4, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Typography variant="h5" style={{ color: 'green' }}>
                Đã cập nhật thành công kế hoạch sản xuất!
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Box sx={style}>
            <Paper elelvation={2} sx={{ padding: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography>
                      <span style={{ color: 'red' }}>Cập nhật kế hoạch sản xuất:</span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={!successServ}
                      name="pass"
                      type={values.showPass ? 'text' : 'password'}
                      fullWidth
                      label="Password"
                      placeholder="Password"
                      variant="outlined"
                      required
                      helperText={status}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              // onClick={handlePassVisibilty}
                              aria-label="toggle password"
                              edge="end"
                              onClick={togglePasswordHide}
                            >
                              {values.showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item>
                    <Button disabled={isLoad} type="submit" fullWidth variant="contained">
                      Cập nhật
                    </Button>
                  </Grid>

                  {isLoad ? (
                    <Grid item>
                      <LinearProgress />
                    </Grid>
                  ) : null}
                </Grid>
              </form>
            </Paper>
          </Box>
        )}
      </Modal>
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
