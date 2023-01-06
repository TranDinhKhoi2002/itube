import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value || other.text || ''}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          sx={{
            width: '500px',
            '.css-14t01uy-MuiInputBase-root-MuiOutlinedInput-root': {
              borderRadius: '26px',
            },
          }}
        />
      )}
    />
  );
}
