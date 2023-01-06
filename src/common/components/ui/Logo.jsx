import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import Iconify from './Iconify';

export default function Logo() {
  return (
    <Link href="/">
      <Stack direction="row" alignItems="center" spacing={1} sx={{ padding: 1 }}>
        <Iconify icon="ion:logo-youtube" width={30} height={30} sx={{ color: '#ff0000' }} />
        <Typography variant="h6">iTube</Typography>
      </Stack>
    </Link>
  );
}
