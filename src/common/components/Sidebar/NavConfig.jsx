import { Home, MusicVideo, Subscriptions, VideoLibrary } from '@mui/icons-material';

const navConfig = [
  { title: 'Trang chủ', path: '/', icon: <Home /> },
  { title: 'Shorts', path: '/shorts', icon: <MusicVideo /> },
  { title: 'Kênh đăng ký', path: '/subscriptions', icon: <Subscriptions /> },
  { title: 'Thư viện', path: '/library', icon: <VideoLibrary /> },
];

export default navConfig;
