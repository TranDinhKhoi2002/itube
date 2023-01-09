import { Notifications, VideoCall, AccountCircle } from '@mui/icons-material';
import { Button, Stack, Tooltip } from '@mui/material';

const styles = {
  button: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    minWidth: 'unset',
  },
};

export default function Actions() {
  return (
    <Stack direction="row">
      <Tooltip title="Tạo">
        <Button sx={styles.button}>
          <VideoCall />
        </Button>
      </Tooltip>
      <Tooltip title="Thông báo">
        <Button sx={{ ...styles.button, marginX: { xs: '8xpx', md: '16px' } }}>
          <Notifications />
        </Button>
      </Tooltip>
      <Button sx={styles.button}>
        <AccountCircle />
      </Button>
    </Stack>
  );
}
