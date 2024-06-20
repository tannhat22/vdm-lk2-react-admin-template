import React from 'react';
// import { useSelector, shallowEqual } from 'react-redux';

import layoutImage from 'assets/images/layout/layout-lk2-vdm.jpg';
import { Box, Typography } from '@mui/material';

// import SignalLightsLayout from './SignalLightsLayout';
import SignalLight from 'components/SignalLight';
import { useLocales } from 'locales';

function LayoutPage() {
  const { translate } = useLocales();

  const [machines, setMachines] = React.useState([
    { x: 100, y: 100, status: 'on' },
    { x: 200, y: 200, status: 'off' },
    { x: 300, y: 300, status: 'error' },
  ]);

  const canvasRef = React.useRef(null);

  //   const drawOpen = useSelector((state) => {
  //     return state.menu.drawerOpen;
  //   }, shallowEqual);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const layoutImg = new Image();
    layoutImg.src = layoutImage;
    layoutImg.onload = () => {
      const imgWidth = layoutImg.width;
      const imgHeight = layoutImg.height;

      const scale = 0.38;
      // Điều chỉnh kích thước canvas theo tỷ lệ của ảnh
      canvas.width = imgWidth * scale;
      canvas.height = imgHeight * scale;

      drawLayout(ctx, layoutImg);
      drawStatusLights(ctx, machines);
    };
  }, [machines]);

  const drawLayout = (ctx, img) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawStatusLights = (ctx, machines) => {
    machines.forEach((machine) => {
      if (machine.status === 'on') {
        ctx.fillStyle = 'green';
      } else if (machine.status === 'off') {
        ctx.fillStyle = 'red';
      } else if (machine.status === 'error') {
        ctx.fillStyle = 'yellow';
      }
      ctx.beginPath();
      ctx.arc(machine.x, machine.y, 10, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const updateMachineStatus = (index, newStatus) => {
    setMachines((prevMachines) => {
      const newMachines = [...prevMachines];
      newMachines[index].status = newStatus;
      return newMachines;
    });
  };

  // Example: Update the status of the first machine after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updateMachineStatus(0, 'off');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2" color="primary" sx={{ marginBottom: '16px' }}>
          {/* {translate('LAYOUT DIAGRAM OF VDM MACHINING TOOLS MANUFACTURING SECTION')} */}
          SƠ ĐỒ LAYOUT CÔNG ĐOẠN THÀNH HÌNH PHÒNG LINH KIỆN 2
        </Typography>
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <canvas ref={canvasRef} width={1000} height={1000} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2px', marginTop: '100px' }}>
          <Typography
            variant="body1"
            component="div"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginRight: '24px' }}
          >
            <div style={{ marginRight: '10px' }}>
              <SignalLight color="off" />
            </div>
            : {translate('Turn off machine')}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginRight: '24px' }}
          >
            <div style={{ marginRight: '10px' }}>
              <SignalLight color="yellow" />
            </div>
            {/* : {translate('Out of ingredients')} */}
            Hết nguyên liệu
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginRight: '24px' }}
          >
            <div style={{ marginRight: '10px' }}>
              <SignalLight color="green" />
            </div>
            : {translate('Running with load')}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginRight: '24px' }}
          >
            <div style={{ marginRight: '10px' }}>
              <SignalLight color="red" />
            </div>
            : {translate('Running without load')}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginRight: '24px' }}
          >
            <div style={{ marginRight: '10px' }}>
              <SignalLight custom="standing" color="purple" size="28" />
            </div>
            : {translate('Stand position')}
          </Typography>
        </div>
      </div>
    </Box>
  );
}

export default LayoutPage;
