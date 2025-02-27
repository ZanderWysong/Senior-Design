import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  LogOut,
  User,
} from 'lucide-react';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

// Import Triode logo
const TRIODE_LOGO = 'https://example.com/path-to-triode-logo.png'; // Replace with actual logo URL

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          color: 'text.primary',
        }}
        elevation={0}
      >
        <Toolbar sx={{ gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            <img src={TRIODE_LOGO} alt="Triode Data Systems" height="32" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
            >
              <Avatar 
                sx={{ 
                  width: 35, 
                  height: 35, 
                  background: 'linear-gradient(135deg, #F68B1F 0%, #d97a1c 100%)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                {user?.email?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '12px',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {user?.email}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => navigate('/profile')} sx={{ py: 1.5 }}>
          <User size={18} style={{ marginRight: '8px' }} />
          Profile Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
          <LogOut size={18} style={{ marginRight: '8px' }} />
          Logout
        </MenuItem>
      </Menu>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          minHeight: '100vh',
          background: '#f8fafc',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;