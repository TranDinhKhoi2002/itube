import useResponsive from '@/hooks/useResponsive';
import { Menu } from '@mui/icons-material';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Iconify from '../UI/Iconify';
import Logo from '../UI/Logo';
import Actions from './Actions';
import SearchInput from './SearchInput';

const styles = {
  button: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    minWidth: 'unset',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    paddingX: '8px',
    height: '45px',
  },
  voiceSearchModal: {
    position: 'absolute',
    top: '8px',
    bottom: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: {
      xs: '95%',
      sm: '70%',
      md: '40%',
    },
    maxHeight: '90%',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 6,
    p: {
      xs: '12px',
      md: 4,
    },
  },
  closeButton: { width: '40px', height: '40px', borderRadius: '50%', marginLeft: '4px' },
  micIcon: { width: '40px', height: '40px', color: 'white' },
  micButtonModal: { width: '80px', height: '80px', backgroundColor: 'red', borderRadius: '50%' },
};

export default function Header() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const isDesktop = useResponsive('up', 'lg');
  const isPhone = useResponsive('up', 'sm');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [searchByVoice, setSearchByVoice] = useState(false);

  console.log(isPhone);

  const handleShowModal = () => {
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };

  const handleCloseVoiceModal = () => {
    setSearchByVoice(false);
    SpeechRecognition.stopListening();
  };

  const handleSearchByVoice = () => {
    setSearchByVoice(true);
    SpeechRecognition.startListening();
  };

  if (transcript && !listening && searchByVoice) {
    setSearchByVoice(false);
  }

  return (
    <>
      {(!modalIsVisible || isPhone) && (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Button sx={styles.button}>
              <Menu />
            </Button>
            <Logo />
          </Stack>

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SearchInput onSearchByVoice={handleSearchByVoice} />
          </Box>

          {/* Buttons for mobile */}
          <Stack direction="row" flex="1" justifyContent="flex-end" sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <Button
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
              }}
              onClick={handleShowModal}
            >
              <Iconify icon="material-symbols:search-rounded" width={25} height={25} />
            </Button>
            <Button
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
              }}
              onClick={handleSearchByVoice}
            >
              <Iconify icon="material-symbols:mic-rounded" width={25} height={25} />
            </Button>
          </Stack>

          <Actions />
        </Stack>
      )}

      <Modal open={modalIsVisible && !isPhone} onClose={handleCloseModal}>
        <Box sx={{ padding: '8px' }}>
          <SearchInput onSearchByVoice={handleSearchByVoice} />
        </Box>
      </Modal>

      <Modal
        open={searchByVoice && listening}
        disableAutoFocus={true}
        onClose={handleCloseVoiceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack direction="column" sx={styles.voiceSearchModal}>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: '26px' }}>Đang nghe...</Typography>
            <Button sx={styles.closeButton} onClick={handleCloseVoiceModal}>
              <Iconify icon="material-symbols:close" width={40} height={40} />
            </Button>
          </Stack>
          <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
            <Button style={styles.micButtonModal}>
              <Iconify icon="material-symbols:mic-rounded" sx={styles.micIcon} />
            </Button>
          </Stack>
          <Typography textAlign="center" variant="body1" fontSize="20px">
            {transcript}
          </Typography>
        </Stack>
      </Modal>
    </>
  );
}
