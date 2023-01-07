import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Iconify from '../ui/Iconify';

const styles = {
  searchContainer: {
    border: '1px solid #35363a',
    borderRadius: '24px',
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    paddingY: '3px',
    paddingX: '16px',
  },
  firstSearchIcon: { marginRight: '12px', width: '20px', height: '20px' },
  secondSearchButton: {
    width: '50px',
    height: '48px',
    border: '1px solid #35363a',
    borderRadius: 0,
    borderTopRightRadius: '24px',
    borderBottomRightRadius: '24px',
    backgroundColor: '#222222 !important',
  },
  keyboardButton: { position: 'absolute', bottom: 0, right: 0 },
  keyboardIcon: { cursor: 'pointer', width: '20px', height: '20px', marginLeft: '12px' },
  closeButton: { width: '40px', height: '40px', borderRadius: '50%', marginLeft: '4px' },
  micButton: { width: '40px', height: '40px', borderRadius: '50%', marginLeft: '4px' },
  micIcon: { width: '40px', height: '40px', color: 'white' },
  micButtonModal: { width: '80px', height: '80px', backgroundColor: 'red', borderRadius: '50%' },
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
};

export default function SearchInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [enteredValue, setEnteredValue] = useState('');
  const [layout, setLayout] = useState('default');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef();

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [searchByVoice, setSearchByVoice] = useState(false);

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleClearInput = () => {
    setEnteredValue('');
    inputRef.current.input.default = '';
  };

  const handleSearch = () => {
    console.log(enteredValue);
  };

  const onChange = (input) => {
    setEnteredValue((currentEnteredText) => currentEnteredText + input[input.length - 1]);
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    // handle the shift and caps lock buttons
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const handleSearchByVoice = () => {
    setSearchByVoice(true);
  };

  const handleCloseModal = () => {
    setSearchByVoice(false);
  };

  console.log(listening);

  if (listening) {
  }

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Box sx={styles.searchContainer}>
          <Stack direction="row" alignItems="center">
            {isFocused && <Iconify icon="material-symbols:search-rounded" sx={styles.firstSearchIcon} />}
            <input
              placeholder="Tìm kiếm"
              className="outline-none bg-transparent my-2"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              ref={inputRef}
              value={enteredValue}
              onChange={handleInputChange}
              onFocusCapture={() => {
                console.log('focus capture');
              }}
            />
            <Iconify
              icon="material-symbols:keyboard-alt"
              sx={styles.keyboardIcon}
              onClick={() => setShowKeyboard((prevState) => !prevState)}
            />
            {enteredValue && (
              <Button sx={styles.closeButton} onClick={handleClearInput}>
                <Iconify icon="material-symbols:close" width={40} height={40} />
              </Button>
            )}
          </Stack>
        </Box>
        <Button sx={styles.secondSearchButton} onClick={handleSearch}>
          <Iconify icon="material-symbols:search-rounded" width={25} height={25} />
        </Button>
        <Button style={styles.micButton} onClick={handleSearchByVoice}>
          <Iconify icon="material-symbols:mic-rounded" sx={styles.micIcon} />
        </Button>

        {showKeyboard && (
          <Box sx={styles.keyboardButton}>
            <Keyboard
              keyboardRef={(r) => (inputRef.current = r)}
              layoutName={layout}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </Box>
        )}
      </Stack>
      <Modal
        open={searchByVoice}
        disableAutoFocus={true}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack direction="column" sx={styles.voiceSearchModal}>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: '26px' }}>Đang nghe...</Typography>
            <Button sx={styles.closeButton} onClick={handleCloseModal}>
              <Iconify icon="material-symbols:close" width={40} height={40} />
            </Button>
          </Stack>
          <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
            <Button style={styles.micButtonModal} onClick={SpeechRecognition.startListening}>
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
