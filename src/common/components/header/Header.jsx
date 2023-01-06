import { Box, Button, Stack } from '@mui/material';
import Iconify from '../ui/Iconify';
import Logo from '../ui/Logo';
import SearchInput from './SearchInput';

export default function Header() {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Button
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'red',
              minWidth: 'unset',
              '&:hover': { backgroundColor: '#272727' },
            }}
          >
            <Iconify icon="material-symbols:menu" width={26} height={26} color="#878787" />
          </Button>
          <Logo />
        </Stack>
        <SearchInput />
        <Box></Box>
      </Stack>
    </Box>
  );
}
