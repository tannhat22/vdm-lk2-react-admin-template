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
        posLeft={width * 28.18}
        posTop={height * 13.65}
        size={width * 3.8}
      />

      {/* J02 */}
      <ProducePlanLight
        runTime={machinesRun?.J02 ? machinesRun.J02 : 0}
        posLeft={width * 28.18}
        posTop={height * 21.65}
        size={width * 3.8}
      />

      {/* J03 */}
      <ProducePlanLight
        runTime={machinesRun?.J03 ? machinesRun.J03 : 0}
        posLeft={width * 28.18}
        posTop={height * 29.82}
        size={width * 3.8}
      />

      {/* J04 */}
      <ProducePlanLight
        runTime={machinesRun?.J04 ? machinesRun.J04 : 0}
        posLeft={width * 28.18}
        posTop={height * 37.8}
        size={width * 3.8}
      />

      {/* J05 */}
      <ProducePlanLight
        runTime={machinesRun?.J05 ? machinesRun.J05 : 0}
        posLeft={width * 28.18}
        posTop={height * 45.85}
        size={width * 3.8}
      />

      {/* J06 */}
      <ProducePlanLight
        runTime={machinesRun?.J06 ? machinesRun.J06 : 0}
        posLeft={width * 28.18}
        posTop={height * 54.05}
        size={width * 3.8}
      />

      {/* J07 */}
      <ProducePlanLight
        runTime={machinesRun?.J07 ? machinesRun.J07 : 0}
        posLeft={width * 28.18}
        posTop={height * 62.1}
        size={width * 3.8}
      />

      {/* J08 */}
      <ProducePlanLight
        runTime={machinesRun?.J08 ? machinesRun.J08 : 0}
        posLeft={width * 28.18}
        posTop={height * 69.9}
        size={width * 3.8}
      />

      {/* J09 */}
      <ProducePlanLight
        runTime={machinesRun?.J09 ? machinesRun.J09 : 0}
        posLeft={width * 28.18}
        posTop={height * 77.75}
        size={width * 3.8}
      />

      {/* J10 */}
      <ProducePlanLight
        runTime={machinesRun?.J10 ? machinesRun.J10 : 0}
        posLeft={width * 28.18}
        posTop={height * 85.6}
        size={width * 3.8}
      />

      {/* J11 */}
      <ProducePlanLight
        runTime={machinesRun?.J11 ? machinesRun.J11 : 0}
        posLeft={width * 43.2}
        posTop={height * 83.5}
        size={width * 3.8}
      />

      {/* J12 */}
      <ProducePlanLight
        runTime={machinesRun?.J12 ? machinesRun.J12 : 0}
        posLeft={width * 43.2}
        posTop={height * 76.15}
        size={width * 3.8}
      />

      {/* J13 */}
      <ProducePlanLight
        runTime={machinesRun?.J13 ? machinesRun.J13 : 0}
        posLeft={width * 43.2}
        posTop={height * 68.7}
        size={width * 3.8}
      />

      {/* J14 */}
      <ProducePlanLight
        runTime={machinesRun?.J14 ? machinesRun.J14 : 0}
        posLeft={width * 43.2}
        posTop={height * 61.7}
        size={width * 3.8}
      />

      {/* J15 */}
      <ProducePlanLight
        runTime={machinesRun?.J15 ? machinesRun.J15 : 0}
        posLeft={width * 43.2}
        posTop={height * 54.2}
        size={width * 3.8}
      />

      {/* J16 */}
      <ProducePlanLight
        runTime={machinesRun?.J16 ? machinesRun.J16 : 0}
        posLeft={width * 43.3}
        posTop={height * 46.5}
        size={width * 3.8}
      />

      {/* J17 */}
      <ProducePlanLight
        runTime={machinesRun?.J17 ? machinesRun.J17 : 0}
        posLeft={width * 43.3}
        posTop={height * 39.35}
        size={width * 3.8}
      />

      {/* J18 */}
      <ProducePlanLight
        runTime={machinesRun?.J18 ? machinesRun.J18 : 0}
        posLeft={width * 43.3}
        posTop={height * 32.1}
        size={width * 3.8}
      />

      {/* J19 */}
      <ProducePlanLight
        runTime={machinesRun?.J19 ? machinesRun.J19 : 0}
        posLeft={width * 43.3}
        posTop={height * 25}
        size={width * 3.8}
      />

      {/* J20 */}
      <ProducePlanLight
        runTime={machinesRun?.J20 ? machinesRun.J20 : 0}
        posLeft={width * 43.3}
        posTop={height * 18.45}
        size={width * 3.8}
      />

      {/* J21 */}
      <ProducePlanLight
        runTime={machinesRun?.J21 ? machinesRun.J21 : 0}
        posLeft={width * 43.3}
        posTop={height * 12.1}
        size={width * 3.8}
      />

      {/* J22 */}
      <ProducePlanLight
        runTime={machinesRun?.J22 ? machinesRun.J22 : 0}
        posLeft={width * 66.4}
        posTop={height * 14.5}
        size={width * 3.8}
      />

      {/* J23 */}
      <ProducePlanLight
        runTime={machinesRun?.J23 ? machinesRun.J23 : 0}
        posLeft={width * 66.4}
        posTop={height * 43.55}
        size={width * 3.8}
      />

      {/* J24 */}
      <ProducePlanLight
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
