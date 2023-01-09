import { Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default function MainLayout({ children }) {
  return (
    <Box
      sx={{
        paddingX: {
          xs: '8px',
          md: '16px',
        },
        paddingY: 1,
      }}
    >
      <Header />
      {/* <Sidebar /> */}
      {children}
    </Box>
  );
}
