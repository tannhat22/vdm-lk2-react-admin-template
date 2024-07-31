import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

function ProducePlanLight({ runTime, posLeft, posTop, size }) {
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
        color={runTime >= 80 ? 'primary' : 'error'}
        // variant={runTime >== 0 ? 'outlined' : 'soft'}
        variant="outlined"
        size="small"
        sx={{
          width: '100%',
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
          // borderColor: 'black',
          backgroundColor: 'white',
          // color: `${runTime >= 80 ? 'blue' : 'red'}`,
        }}
        label={runTime ? `${runTime.toFixed(1)}%` : '0.0%'}
      />
    </div>
  );
}

ProducePlanLight.propTypes = {
  runTime: PropTypes.number,
  posLeft: PropTypes.number,
  posTop: PropTypes.number,
  size: PropTypes.number,
};

export default ProducePlanLight;
