import React from 'react';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import ROSLIB from 'roslib';

import RosPropsContext from 'context/RosPropsContext';
import ProducePlanLight from './ProducePlanLight';

function ProducePlanLightsLayout({ width, height }) {
  const [machinesRun, setMachinesRun] = React.useState({});
  const ros = useContext(RosPropsContext);

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
        const totalTime = state.noload + state.underload + state.error;
        machinesRunData = {
          ...machinesRunData,
          [state.name]: (state.underload * 100) / totalTime,
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
        runTime={machinesRun?.J01 ? machinesRun.J01 : 0}
        posLeft={width * 28.8}
        posTop={height * 15.9}
        size={width * 3.8}
      />

      {/* J02 */}
      <ProducePlanLight
        runTime={machinesRun?.J02 ? machinesRun.J02 : 0}
        posLeft={width * 28.8}
        posTop={height * 23.7}
        size={width * 3.8}
      />

      {/* J03 */}
      <ProducePlanLight
        runTime={machinesRun?.J03 ? machinesRun.J03 : 0}
        posLeft={width * 28.8}
        posTop={height * 31.8}
        size={width * 3.8}
      />

      {/* J04 */}
      <ProducePlanLight
        runTime={machinesRun?.J04 ? machinesRun.J04 : 0}
        posLeft={width * 28.8}
        posTop={height * 39.65}
        size={width * 3.8}
      />

      {/* J05 */}
      <ProducePlanLight
        runTime={machinesRun?.J05 ? machinesRun.J05 : 0}
        posLeft={width * 28.8}
        posTop={height * 47.5}
        size={width * 3.8}
      />

      {/* J06 */}
      <ProducePlanLight
        runTime={machinesRun?.J06 ? machinesRun.J06 : 0}
        posLeft={width * 28.8}
        posTop={height * 55.6}
        size={width * 3.8}
      />

      {/* J07 */}
      <ProducePlanLight
        runTime={machinesRun?.J07 ? machinesRun.J07 : 0}
        posLeft={width * 28.8}
        posTop={height * 63.5}
        size={width * 3.8}
      />

      {/* J08 */}
      <ProducePlanLight
        runTime={machinesRun?.J08 ? machinesRun.J08 : 0}
        posLeft={width * 28.8}
        posTop={height * 71}
        size={width * 3.8}
      />

      {/* J09 */}
      <ProducePlanLight
        runTime={machinesRun?.J09 ? machinesRun.J09 : 0}
        posLeft={width * 28.8}
        posTop={height * 78.85}
        size={width * 3.8}
      />

      {/* J10 */}
      <ProducePlanLight
        runTime={machinesRun?.J10 ? machinesRun.J10 : 0}
        posLeft={width * 28.8}
        posTop={height * 86.6}
        size={width * 3.8}
      />

      {/* J11 */}
      <ProducePlanLight
        runTime={machinesRun?.J11 ? machinesRun.J11 : 0}
        posLeft={width * 43.6}
        posTop={height * 84.75}
        size={width * 3.8}
      />

      {/* J12 */}
      <ProducePlanLight
        runTime={machinesRun?.J12 ? machinesRun.J12 : 0}
        posLeft={width * 43.6}
        posTop={height * 77.05}
        size={width * 3.8}
      />

      {/* J13 */}
      <ProducePlanLight
        runTime={machinesRun?.J13 ? machinesRun.J13 : 0}
        posLeft={width * 43.6}
        posTop={height * 69.25}
        size={width * 3.8}
      />

      {/* J14 */}
      <ProducePlanLight
        runTime={machinesRun?.J14 ? machinesRun.J14 : 0}
        posLeft={width * 43.6}
        posTop={height * 61.7}
        size={width * 3.8}
      />

      {/* J15 */}
      <ProducePlanLight
        runTime={machinesRun?.J15 ? machinesRun.J15 : 0}
        posLeft={width * 43.6}
        posTop={height * 53.75}
        size={width * 3.8}
      />

      {/* J16 */}
      <ProducePlanLight
        runTime={machinesRun?.J16 ? machinesRun.J16 : 0}
        posLeft={width * 43.6}
        posTop={height * 45.7}
        size={width * 3.8}
      />

      {/* J17 */}
      <ProducePlanLight
        runTime={machinesRun?.J17 ? machinesRun.J17 : 0}
        posLeft={width * 43.6}
        posTop={height * 37.8}
        size={width * 3.8}
      />

      {/* J18 */}
      <ProducePlanLight
        runTime={machinesRun?.J18 ? machinesRun.J18 : 0}
        posLeft={width * 43.6}
        posTop={height * 30}
        size={width * 3.8}
      />

      {/* J19 */}
      <ProducePlanLight
        runTime={machinesRun?.J19 ? machinesRun.J19 : 0}
        posLeft={width * 43.6}
        posTop={height * 21.9}
        size={width * 3.8}
      />

      {/* J20 */}
      <ProducePlanLight
        runTime={machinesRun?.J20 ? machinesRun.J20 : 0}
        posLeft={width * 43.6}
        posTop={height * 14.0}
        size={width * 3.8}
      />

      {/* J21 */}
      <ProducePlanLight
        runTime={machinesRun?.J21 ? machinesRun.J21 : 0}
        posLeft={width * 66.0}
        posTop={height * 16.65}
        size={width * 3.8}
      />

      {/* J22 */}
      <ProducePlanLight
        runTime={machinesRun?.J22 ? machinesRun.J22 : 0}
        posLeft={width * 66.0}
        posTop={height * 45.2}
        size={width * 3.8}
      />

      {/* J23 */}
      <ProducePlanLight
        runTime={machinesRun?.J23 ? machinesRun.J23 : 0}
        posLeft={width * 66.0}
        posTop={height * 52.95}
        size={width * 3.8}
      />

      {/* J24 */}
      <ProducePlanLight
        runTime={machinesRun?.J24 ? machinesRun.J24 : 0}
        posLeft={width * 66.0}
        posTop={height * 60.7}
        size={width * 3.8}
      />

      {/* Q51 */}
      <ProducePlanLight
        runTime={machinesRun?.Q51 ? machinesRun.Q51 : 0}
        posLeft={width * 57.5}
        posTop={height * 85.7}
        size={width * 3.8}
      />

      {/* Q52 */}
      <ProducePlanLight
        runTime={machinesRun?.Q52 ? machinesRun.Q52 : 0}
        posLeft={width * 57.5}
        posTop={height * 80}
        size={width * 3.8}
      />

      {/* Q53 */}
      <ProducePlanLight
        runTime={machinesRun?.Q53 ? machinesRun.Q53 : 0}
        posLeft={width * 57.5}
        posTop={height * 74.5}
        size={width * 3.8}
      />

      {/* Q54 */}
      <ProducePlanLight
        runTime={machinesRun?.Q54 ? machinesRun.Q54 : 0}
        posLeft={width * 57.5}
        posTop={height * 69}
        size={width * 3.8}
      />

      {/* Q55 */}
      <ProducePlanLight
        runTime={machinesRun?.Q55 ? machinesRun.Q55 : 0}
        posLeft={width * 57.5}
        posTop={height * 61}
        size={width * 3.8}
      />

      {/* Q56 */}
      <ProducePlanLight
        runTime={machinesRun?.Q56 ? machinesRun.Q56 : 0}
        posLeft={width * 57.5}
        posTop={height * 55.7}
        size={width * 3.8}
      />

      {/* Z31 */}
      {/* <ProducePlanLight
        runTime={machinesRun?.Z31 ? machinesRun.Z31 : 0}
        posLeft={width * 66.6}
        posTop={height * 75}
        size={width * 3.8}
      /> */}
    </div>
  );
}

ProducePlanLightsLayout.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  producePlanData: PropTypes.object,
};

export default ProducePlanLightsLayout;
