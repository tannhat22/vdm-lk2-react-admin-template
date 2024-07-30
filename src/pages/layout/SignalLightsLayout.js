import React from 'react';
import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import ROSLIB from 'roslib';

import RosPropsContext from 'context/RosPropsContext';
import CardMachine from './CardMachine';

import j01Img from 'assets/images/machines/j01.jpg';
import j02Img from 'assets/images/machines/j02.jpg';
import j03Img from 'assets/images/machines/j03.jpg';
import j04Img from 'assets/images/machines/j04.jpg';
import j05Img from 'assets/images/machines/j05.jpg';
import j06Img from 'assets/images/machines/j06.jpg';
import j07Img from 'assets/images/machines/j07.jpg';
import j08Img from 'assets/images/machines/j08.jpg';
import j09Img from 'assets/images/machines/j09.jpg';
import j10Img from 'assets/images/machines/j10.jpg';
import j11Img from 'assets/images/machines/j11.jpg';
import j12Img from 'assets/images/machines/j12.jpg';
import j13Img from 'assets/images/machines/j13.jpg';
import j14Img from 'assets/images/machines/j14.jpg';
import j15Img from 'assets/images/machines/j15.jpg';
import j16Img from 'assets/images/machines/j16.jpg';
import j17Img from 'assets/images/machines/j17.jpg';
import j18Img from 'assets/images/machines/j18.jpg';
import j19Img from 'assets/images/machines/j19.jpg';
import j20Img from 'assets/images/machines/j20.jpg';
import j21Img from 'assets/images/machines/j21.jpg';
import j22Img from 'assets/images/machines/j22.jpg';
import j23Img from 'assets/images/machines/j23.jpg';
import j24Img from 'assets/images/machines/j24.jpg';

