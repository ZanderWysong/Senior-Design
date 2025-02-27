import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  Paper,
} from '@mui/material';
import { Camera, Save, RefreshCw, Copy, Users } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { RootState } from '../store';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  role: 'admin' | 'member';
  status: 'active' | 'inactive';
}

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'admin';
  
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [orgCode, setOrgCode] = useState({
    code: 'TDS-ABC-123',
    createdAt: '2024-03-15',
    expiresAt: '2024-04-15',
    status: 'active' as const
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      joinedAt: '2024-03-10',
      role: 'member',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      joinedAt: '2024-03-08',
      role: 'member',
      status: 'active'
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'admin@tds.com',
      joinedAt: '2024-03-01',
      role: 'admin',
      status: 'active'
    }
  ]);

  const [newCodeDialog, setNewCodeDialog] = useState(false);

  const handleSaveProfile = () => {
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleChangePassword = () => {
    setSuccessMessage('Password changed successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const generateOrgCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'TDS-';
    for (let i = 0; i < 3; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    code += '-';
    for (let i = 0; i < 3; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleCreateCode = () => {
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 30);

    const newCode = {
      code: generateOrgCode(),
      createdAt: today.toISOString().split('T')[0],
      expiresAt: expiryDate.toISOString().split('T')[0],
      status: 'active' as const
    };

    setOrgCode(newCode);
    setNewCodeDialog(false);
    setSuccessMessage('New organization code generated successfully! Previous code has been deactivated.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setSuccessMessage('Code copied to clipboard!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { color: '#16a34a', bg: '#dcfce7' };
      case 'inactive':
        return { color: '#dc2626', bg: '#fee2e2' };
      default:
        return { color: '#64748b', bg: '#f1f5f9' };
    }
  };

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Profile Settings
        </Typography>

        {successMessage && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              borderRadius: '12px',
              '& .MuiAlert-message': { fontSize: '0.95rem' }
            }}
          >
            {successMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Profile Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                      fontSize: '2rem',
                      fontWeight: 600,
                    }}
                  >
                    {formData.name.charAt(0)}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      bgcolor: 'white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    <Camera size={18} />
                  </IconButton>
                </Box>
                <Box sx={{ ml: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Profile Photo
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click the camera icon to update your photo
                  </Typography>
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />

              <Button
                variant="contained"
                startIcon={<Save size={18} />}
                onClick={handleSaveProfile}
                sx={{
                  background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
                  },
                  borderRadius: '10px',
                  textTransform: 'none',
                }}
              >
                Save Changes
              </Button>
            </Card>
          </Grid>

          {/* Password Change */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Change Password
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Ensure your account is using a long, random password to stay secure.
              </Typography>

              <TextField
                fullWidth
                type="password"
                label="Current Password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />

              <Button
                variant="contained"
                onClick={handleChangePassword}
                sx={{
                  background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
                  },
                  borderRadius: '10px',
                  textTransform: 'none',
                }}
              >
                Update Password
              </Button>
            </Card>
          </Grid>

          {/* Organization Management (Admin Only) */}
          {isAdmin && (
            <>
              {/* Organization Code */}
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, borderRadius: '16px', height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Organization Code
                      </Typography>
                      <Typography color="text.secondary">
                        Share this code with team members to join
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<RefreshCw size={18} />}
                      onClick={() => setNewCodeDialog(true)}
                      sx={{
                        background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
                        },
                        borderRadius: '10px',
                        textTransform: 'none',
                      }}
                    >
                      Generate New
                    </Button>
                  </Box>

                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      borderRadius: '12px',
                      bgcolor: 'rgba(37,99,235,0.05)',
                      border: '1px solid rgba(37,99,235,0.1)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          color: '#2563eb'
                        }}
                      >
                        {orgCode.code}
                      </Typography>
                      <Tooltip title="Copy code">
                        <IconButton
                          size="small"
                          onClick={() => handleCopyCode(orgCode.code)}
                          sx={{ color: '#2563eb' }}
                        >
                          <Copy size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Expires: {orgCode.expiresAt}
                      </Typography>
                      <Chip
                        label={orgCode.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor('active').bg,
                          color: getStatusColor('active').color,
                          fontWeight: 500,
                          textTransform: 'capitalize',
                        }}
                      />
                    </Box>
                  </Paper>
                </Card>
              </Grid>

              {/* Team Members */}
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: '16px' }}>
                  <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Users size={24} className="text-blue-600" />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Team Members
                      </Typography>
                      <Typography color="text.secondary">
                        {teamMembers.length} members in your organization
                      </Typography>
                    </Box>
                  </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Joined</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teamMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                                    fontSize: '0.875rem',
                                  }}
                                >
                                  {member.name.charAt(0)}
                                </Avatar>
                                <Typography variant="subtitle2">
                                  {member.name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                              <Chip
                                label={member.role}
                                size="small"
                                sx={{
                                  bgcolor: member.role === 'admin' ? 'rgba(37,99,235,0.1)' : 'rgba(79,70,229,0.1)',
                                  color: member.role === 'admin' ? '#2563eb' : '#4f46e5',
                                  fontWeight: 500,
                                  textTransform: 'capitalize',
                                }}
                              />
                            </TableCell>
                            <TableCell>{member.joinedAt}</TableCell>
                            <TableCell>
                              <Chip
                                label={member.status}
                                size="small"
                                sx={{
                                  bgcolor: getStatusColor(member.status).bg,
                                  color: getStatusColor(member.status).color,
                                  fontWeight: 500,
                                  textTransform: 'capitalize',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      {/* Generate New Code Dialog */}
      <Dialog 
        open={newCodeDialog} 
        onClose={() => setNewCodeDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Generate New Organization Code
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            This will generate a new organization code and deactivate the current one. The new code will be valid for 30 days.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={() => setNewCodeDialog(false)}
            sx={{ 
              borderRadius: '10px',
              textTransform: 'none'
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateCode}
            startIcon={<RefreshCw size={18} />}
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
              },
              borderRadius: '10px',
              textTransform: 'none',
            }}
          >
            Generate Code
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Profile;