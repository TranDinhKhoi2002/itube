import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'src/constants';
import { Typography } from '@mui/material';

const withPublicRoute = (WrappedComponent) => {
  return function PublicRoute() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
      setMounted(true);
    }, []);

    if (mounted) {
      if (typeof window !== 'undefined') {
        const token = Cookies.get(TOKEN_KEY);

        if (token) {
          router.back();
          return <Typography>Loading...</Typography>;
        }
      }

      return <WrappedComponent />;
    }
    return null;
  };
};

export default withPublicRoute;
