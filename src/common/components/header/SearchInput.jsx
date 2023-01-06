import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import RHFTextField from '../form/RHFTextField';
import FormProvider from '../form/FormProvider';

export default function SearchInput() {
  const SearchSchema = Yup.object().shape({
    enteredText: Yup.string(),
  });

  const defaultValues = {
    enteredText: '',
  };

  const methods = useForm({
    resolver: yupResolver(SearchSchema),
    defaultValues,
  });

  const { handleSubmit, getValues } = methods;

  const onSubmit = async () => {
    const { enteredText } = getValues();
    console.log(enteredText);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="enteredText" label="Tìm kiếm" />
    </FormProvider>
  );
}
