import React from 'react';
import PropTypes from 'prop-types';
// import SignalLight from 'components/SignalLight';
import Chip from '@mui/material/Chip';

function ProducePlanLight({ plan, spm, runTime, posLeft, posTop, size }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${posLeft / 100}px`,
        top: `${posTop / 100}px`,
        transform: 'translate(-50%, -50%)',
        width: `${size / 100}px`,
      }}
    >
      <Chip
        color="success"
        variant={plan === 0 ? 'outlined' : 'soft'}
        size="small"
        sx={{
          width: '100%',
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }}
        // label={plan ? `${spm * runTime}/ ${plan}` : 0}
        label={plan ? `${((100 * (spm * runTime)) / plan).toFixed(1)}%` : 0}
      />
    </div>
  );
}

ProducePlanLight.propTypes = {
  plan: PropTypes.number,
  spm: PropTypes.number,
  runTime: PropTypes.number,
  posLeft: PropTypes.number,
  posTop: PropTypes.number,
  size: PropTypes.number,
};

export default ProducePlanLight;
