import React from 'react';
import PropTypes from 'prop-types';
import SignalLight from 'components/SignalLight';

function MaterialLight({ state, posLeft, posTop, size }) {
  return (
    <div style={{ position: 'absolute', left: `${posLeft / 100}px`, top: `${posTop / 100}px` }}>
      <SignalLight color={state === 0 ? 'blue' : 'yellow'} size={`${size / 100}`} custom="layout" />
    </div>
  );
}

MaterialLight.propTypes = {
  state: PropTypes.number,
  posLeft: PropTypes.number,
  posTop: PropTypes.number,
  size: PropTypes.number,
};

export default MaterialLight;
