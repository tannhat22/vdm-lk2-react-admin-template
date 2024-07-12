import React from 'react';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import ROSLIB from 'roslib';

import RosPropsContext from 'context/RosPropsContext';
import ProducePlanLight from './ProducePlanLight';

function ProducePlanLightsLayout({ width, height, producePlanData }) {
  const [machinesRun, setMachinesRun] = React.useState({});
  const ros = useContext(RosPropsContext);

  // useEffect(() => {
  //   var getProducePlanClient = new ROSLIB.Service({
  //     ros: ros,
  //     name: '/get_produce_plans',
  //     serviceType: 'vdm_machine_msgs/GetProducePlan',
  //   });

  //   let requestProducePlan = new ROSLIB.ServiceRequest({
  //     get_all_produce_plan: true,
  //   });

  //   getProducePlanClient.callService(requestProducePlan, function (result) {
  //     if (result.success) {
  //       let producePlans = {};
  //       result.produce_plane_data.forEach((element) => {
  //         producePlans = {
  //           ...producePlans,
  //           [element.machine_name]: element.produce_plan,
  //         };
  //       });

  //       setProducePlanData(producePlans);
  //     }
  //   });
  // }, [ros]);
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
      let machinesRunData = {};
      let machinesState = data.state_machines;
      machinesState.forEach((state) => {
        machinesRunData = {
          ...machinesRunData,
          [state.name]: state.underload,
        };
      });
      setMachinesRun({
        ...machinesRun,
        ...machinesRunData,
      });
    }
    return () => {
      listener.unsubscribe();
    };
  }, [ros]);
  return (
    <div>
      {/* J01 */}
      <ProducePlanLight
        plan={producePlanData?.J01?.plan ? producePlanData.J01.plan : 0}
        spm={producePlanData?.J01?.spm ? producePlanData.J01.spm : 0}
        runTime={machinesRun?.J01 ? machinesRun.J01 : 0}
        // plan={99999}
        posLeft={width * 28.18}
        posTop={height * 13.65}
        size={width * 3.8}
      />

      {/* J02 */}
      <ProducePlanLight
        plan={producePlanData?.J02?.plan ? producePlanData.J02.plan : 0}
        spm={producePlanData?.J02?.spm ? producePlanData.J02.spm : 0}
        runTime={machinesRun?.J02 ? machinesRun.J02 : 0}
        posLeft={width * 28.18}
        posTop={height * 21.65}
        size={width * 3.8}
      />

      {/* J03 */}
      <ProducePlanLight
        plan={producePlanData?.J03?.plan ? producePlanData.J03.plan : 0}
        spm={producePlanData?.J03?.spm ? producePlanData.J03.spm : 0}
        runTime={machinesRun?.J03 ? machinesRun.J03 : 0}
        posLeft={width * 28.18}
        posTop={height * 29.82}
        size={width * 3.8}
      />

      {/* J04 */}
      <ProducePlanLight
        plan={producePlanData?.J04?.plan ? producePlanData.J04.plan : 0}
        spm={producePlanData?.J04?.spm ? producePlanData.J04.spm : 0}
        runTime={machinesRun?.J04 ? machinesRun.J04 : 0}
        posLeft={width * 28.18}
        posTop={height * 37.8}
        size={width * 3.8}
      />

      {/* J05 */}
      <ProducePlanLight
        plan={producePlanData?.J05?.plan ? producePlanData.J05.plan : 0}
        spm={producePlanData?.J05?.spm ? producePlanData.J05.spm : 0}
        runTime={machinesRun?.J05 ? machinesRun.J05 : 0}
        posLeft={width * 28.18}
        posTop={height * 45.85}
        size={width * 3.8}
      />

      {/* J06 */}
      <ProducePlanLight
        plan={producePlanData?.J06?.plan ? producePlanData.J06.plan : 0}
        spm={producePlanData?.J06?.spm ? producePlanData.J06.spm : 0}
        runTime={machinesRun?.J06 ? machinesRun.J06 : 0}
        posLeft={width * 28.18}
        posTop={height * 54.05}
        size={width * 3.8}
      />

      {/* J07 */}
      <ProducePlanLight
        plan={producePlanData?.J07?.plan ? producePlanData.J07.plan : 0}
        spm={producePlanData?.J07?.spm ? producePlanData.J07.spm : 0}
        runTime={machinesRun?.J07 ? machinesRun.J07 : 0}
        posLeft={width * 28.18}
        posTop={height * 62.1}
        size={width * 3.8}
      />

      {/* J08 */}
      <ProducePlanLight
        plan={producePlanData?.J08?.plan ? producePlanData.J08.plan : 0}
        spm={producePlanData?.J08?.spm ? producePlanData.J08.spm : 0}
        runTime={machinesRun?.J08 ? machinesRun.J08 : 0}
        posLeft={width * 28.18}
        posTop={height * 69.9}
        size={width * 3.8}
      />

      {/* J09 */}
      <ProducePlanLight
        plan={producePlanData?.J09?.plan ? producePlanData.J09.plan : 0}
        spm={producePlanData?.J09?.spm ? producePlanData.J09.spm : 0}
        runTime={machinesRun?.J09 ? machinesRun.J09 : 0}
        posLeft={width * 28.18}
        posTop={height * 77.75}
        size={width * 3.8}
      />

      {/* J10 */}
      <ProducePlanLight
        plan={producePlanData?.J10?.plan ? producePlanData.J10.plan : 0}
        spm={producePlanData?.J10?.spm ? producePlanData.J10.spm : 0}
        runTime={machinesRun?.J10 ? machinesRun.J10 : 0}
        posLeft={width * 28.18}
        posTop={height * 85.6}
        size={width * 3.8}
      />

      {/* J11 */}
      <ProducePlanLight
        plan={producePlanData?.J11?.plan ? producePlanData.J11.plan : 0}
        spm={producePlanData?.J11?.spm ? producePlanData.J11.spm : 0}
        runTime={machinesRun?.J11 ? machinesRun.J11 : 0}
        posLeft={width * 43.2}
        posTop={height * 83.5}
        size={width * 3.8}
      />

      {/* J12 */}
      <ProducePlanLight
        plan={producePlanData?.J12?.plan ? producePlanData.J12.plan : 0}
        spm={producePlanData?.J12?.spm ? producePlanData.J12.spm : 0}
        runTime={machinesRun?.J12 ? machinesRun.J12 : 0}
        posLeft={width * 43.2}
        posTop={height * 76.15}
        size={width * 3.8}
      />

      {/* J13 */}
      <ProducePlanLight
        plan={producePlanData?.J13?.plan ? producePlanData.J13.plan : 0}
        spm={producePlanData?.J13?.spm ? producePlanData.J13.spm : 0}
        runTime={machinesRun?.J13 ? machinesRun.J13 : 0}
        posLeft={width * 43.2}
        posTop={height * 68.7}
        size={width * 3.8}
      />

      {/* J14 */}
      <ProducePlanLight
        plan={producePlanData?.J14?.plan ? producePlanData.J14.plan : 0}
        spm={producePlanData?.J14?.spm ? producePlanData.J14.spm : 0}
        runTime={machinesRun?.J14 ? machinesRun.J14 : 0}
        posLeft={width * 43.2}
        posTop={height * 61.7}
        size={width * 3.8}
      />

      {/* J15 */}
      <ProducePlanLight
        plan={producePlanData?.J15?.plan ? producePlanData.J15.plan : 0}
        spm={producePlanData?.J15?.spm ? producePlanData.J15.spm : 0}
        runTime={machinesRun?.J15 ? machinesRun.J15 : 0}
        posLeft={width * 43.2}
        posTop={height * 54.2}
        size={width * 3.8}
      />

      {/* J16 */}
      <ProducePlanLight
        plan={producePlanData?.J16?.plan ? producePlanData.J16.plan : 0}
        spm={producePlanData?.J16?.spm ? producePlanData.J16.spm : 0}
        runTime={machinesRun?.J16 ? machinesRun.J16 : 0}
        posLeft={width * 43.3}
        posTop={height * 46.5}
        size={width * 3.8}
      />

      {/* J17 */}
      <ProducePlanLight
        plan={producePlanData?.J17?.plan ? producePlanData.J17.plan : 0}
        spm={producePlanData?.J17?.spm ? producePlanData.J17.spm : 0}
        runTime={machinesRun?.J17 ? machinesRun.J17 : 0}
        posLeft={width * 43.3}
        posTop={height * 39.35}
        size={width * 3.8}
      />

      {/* J18 */}
      <ProducePlanLight
        plan={producePlanData?.J18?.plan ? producePlanData.J18.plan : 0}
        spm={producePlanData?.J18?.spm ? producePlanData.J18.spm : 0}
        runTime={machinesRun?.J18 ? machinesRun.J18 : 0}
        posLeft={width * 43.3}
        posTop={height * 32.1}
        size={width * 3.8}
      />

      {/* J19 */}
      <ProducePlanLight
        plan={producePlanData?.J19?.plan ? producePlanData.J19.plan : 0}
        spm={producePlanData?.J19?.spm ? producePlanData.J19.spm : 0}
        runTime={machinesRun?.J19 ? machinesRun.J19 : 0}
        posLeft={width * 43.3}
        posTop={height * 25}
        size={width * 3.8}
      />

      {/* J20 */}
      <ProducePlanLight
        plan={producePlanData?.J20?.plan ? producePlanData.J20.plan : 0}
        spm={producePlanData?.J20?.spm ? producePlanData.J20.spm : 0}
        runTime={machinesRun?.J20 ? machinesRun.J20 : 0}
        posLeft={width * 43.3}
        posTop={height * 18.45}
        size={width * 3.8}
      />

      {/* J21 */}
      <ProducePlanLight
        plan={producePlanData?.J21?.plan ? producePlanData.J21.plan : 0}
        spm={producePlanData?.J21?.spm ? producePlanData.J21.spm : 0}
        runTime={machinesRun?.J21 ? machinesRun.J21 : 0}
        posLeft={width * 43.3}
        posTop={height * 12.1}
        size={width * 3.8}
      />

      {/* J22 */}
      <ProducePlanLight
        plan={producePlanData?.J22?.plan ? producePlanData.J22.plan : 0}
        spm={producePlanData?.J22?.spm ? producePlanData.J22.spm : 0}
        runTime={machinesRun?.J22 ? machinesRun.J22 : 0}
        posLeft={width * 66.4}
        posTop={height * 14.5}
        size={width * 3.8}
      />

      {/* J23 */}
      <ProducePlanLight
        plan={producePlanData?.J23?.plan ? producePlanData.J23.plan : 0}
        spm={producePlanData?.J23?.spm ? producePlanData.J23.spm : 0}
        runTime={machinesRun?.J23 ? machinesRun.J23 : 0}
        posLeft={width * 66.4}
        posTop={height * 43.55}
        size={width * 3.8}
      />

      {/* J24 */}
      <ProducePlanLight
        plan={producePlanData?.J24?.plan ? producePlanData.J24.plan : 0}
        spm={producePlanData?.J24?.spm ? producePlanData.J24.spm : 0}
        runTime={machinesRun?.J24 ? machinesRun.J24 : 0}
        posLeft={width * 66.4}
        posTop={height * 51.5}
        size={width * 3.8}
      />
    </div>
  );
}

ProducePlanLightsLayout.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  producePlanData: PropTypes.object,
};

export default ProducePlanLightsLayout;
