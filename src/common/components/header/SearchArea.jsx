import { Box, Button, Stack, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Iconify from '../UI/Iconify';

const styles = {
  searchContainer: {
    width: { sm: '250px', md: '400px' },
    border: '1px solid #35363a',
    borderRadius: '24px',
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    paddingY: '3px',
    paddingX: '16px',
  },
  firstSearchIcon: { marginRight: '12px', width: '20px', height: '20px' },
  secondSearchButton: {
    width: '60px',
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
  micButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginLeft: '4px',
  },
  micIcon: { width: '40px', height: '40px', color: 'white' },
};

export default function SearchArea() {
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');
  const [layout, setLayout] = useState('default');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const keyboard = useRef();

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  const handleClearInput = () => {
    setInput('');
    keyboard.current.setInput('');
  };

  const handleSearch = () => {
    if (input.trim() === '') return;

    console.log(input);
  };

  const onChange = (enteredInput) => {
    setInput(enteredInput);
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
    SpeechRecognition.startListening();
  };

  return (
    <Stack direction="row" alignItems="center" sx={{ flex: 1, justifyContent: 'center' }}>
      <Box sx={styles.searchContainer}>
        <Stack direction="row" alignItems="center">
          {isFocused && <Iconify icon="material-symbols:search-rounded" sx={styles.firstSearchIcon} />}
          <input
            placeholder="T??m ki???m"
            className="outline-none bg-transparent my-2 w-[100%]"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={input}
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
          {input && (
            <Button sx={styles.closeButton} onClick={handleClearInput}>
              <Iconify icon="material-symbols:close" width={40} height={40} />
            </Button>
          )}
        </Stack>
      </Box>
      <Tooltip title="T??m ki???m">
        <Button sx={styles.secondSearchButton} onClick={handleSearch}>
          <Iconify icon="material-symbols:search-rounded" width={25} height={25} />
        </Button>
      </Tooltip>
      <Tooltip title="T??m ki???m b???ng gi???ng n??i">
        <Button style={styles.micButton} onClick={handleSearchByVoice}>
          <Iconify icon="material-symbols:mic-rounded" sx={styles.micIcon} />
        </Button>
      </Tooltip>

      <Box sx={{ ...styles.keyboardButton, display: showKeyboard ? 'block' : 'none' }}>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </Box>
    </Stack>
  );
}
