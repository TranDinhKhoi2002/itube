import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootStyle = styled('div')(() => ({
  flex: 1,
  height: '100%',
  overflow: 'auto',
}));

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return <RootStyle>{children}</RootStyle>;
}
