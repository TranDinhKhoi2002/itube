import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, useTheme } from '@mui/material';

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
};

export default function Iconify({ icon, sx, ...other }) {
  const theme = useTheme();

  return <Box component={Icon} icon={icon} sx={{ color: 'white', ...sx }} {...other} />;
}
