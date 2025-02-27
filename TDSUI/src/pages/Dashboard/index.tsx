import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import {
  Users,
  PlayCircle,
  FileText,
  Activity,
  Settings,
  Bell,
  Shield,
  Key,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { RootState } from '../../store';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [inviteDialogOpen, setInviteDialogOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');

  const stats = [
    {
      title: 'Total APIs',
      value: '12',
      icon: <Activity size={24} />,
      color: '#2563eb',
    },
    {
      title: 'Team Members',
      value: '48',
      icon: <Users size={24} />,
      color: '#16a34a',
    },
    {
      title: 'API Usage',
      value: '1.2M',
      icon: <Activity size={24} />,
      color: '#ea580c',
    },
    {
      title: 'Active Keys',
      value: '24',
      icon: <Key size={24} />,
      color: '#7c3aed',
    },
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Admin', status: 'Active' },
    { name: 'Mike Chen', email: 'mike@example.com', role: 'Member', status: 'Active' },
    { name: 'Lisa Brown', email: 'lisa@example.com', role: 'Member', status: 'Pending' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography color="text.secondary">
            Manage your team, APIs, and monitor system performance
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Users size={20} />}
          onClick={() => setInviteDialogOpen(true)}
        >
          Invite Team Member
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 0.5 }}>
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Team Management */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.email}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={member.role}
                            color={member.role === 'Admin' ? 'primary' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={member.status}
                            color={member.status === 'Active' ? 'success' : 'warning'}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button size="small">Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  All systems operational
                </Alert>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>API Gateway</Typography>
                  <Chip size="small" label="Operational" color="success" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Authentication Service</Typography>
                  <Chip size="small" label="Operational" color="success" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Database</Typography>
                  <Chip size="small" label="Operational" color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Alerts
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  {
                    type: 'info',
                    message: 'New API version deployed successfully',
                    time: '2 hours ago',
                  },
                  {
                    type: 'warning',
                    message: 'High API usage detected',
                    time: '5 hours ago',
                  },
                  {
                    type: 'error',
                    message: 'Failed login attempts detected',
                    time: '1 day ago',
                  },
                ].map((alert, index) => (
                  <Alert
                    key={index}
                    severity={alert.type as 'info' | 'warning' | 'error'}
                    sx={{ mb: 2 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">{alert.message}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.time}
                      </Typography>
                    </Box>
                  </Alert>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)}>
        <DialogTitle>Invite Team Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setInviteDialogOpen(false);
              setInviteEmail('');
            }}
            variant="contained"
          >
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const MemberDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'API Calls Today',
      value: '2.4k',
      icon: <Activity size={24} />,
      color: '#2563eb',
    },
    {
      title: 'Active APIs',
      value: '8',
      icon: <PlayCircle size={24} />,
      color: '#16a34a',
    },
    {
      title: 'API Keys',
      value: '3',
      icon: <Key size={24} />,
      color: '#ea580c',
    },
  ];

  const apiKeys = [
    { name: 'Production Key', status: 'Active', created: '2024-02-15', lastUsed: '2024-03-10' },
    { name: 'Development Key', status: 'Active', created: '2024-02-20', lastUsed: '2024-03-11' },
    { name: 'Testing Key', status: 'Inactive', created: '2024-01-10', lastUsed: '2024-02-28' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Dashboard
        </Typography>
        <Typography color="text.secondary">
          Monitor your API usage and manage your access keys
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 0.5 }}>
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PlayCircle size={20} />}
                  onClick={() => navigate('/playground')}
                >
                  API Playground
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FileText size={20} />}
                  onClick={() => navigate('/docs')}
                >
                  View Documentation
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Key size={20} />}
                  onClick={() => navigate('/settings')}
                >
                  Manage API Keys
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* API Keys */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Keys
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Last Used</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.name}>
                        <TableCell>{key.name}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={key.status}
                            color={key.status === 'Active' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>{key.created}</TableCell>
                        <TableCell>{key.lastUsed}</TableCell>
                        <TableCell align="right">
                          <Button size="small">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  {
                    action: 'API Call',
                    description: 'GET /api/users - 200 OK',
                    time: '2 minutes ago',
                  },
                  {
                    action: 'Documentation',
                    description: 'Viewed Authentication API docs',
                    time: '1 hour ago',
                  },
                  {
                    action: 'API Key',
                    description: 'Generated new API key for development',
                    time: '2 days ago',
                  },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: index !== 2 ? '1px solid #e5e7eb' : 'none',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        {activity.action}
                        <Chip
                          label={activity.time}
                          size="small"
                          sx={{ ml: 1, bgcolor: 'rgba(0,0,0,0.04)' }}
                        />
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {activity.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'admin';

  return (
    <DashboardLayout>
      {isAdmin ? <AdminDashboard /> : <MemberDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;