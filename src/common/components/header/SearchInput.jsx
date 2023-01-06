import { Box, Button, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
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
};

export default function SearchInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [enteredValue, setEnteredValue] = useState('');
  const [layout, setLayout] = useState('default');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef();

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleClearInput = () => {
    setEnteredValue('');
  };

  const onChange = (input) => {
    setEnteredValue(input);
    console.log('Input changed', input);
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log('Button pressed', button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  return (
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
      <Button sx={styles.secondSearchButton}>
        <Iconify icon="material-symbols:search-rounded" width={25} height={25} />
      </Button>
      <Button style={styles.micButton}>
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
  );
}
