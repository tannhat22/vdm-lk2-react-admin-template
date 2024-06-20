import React from 'react';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import ROSLIB from 'roslib';

import RosPropsContext from 'context/RosPropsContext';
import MaterialLight from './MaterialLight';

function MaterialLightsLayout({ width, height }) {
  const [machineData, setMachineData] = React.useState([]);
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
      let dataMachine = data.state_machines;
      setMachineData(dataMachine);
    }
    return () => {
      listener.unsubscribe();
    };
  }, [ros]);

  return (
    <div>
      {/* J01 */}
      <MaterialLight
        state={machineData[0] ? machineData[0].material : 0}
        posLeft={width * 40.53}
        posTop={height * 8}
        size={width * 1.3}
      />

      {/* J02 */}
      <MaterialLight
        state={machineData[1] ? machineData[1].material : 0}
        posLeft={width * 40.53}
        posTop={height * 16.35}
        size={width * 1.3}
      />

      {/* J03 */}
      <MaterialLight
        state={machineData[2] ? machineData[2].material : 0}
        posLeft={width * 40.53}
        posTop={height * 24.8}
        size={width * 1.3}
      />

      {/* J04 */}
      <MaterialLight
        state={machineData[3] ? machineData[3].material : 0}
        posLeft={width * 40.53}
        posTop={height * 33.18}
        size={width * 1.3}
      />

      {/* J05 */}
      <MaterialLight
        state={machineData[4] ? machineData[4].material : 0}
        posLeft={width * 40.53}
        posTop={height * 41.6}
        size={width * 1.3}
      />

      {/* J06 */}
      <MaterialLight
        state={machineData[5] ? machineData[5].material : 0}
        posLeft={width * 40.53}
        posTop={height * 50.1}
        size={width * 1.3}
      />

      {/* J07 */}
      <MaterialLight
        state={machineData[6] ? machineData[6].material : 0}
        posLeft={width * 40.53}
        posTop={height * 58.65}
        size={width * 1.3}
      />

      {/* J08 */}
      <MaterialLight
        state={machineData[7] ? machineData[7].material : 0}
        posLeft={width * 40.53}
        posTop={height * 66.65}
        size={width * 1.3}
      />

      {/* J09 */}
      <MaterialLight
        state={machineData[8] ? machineData[8].material : 0}
        posLeft={width * 40.53}
        posTop={height * 74.75}
        size={width * 1.3}
      />

      {/* J10 */}
      <MaterialLight
        state={machineData[9] ? machineData[9].material : 0}
        posLeft={width * 40.53}
        posTop={height * 83.15}
        size={width * 1.3}
      />

      {/* J11 */}
      <MaterialLight
        state={machineData[10] ? machineData[10].material : 0}
        posLeft={width * 70.7}
        posTop={height * 87.65}
        size={width * 1.3}
      />

      {/* J12 */}
      <MaterialLight
        state={machineData[11] ? machineData[11].material : 0}
        posLeft={width * 70.7}
        posTop={height * 80}
        size={width * 1.3}
      />

      {/* J13 */}
      <MaterialLight
        state={machineData[12] ? machineData[12].material : 0}
        posLeft={width * 70.7}
        posTop={height * 72.1}
        size={width * 1.3}
      />

      {/* J14 */}
      <MaterialLight
        state={machineData[13] ? machineData[13].material : 0}
        posLeft={width * 70.7}
        posTop={height * 64.8}
        size={width * 1.3}
      />

      {/* J15 */}
      <MaterialLight
        state={machineData[14] ? machineData[14].material : 0}
        posLeft={width * 70.7}
        posTop={height * 56.9}
        size={width * 1.3}
      />

      {/* J16 */}
      <MaterialLight
        state={machineData[15] ? machineData[15].material : 0}
        posLeft={width * 70.7}
        posTop={height * 48.7}
        size={width * 1.3}
      />

      {/* J17 */}
      <MaterialLight
        state={machineData[16] ? machineData[16].material : 0}
        posLeft={width * 70.7}
        posTop={height * 41.25}
        size={width * 1.3}
      />

      {/* J18 */}
      <MaterialLight
        state={machineData[17] ? machineData[17].material : 0}
        posLeft={width * 70.7}
        posTop={height * 33.45}
        size={width * 1.3}
      />

      {/* J19 */}
      <MaterialLight
        state={machineData[18] ? machineData[18].material : 0}
        posLeft={width * 70.7}
        posTop={height * 26}
        size={width * 1.3}
      />

      {/* J20 */}
      <MaterialLight
        state={machineData[19] ? machineData[19].material : 0}
        posLeft={width * 70.7}
        posTop={height * 19.1}
        size={width * 1.3}
      />

      {/* J21 */}
      <MaterialLight
        state={machineData[20] ? machineData[20].material : 0}
        posLeft={width * 70.7}
        posTop={height * 12.2}
        size={width * 1.3}
      />

      {/* J22 */}
      <MaterialLight
        state={machineData[21] ? machineData[21].material : 0}
        posLeft={width * 93.95}
        posTop={height * 15.1}
        size={width * 1.3}
      />

      {/* J23 */}
      <MaterialLight
        state={machineData[22] ? machineData[22].material : 0}
        posLeft={width * 93.95}
        posTop={height * 45.65}
        size={width * 1.3}
      />

      {/* J24 */}
      <MaterialLight
        state={machineData[23] ? machineData[23].material : 0}
        posLeft={width * 93.95}
        posTop={height * 54.04}
        size={width * 1.3}
      />
    </div>
  );
}

MaterialLightsLayout.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default MaterialLightsLayout;