function SignalLightsLayout({ width, height, producePlanData }) {
  const [machinesId, setMachinesId] = useState([]);

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
        setMachinesId(result.id_machines);
      }
    });
  }, []);

  return (
    <div>
      {/* J01 */}
      <CardMachine
        stt={0}
        machineId={machinesId[0]}
        posLeft={width * 21.5}
        posTop={height * 10.9}
        size={width * 1.8}
        img={j01Img}
        plan={producePlanData?.J01?.plan ? producePlanData.J01.plan : 0}
        spm={producePlanData?.J01?.spm ? producePlanData.J01.spm : 0}
        code={producePlanData?.J01?.code ? producePlanData.J01.code : ''}
      />

      {/* J02 */}
      <CardMachine
        stt={1}
        machineId={machinesId[1]}
        posLeft={width * 21.5}
        posTop={height * 19}
        size={width * 1.8}
        img={j02Img}
        plan={producePlanData?.J02?.plan ? producePlanData.J02.plan : 0}
        spm={producePlanData?.J02?.spm ? producePlanData.J02.spm : 0}
        code={producePlanData?.J02?.code ? producePlanData.J02.code : ''}
      />

      {/* J03 */}
      <CardMachine
        stt={2}
        machineId={machinesId[2]}
        posLeft={width * 21.5}
        posTop={height * 27.15}
        size={width * 1.8}
        img={j03Img}
        plan={producePlanData?.J03?.plan ? producePlanData.J03.plan : 0}
        spm={producePlanData?.J03?.spm ? producePlanData.J03.spm : 0}
        code={producePlanData?.J03?.code ? producePlanData.J03.code : ''}
      />

      {/* J04 */}
      <CardMachine
        stt={3}
        machineId={machinesId[3]}
        posLeft={width * 21.5}
        posTop={height * 35.1}
        size={width * 1.8}
        img={j04Img}
        plan={producePlanData?.J04?.plan ? producePlanData.J04.plan : 0}
        spm={producePlanData?.J04?.spm ? producePlanData.J04.spm : 0}
        code={producePlanData?.J04?.code ? producePlanData.J04.code : ''}
      />

      {/* J05 */}
      <CardMachine
        stt={4}
        machineId={machinesId[4]}
        posLeft={width * 21.5}
        posTop={height * 43.2}
        size={width * 1.8}
        img={j05Img}
        plan={producePlanData?.J05?.plan ? producePlanData.J05.plan : 0}
        spm={producePlanData?.J05?.spm ? producePlanData.J05.spm : 0}
        code={producePlanData?.J05?.code ? producePlanData.J05.code : ''}
      />

      {/* J06 */}
      <CardMachine
        stt={5}
        machineId={machinesId[5]}
        posLeft={width * 21.5}
        posTop={height * 51.4}
        size={width * 1.8}
        img={j06Img}
        plan={producePlanData?.J06?.plan ? producePlanData.J06.plan : 0}
        spm={producePlanData?.J06?.spm ? producePlanData.J06.spm : 0}
        code={producePlanData?.J06?.code ? producePlanData.J06.code : ''}
      />

      {/* J07 */}
      <CardMachine
        stt={6}
        machineId={machinesId[6]}
        posLeft={width * 21.5}
        posTop={height * 59.35}
        size={width * 1.8}
        img={j07Img}
        plan={producePlanData?.J07?.plan ? producePlanData.J07.plan : 0}
        spm={producePlanData?.J07?.spm ? producePlanData.J07.spm : 0}
        code={producePlanData?.J07?.code ? producePlanData.J07.code : ''}
      />

      {/* J08 */}
      <CardMachine
        stt={7}
        machineId={machinesId[7]}
        posLeft={width * 21.5}
        posTop={height * 67.2}
        size={width * 1.8}
        img={j08Img}
        plan={producePlanData?.J08?.plan ? producePlanData.J08.plan : 0}
        spm={producePlanData?.J08?.spm ? producePlanData.J08.spm : 0}
        code={producePlanData?.J08?.code ? producePlanData.J08.code : ''}
      />

      {/* J09 */}
      <CardMachine
        stt={8}
        machineId={machinesId[8]}
        posLeft={width * 21.5}
        posTop={height * 75}
        size={width * 1.8}
        img={j09Img}
        plan={producePlanData?.J09?.plan ? producePlanData.J09.plan : 0}
        spm={producePlanData?.J09?.spm ? producePlanData.J09.spm : 0}
        code={producePlanData?.J09?.code ? producePlanData.J09.code : ''}
      />

      {/* J10 */}
      <CardMachine
        stt={9}
        machineId={machinesId[9]}
        posLeft={width * 21.5}
        posTop={height * 82.9}
        size={width * 1.8}
        img={j10Img}
        plan={producePlanData?.J10?.plan ? producePlanData.J10.plan : 0}
        spm={producePlanData?.J10?.spm ? producePlanData.J10.spm : 0}
        code={producePlanData?.J10?.code ? producePlanData.J10.code : ''}
      />

      {/* J11 */}
      <CardMachine
        stt={10}
        machineId={machinesId[10]}
        posLeft={width * 48.3}
        posTop={height * 80.8}
        size={width * 1.8}
        img={j11Img}
        plan={producePlanData?.J11?.plan ? producePlanData.J11.plan : 0}
        spm={producePlanData?.J11?.spm ? producePlanData.J11.spm : 0}
        code={producePlanData?.J11?.code ? producePlanData.J11.code : ''}
      />

      {/* J12 */}
      <CardMachine
        stt={11}
        machineId={machinesId[11]}
        posLeft={width * 48.3}
        posTop={height * 73.5}
        size={width * 1.8}
        img={j12Img}
        plan={producePlanData?.J12?.plan ? producePlanData.J12.plan : 0}
        spm={producePlanData?.J12?.spm ? producePlanData.J12.spm : 0}
        code={producePlanData?.J12?.code ? producePlanData.J12.code : ''}
      />

      {/* J13 */}
      <CardMachine
        stt={12}
        machineId={machinesId[12]}
        posLeft={width * 48.3}
        posTop={height * 66}
        size={width * 1.8}
        img={j13Img}
        plan={producePlanData?.J13?.plan ? producePlanData.J13.plan : 0}
        spm={producePlanData?.J13?.spm ? producePlanData.J13.spm : 0}
        code={producePlanData?.J13?.code ? producePlanData.J13.code : ''}
      />

      {/* J14 */}
      <CardMachine
        stt={13}
        machineId={machinesId[13]}
        posLeft={width * 48.3}
        posTop={height * 59}
        size={width * 1.8}
        img={j14Img}
        plan={producePlanData?.J14?.plan ? producePlanData.J14.plan : 0}
        spm={producePlanData?.J14?.spm ? producePlanData.J14.spm : 0}
        code={producePlanData?.J14?.code ? producePlanData.J14.code : ''}
      />

      {/* J15 */}
      <CardMachine
        stt={14}
        machineId={machinesId[14]}
        posLeft={width * 48.3}
        posTop={height * 51.55}
        size={width * 1.8}
        img={j15Img}
        plan={producePlanData?.J15?.plan ? producePlanData.J15.plan : 0}
        spm={producePlanData?.J15?.spm ? producePlanData.J15.spm : 0}
        code={producePlanData?.J15?.code ? producePlanData.J15.code : ''}
      />

      {/* J16 */}
      <CardMachine
        stt={15}
        machineId={machinesId[15]}
        posLeft={width * 48.3}
        posTop={height * 43.9}
        size={width * 1.8}
        img={j16Img}
        plan={producePlanData?.J16?.plan ? producePlanData.J16.plan : 0}
        spm={producePlanData?.J16?.spm ? producePlanData.J16.spm : 0}
        code={producePlanData?.J16?.code ? producePlanData.J16.code : ''}
      />

      {/* J17 */}
      <CardMachine
        stt={16}
        machineId={machinesId[16]}
        posLeft={width * 48.3}
        posTop={height * 36.7}
        size={width * 1.8}
        img={j17Img}
        plan={producePlanData?.J17?.plan ? producePlanData.J17.plan : 0}
        spm={producePlanData?.J17?.spm ? producePlanData.J17.spm : 0}
        code={producePlanData?.J17?.code ? producePlanData.J17.code : ''}
      />

      {/* J18 */}
      <CardMachine
        stt={17}
        machineId={machinesId[17]}
        posLeft={width * 48.3}
        posTop={height * 29.4}
        size={width * 1.8}
        img={j18Img}
        plan={producePlanData?.J18?.plan ? producePlanData.J18.plan : 0}
        spm={producePlanData?.J18?.spm ? producePlanData.J18.spm : 0}
        code={producePlanData?.J18?.code ? producePlanData.J18.code : ''}
      />

      {/* J19 */}
      <CardMachine
        stt={18}
        machineId={machinesId[18]}
        posLeft={width * 48.3}
        posTop={height * 22.4}
        size={width * 1.8}
        img={j19Img}
        plan={producePlanData?.J19?.plan ? producePlanData.J19.plan : 0}
        spm={producePlanData?.J19?.spm ? producePlanData.J19.spm : 0}
        code={producePlanData?.J19?.code ? producePlanData.J19.code : ''}
      />

      {/* J20 */}
      <CardMachine
        stt={19}
        machineId={machinesId[19]}
        posLeft={width * 48.3}
        posTop={height * 15.8}
        size={width * 1.8}
        img={j20Img}
        plan={producePlanData?.J20?.plan ? producePlanData.J20.plan : 0}
        spm={producePlanData?.J20?.spm ? producePlanData.J20.spm : 0}
        code={producePlanData?.J20?.code ? producePlanData.J20.code : ''}
      />

      {/* J21 */}
      <CardMachine
        stt={20}
        machineId={machinesId[20]}
        posLeft={width * 48.3}
        posTop={height * 9.4}
        size={width * 1.8}
        img={j21Img}
        plan={producePlanData?.J21?.plan ? producePlanData.J21.plan : 0}
        spm={producePlanData?.J21?.spm ? producePlanData.J21.spm : 0}
        code={producePlanData?.J21?.code ? producePlanData.J21.code : ''}
      />

      {/* J22 */}
      <CardMachine
        stt={21}
        machineId={machinesId[21]}
        posLeft={width * 71.3}
        posTop={height * 11.78}
        size={width * 1.8}
        img={j22Img}
        plan={producePlanData?.J22?.plan ? producePlanData.J22.plan : 0}
        spm={producePlanData?.J22?.spm ? producePlanData.J22.spm : 0}
        code={producePlanData?.J22?.code ? producePlanData.J22.code : ''}
      />

      {/* J23 */}
      <CardMachine
        stt={22}
        machineId={machinesId[22]}
        posLeft={width * 71.3}
        posTop={height * 40.9}
        size={width * 1.8}
        img={j23Img}
        plan={producePlanData?.J23?.plan ? producePlanData.J23.plan : 0}
        spm={producePlanData?.J23?.spm ? producePlanData.J23.spm : 0}
        code={producePlanData?.J23?.code ? producePlanData.J23.code : ''}
      />

      {/* J24 */}
      <CardMachine
        stt={23}
        machineId={machinesId[23]}
        posLeft={width * 71.3}
        posTop={height * 48.75}
        size={width * 1.8}
        img={j24Img}
        plan={producePlanData?.J24?.plan ? producePlanData.J24.plan : 0}
        spm={producePlanData?.J24?.spm ? producePlanData.J24.spm : 0}
        code={producePlanData?.J24?.code ? producePlanData.J24.code : ''}
      />
    </div>
  );
}

SignalLightsLayout.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  producePlanData: PropTypes.object,
};

export default SignalLightsLayout;
