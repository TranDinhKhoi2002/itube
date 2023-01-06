import { Box } from '@mui/material';
import Header from '../header/Header';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ paddingX: 4, paddingY: 1 }}>
      <Header />
      {children}
    </Box>
  );
}
