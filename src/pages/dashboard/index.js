import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ROSLIB from 'roslib';

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  // InputLabel,
  // MenuItem,
  // FormControl,
  // Select,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// project import
import InformArea from './InformArea';
import OperationTimeChart from './OperationTimeChart';
import MainCard from 'components/MainCard';
import MachineDataTable from './MachineDataTable';
import SignalLightArea from './SignalLightArea';
import ResetForm from './ResetForm';
import { MaterialUISwitch } from 'components/CustomizedSwitches';

import RosPropsContext from 'context/RosPropsContext';
import { useLocales } from 'locales';

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const DashboardDefault = () => {
  const location = useLocation();
  const { translate } = useLocales();

  let id = 0;
  let stt = 0;
  if (location.state) {
    id = location.state.id;
    stt = location.state.stt;
    // console.log(`id: ${id}`);
    // console.log(`stt: ${stt}`);
  }

  const [daysInput, setDaysInput] = useState(10);
  const [daysChart, setDaysChart] = useState(daysInput);
  const [machineChart, setMachineChart] = useState(true);
  const [idMachine, setIdMachine] = useState(id);
  const [sttMachine, setSttMachine] = useState(stt);
  const [machineNames, setMachineNames] = useState([]);
  const [shiftChart, setShiftChart] = useState('DAY');
  const [selectedBeginDate, setSelectedBeginDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [specifiedMinDate, setSpecifiedMinDate] = useState(new Date('2023-9-01'));
  const [specifiedMaxDate, setSpecifiedMaxDate] = useState(new Date('2200-01-01'));
  const ros = useContext(RosPropsContext);

  useEffect(() => {
    var getMachinesNameClient = new ROSLIB.Service({
      ros: ros,
      name: '/get_all_machine_name',
      serviceType: 'vdm_machine_msgs/GetAllMachineName',
    });

    let requestMachinesName = new ROSLIB.ServiceRequest({
      get_allname: true,
    });

    getMachinesNameClient.callService(requestMachinesName, function (result) {
      if (result.success) {
        let dataNames = [];
        for (let i = 0; i < result.machines_quantity; i++) {
          dataNames.push({
            id: result.id_machines[i],
            label: result.machines_name[i],
            type: result.machines_type[i],
            plc: result.plc_model[i],
            address: result.plc_address[i],
          });
        }
        setMachineNames(dataNames);
      }
      // console.log(result.success);
      // console.log('da phan hoi');
    });
  }, [ros]);

  useEffect(() => {
    var getMachineDataClient = new ROSLIB.Service({
      ros: ros,
      name: '/get_min_max_date',
      serviceType: 'vdm_machine_msgs/GetMinMaxDate',
    });
    // console.log(machineNames[sttMachine].type);
    let requestMachineData = new ROSLIB.ServiceRequest({
      stage: idMachine !== 0 && machineNames.length > 0 ? machineNames[sttMachine].type : 'no info',
    });
    if (idMachine !== 0) {
      getMachineDataClient.callService(requestMachineData, function (result) {
        if (result.success) {
          const minDateArr = result.min_date.split('/');
          const maxDateArr = result.max_date.split('/');
          setSelectedBeginDate(new Date(Number(minDateArr[2]), Number(minDateArr[1]) - 1, Number(minDateArr[0])));
          setSelectedEndDate(new Date(Number(maxDateArr[2]), Number(maxDateArr[1]) - 1, Number(maxDateArr[0])));
          setSpecifiedMinDate(new Date(Number(minDateArr[2]), Number(minDateArr[1]) - 1, Number(minDateArr[0])));
          setSpecifiedMaxDate(new Date(Number(maxDateArr[2]), Number(maxDateArr[1]) - 1, Number(maxDateArr[0])));
          // setDataMachine(dataMachine);
        }
      });
    }
  }, [idMachine, machineNames]);

  function handleValueChange(event, value, reason) {
    if (reason === 'selectOption') {
      const sttMachineNew = machineNames.findIndex((machineName) => {
        return value.label === machineName.label;
      });

      if (sttMachineNew !== -1) {
        setSttMachine(sttMachineNew);
        setIdMachine(machineNames[sttMachineNew].id);
      } else {
        console.log('Machine name not found');
      }
    }
  }

  // function handleChangeSelectDays(event) {
  //   setDays(event.target.value);
  // }

  // function handleDateChange(date) {
  //   console.log(date);
  // }

  const handleShiftChange = (event) => {
    event.target.checked ? setShiftChart('NIGHT') : setShiftChart('DAY');
    console.log(event.target.checked);
  };

  const handleDaysChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > 30) {
      value = 30;
    } else if (value < 1) {
      value = 1;
    }

    setDaysInput(value);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      {/* <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5" sx={{ paddingBottom: '14px' }}>
          Dashboard
        </Typography>
      </Grid> */}
      <Grid item xs={12} md={6} lg={6}>
        <Autocomplete
          disablePortal
          id="combo-box-machine"
          options={machineNames}
          isOptionEqualToValue={(option, value) => {
            return option.label === value;
          }}
          value={idMachine !== 0 && machineNames.length > 0 ? machineNames[sttMachine].label : null}
          sx={{ width: '100%' }}
          onChange={handleValueChange}
          renderInput={(params) => <TextField {...params} label={translate('Select machine name')} />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        {idMachine !== 0 && machineNames.length > 0 ? (
          <ResetForm
            id={idMachine}
            machineName={machineNames[sttMachine].label}
            plcModel={machineNames[sttMachine].plc}
            plcAddress={machineNames[sttMachine].address}
          />
        ) : null}
      </Grid>
      <InformArea id={idMachine} />
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={8} lg={9}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{translate('Timeline chart of activities')}</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={2}>
              <TextField
                id="outlined-daysNum"
                label={translate('Choose days')}
                type="number"
                InputLabelProps={{
                  shrink: true,
                  max: 30,
                  min: 1,
                }}
                value={daysInput}
                onChange={handleDaysChange}
              />
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
                  setDaysChart(daysInput);
                }}
                disabled={isNaN(daysInput) || daysChart === daysInput}
              >{`${daysInput} ngày gần nhất`}</Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
                  setMachineChart(!machineChart);
                }}
              >
                {machineChart ? 'Biểu đồ theo máy' : 'Biểu đồ theo công đoạn'}
              </Button>
              <FormGroup>
                <FormControlLabel control={<MaterialUISwitch defaultChecked={false} onChange={handleShiftChange} />} />
              </FormGroup>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <OperationTimeChart
              id={idMachine}
              stage={idMachine !== 0 && machineNames.length > 0 ? machineNames[sttMachine].type : 'no info'}
              chartMachine={machineChart}
              shift={shiftChart}
              daysNum={daysChart}
              maxDate={specifiedMaxDate}
            />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{translate('Signal light')}</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button size="large">
                {idMachine !== 0 && machineNames.length > 0 ? machineNames[sttMachine].label : 'no info'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.5 }} content={false}>
          <SignalLightArea id={idMachine} />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{translate('Machine data')}</Typography>
          </Grid>
          <Grid item display="flex">
            <Box sx={{ marginRight: '16px' }}>
              <DatePicker
                label={translate('Begin date')}
                value={selectedBeginDate}
                onChange={(date) => {
                  setSelectedBeginDate(date);
                }}
                minDate={specifiedMinDate}
                maxDate={specifiedMaxDate}
              />
            </Box>
            <DatePicker
              label={translate('End date')}
              value={selectedEndDate}
              onChange={(date) => {
                setSelectedEndDate(date);
              }}
              minDate={specifiedMinDate}
              maxDate={specifiedMaxDate}
            />
            {/* <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="days-select-label">Ngày</InputLabel>
                <Select
                  labelId="days-select-label"
                  id="days-simple-select"
                  value={days}
                  label="Days"
                  onChange={handleChangeSelectDays}
                >
                  <MenuItem value={7}>7 ngày</MenuItem>
                  <MenuItem value={14}>14 ngày</MenuItem>
                  <MenuItem value={30}>30 ngày</MenuItem>
                  <MenuItem value={90}>90 ngày</MenuItem>
                  <MenuItem value={365}>Tất cả dữ liệu</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <MachineDataTable
            id={idMachine}
            machineName={idMachine !== 0 && machineNames.length > 0 ? machineNames[sttMachine].label : 'no info'}
            // days={days}
            machineType={idMachine !== 0 && machineNames.length > 0 ? machineNames[sttMachine].type : 'no info'}
            beginDate={selectedBeginDate}
            endDate={selectedEndDate}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

DashboardDefault.propTypes = {
  id: PropTypes.number,
};

export default DashboardDefault;
