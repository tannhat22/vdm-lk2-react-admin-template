import React from 'react';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import ROSLIB from 'roslib';

import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import RosPropsContext from 'context/RosPropsContext';

function OverallInform({ producePlanData }) {
  const [machineData, setMachineData] = React.useState({
    machines: 0,
    machinesRun: 0,
    machinesStop: 0,
    machinesError: 0,
    machinesOff: 0,
    machinesPlanCorrect: 0,
  });
  const [machinesPlan, setMachinesPlan] = React.useState(0);

  const ros = useContext(RosPropsContext);

  useEffect(() => {
    let count = 0;
    for (const property in producePlanData) {
      if (producePlanData[property]?.plan !== 0) {
        count++;
      }
    }
    setMachinesPlan(count);
  }, [producePlanData]);

  useEffect(() => {
    var listener = new ROSLIB.Topic({
      ros: ros,
      name: '/state_machines',
      messageType: 'vdm_machine_msgs/MachinesStateStamped',
    });

    let subscription_callback = function (message) {
      handleDataWebsocket(message);
    };

    listener.subscribe(subscription_callback);

    function handleDataWebsocket(data) {
      let overallData = {
        machines: 0,
        machinesRun: 0,
        machinesStop: 0,
        machinesError: 0,
        machinesOff: 0,
        machinesPlanCorrect: 0,
      };
      let machinesState = data.state_machines;
      machinesState.forEach((state) => {
        overallData.machines++;
        switch (state.signal_light) {
          case 0:
            overallData.machinesOff++;
            break;
          case 1:
            overallData.machinesRun++;
            if (producePlanData[state.name]?.plan) {
              overallData.machinesPlanCorrect++;
            }
            break;
          case 2:
            overallData.machinesStop++;
            break;
          case 3:
            overallData.machinesError++;
            break;
          default:
            console.log(state.signal_light);
        }
      });
      setMachineData(overallData);
    }
    return () => {
      listener.unsubscribe();
    };
  }, [ros, producePlanData]);
  return (
    <Box>
      <Typography
        variant="h5"
        color="white"
        align="center"
        sx={{ backgroundColor: '#1890ff', padding: '4px 0', borderRadius: '4px 4px 0 0 ' }}
      >
        Thống kê
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '360px' }} aria-label="simple table">
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" component="th" scope="row" sx={{ fontSize: '0.95rem', fontWeight: 'normal' }}>
                Tổng số máy đang sản xuất
              </TableCell>
              <TableCell
                align="left"
                sx={{ minWidth: '120px', fontSize: '0.95rem', fontWeight: 'bolder', color: 'blue ' }}
              >{`${machineData.machinesRun}/${machineData.machines} máy`}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" component="th" scope="row" sx={{ fontSize: '0.95rem', fontWeight: 'normal' }}>
                Tổng số máy đang dừng
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '0.95rem', fontWeight: 'bolder', color: 'blue ' }}
              >{`${machineData.machinesStop}/${machineData.machines} máy`}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" component="th" scope="row" sx={{ fontSize: '0.95rem', fontWeight: 'normal' }}>
                Tổng số máy lỗi
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '0.95rem', fontWeight: 'bolder', color: 'blue ' }}
              >{`${machineData.machinesError}/${machineData.machines} máy`}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" component="th" scope="row" sx={{ fontSize: '0.95rem', fontWeight: 'normal' }}>
                Tổng số máy đang tắt
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '0.95rem', fontWeight: 'bolder', color: 'blue ' }}
              >{`${machineData.machinesOff}/${machineData.machines} máy`}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" component="th" scope="row" sx={{ fontSize: '0.95rem', fontWeight: 'normal' }}>
                Tổng số máy có kế hoạch sản xuất
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '0.95rem', fontWeight: 'bolder', color: 'blue ' }}
              >{`${machinesPlan}/${machineData.machines} máy`}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" component="th" scope="row" sx={{ fontSize: '0.95rem', fontWeight: 'normal' }}>
                Tổng số máy chạy đúng kế hoạch sản xuất
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '0.95rem', fontWeight: 'bolder', color: 'blue ' }}
              >{`${machineData.machinesPlanCorrect}/${machinesPlan} máy`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OverallInform.propTypes = {
  producePlanData: PropTypes.object,
};

export default OverallInform;
