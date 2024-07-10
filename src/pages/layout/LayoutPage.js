import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ROSLIB from 'roslib';

import layoutImg from 'assets/images/layout/layout-lk2-vdm.jpg';
import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import RosPropsContext from 'context/RosPropsContext';
import SignalLightsLayout from './SignalLightsLayout';
// import MaterialLightsLayout from './MaterialLightsLayout';
import ProducePlanLightsLayout from './ProducePlanLightsLayout';
// import OverallInform from './OverallInform';
import SignalLight from 'components/SignalLight';
import { useLocales } from 'locales';

function LayoutPage() {
  const { translate } = useLocales();

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [producePlanData, setProducePlanData] = React.useState({});

  const ros = React.useContext(RosPropsContext);
  const imgRef = React.useRef();

  const drawOpen = useSelector((state) => {
    return state.menu.drawerOpen;
  }, shallowEqual);

  const handleResize = () => {
    // console.log('resize');
    if (imgRef.current) {
      setWidth(imgRef.current.width);
      setHeight(imgRef.current.height);
    }
  };

  const handleLoad = () => {
    // console.log('load: ', time);
    if (imgRef.current) {
      setTimeout(() => {
        setWidth(imgRef.current.width);
        setHeight(imgRef.current.height);
      }, 250);
    }
  };

  React.useEffect(() => {
    var getProducePlanClient = new ROSLIB.Service({
      ros: ros,
      name: '/get_produce_plans',
      serviceType: 'vdm_machine_msgs/GetProducePlan',
    });

    let requestProducePlan = new ROSLIB.ServiceRequest({
      get_all_produce_plan: true,
    });

    getProducePlanClient.callService(requestProducePlan, function (result) {
      if (result.success) {
        let producePlans = {};
        result.produce_plane_data.forEach((element) => {
          producePlans = {
            ...producePlans,
            [element.machine_name]: { plan: element.produce_plan, spm: element.spm },
          };
        });

        setProducePlanData(producePlans);
      }
    });
  }, [ros]);

  React.useEffect(() => {
    // console.log('Thay đổi state');
    handleLoad();
    // const imgRefCurrent = imgRef.current;
    // Khởi tạo kích thước ban đầu khi hình ảnh tải xong
    // imgRefCurrent.addEventListener('load', handleLoad);

    // Bắt sự kiện resize để theo dõi sự thay đổi kích thước cửa sổ
    window.addEventListener('resize', handleResize);

    return () => {
      // Gỡ bỏ bất kỳ sự kiện lắng nghe nào khi component unmount
      // imgRefCurrent.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawOpen]);

  return (
    <Box sx={{ position: 'relative' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2" color="primary" sx={{ marginBottom: '16px' }}>
          {/* {translate('LAYOUT DIAGRAM OF VDM MACHINING TOOLS MANUFACTURING SECTION')} */}
          SƠ ĐỒ LAYOUT CÔNG ĐOẠN THÀNH HÌNH PHÒNG LINH KIỆN 2
        </Typography>
      </div>
      {/* <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}> */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img
          ref={imgRef}
          src={layoutImg}
          alt="So do layout phong linh kien 2"
          style={{ objectFit: 'contain', width: '86%', height: 'auto' }}
        />
        <SignalLightsLayout width={width} height={height} producePlanData={producePlanData} />
        {/* <MaterialLightsLayout width={width} height={height} /> */}
        <ProducePlanLightsLayout width={width} height={height} producePlanData={producePlanData} />
      </div>
      {/* <div style={{ position: 'absolute', top: '80px', left: '0px' }}>
        <OverallInform producePlanData={producePlanData} />
      </div> */}
      <div style={{ position: 'absolute', top: '80px', right: '100px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: '360px' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Đèn</TableCell>
                <TableCell>Nội dung hiển thị</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <SignalLight color="off" />
                </TableCell>
                <TableCell align="left">{translate('Turn off machine')}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <SignalLight color="green" />
                </TableCell>
                <TableCell align="left">Máy đang sản xuất</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <SignalLight color="red" />
                </TableCell>
                <TableCell align="left">Dừng máy, máy lỗi</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <SignalLight color="yellow" />
                </TableCell>
                <TableCell align="left">Hết nguyên liệu</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <SignalLight color="blue" />
                </TableCell>
                <TableCell align="left">Đủ nguyên liệu</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <Chip label="0" color="success" variant="outlined" size="small" />
                </TableCell>
                <TableCell align="left">Không có kế hoạch sản xuất</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <Chip label="56.5 %" color="success" size="small" />
                </TableCell>
                <TableCell align="left">
                  <Typography>Có kế hoạch sản xuất:</Typography>
                  <Typography>Tỉ lệ sản xuất thực tích so với kế hoạch WO (%)</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  <SignalLight custom="standing" color="purple" size="28" />
                </TableCell>
                <TableCell align="left">Vị trí đứng</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* </div> */}
    </Box>
  );
}

export default LayoutPage;
