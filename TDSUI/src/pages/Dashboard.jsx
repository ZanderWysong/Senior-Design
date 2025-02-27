import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  InputAdornment,
  Select,
  FormControl,
  MenuItem,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Plus,
  Search,
  Calendar,
  PlayCircle,
  Zap,
  Filter,
  MoreVertical,
  Star,
  Clock,
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'E-commerce API',
      description: 'RESTful API for an e-commerce platform with product, order, and user management.',
      createdAt: '2024-03-10',
      status: 'active',
      favorite: true,
    },
    {
      id: '2',
      name: 'Authentication Service',
      description: 'Centralized authentication service with OAuth2 and JWT support.',
      createdAt: '2024-03-08',
      status: 'draft',
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      description: 'Real-time analytics API for tracking user behavior and system metrics.',
      createdAt: '2024-03-05',
      status: 'active',
      favorite: true,
    },
  ]);

  const [newProjectDialog, setNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({ 
    name: '', 
    description: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState('grid');

  const handleCreateProject = () => {
    const project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
    };
    setProjects([project, ...projects]);
    setNewProject({ name: '', description: '' });
    setNewProjectDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { color: '#16a34a', bg: '#dcfce7' };
      case 'draft':
        return { color: '#F68B1F', bg: '#fff7ed' };
      default:
        return { color: '#6D6E71', bg: '#f1f5f9' };
    }
  };

  const toggleFavorite = (projectId) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, favorite: !project.favorite }
        : project
    ));
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleProjectAction = (projectId) => {
    sessionStorage.setItem('currentProjectId', projectId);
    navigate('/playground');
  };

  return (
    <DashboardLayout>
      <Box sx={{ px: 4, py: 5 }}>
        {/* Header Section */}
        <Box 
          sx={{ 
            mb: 6,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              My Projects
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              Manage and organize your API projects
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setNewProjectDialog(true)}
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
              },
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
            }}
          >
            New Project
          </Button>
        </Box>

        {/* Filters Section */}
        <Paper 
          elevation={0}
          sx={{ 
            mb: 4,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            p: 2,
            borderRadius: '16px',
            border: '1px solid rgba(37, 99, 235, 0.1)',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <TextField
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'white',
                '&:hover': {
                  '& fieldset': {
                    borderColor: '#2563eb',
                  }
                },
                '&.Mui-focused': {
                  '& fieldset': {
                    borderColor: '#2563eb',
                  }
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} style={{ color: '#2563eb' }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 180 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{ 
                borderRadius: '12px',
                backgroundColor: 'white',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                  }
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                  }
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Filter size={18} style={{ color: '#2563eb' }} />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Projects</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  borderRadius: '20px',
                  border: '1px solid rgba(37, 99, 235, 0.1)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(37, 99, 235, 0.1)',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                  }
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                      }}
                    >
                      <Zap size={24} style={{ color: '#2563eb' }} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => toggleFavorite(project.id)}
                        sx={{ 
                          color: project.favorite ? '#f59e0b' : '#94a3b8',
                          '&:hover': { color: '#f59e0b' }
                        }}
                      >
                        <Star size={20} fill={project.favorite ? '#f59e0b' : 'none'} />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVertical size={20} />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(project.status).bg,
                        color: getStatusColor(project.status).color,
                        fontWeight: 600,
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>

                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      mb: 4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '42px',
                      lineHeight: 1.5,
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayCircle size={18} />}
                      onClick={() => handleProjectAction(project.id)}
                      sx={{ 
                        background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
                        },
                        borderRadius: '10px',
                        textTransform: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      Open Project
                    </Button>
                    <Tooltip title="Created Date">
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          color: 'text.secondary',
                          fontSize: '0.875rem',
                        }}
                      >
                        <Clock size={16} />
                        {project.createdAt}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* New Project Dialog */}
        <Dialog 
          open={newProjectDialog} 
          onClose={() => setNewProjectDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Create New Project
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setNewProjectDialog(false)}
              sx={{ 
                borderRadius: '10px',
                px: 3,
                color: 'text.secondary',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateProject}
              disabled={!newProject.name}
              sx={{
                background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
                },
                borderRadius: '10px',
                px: 3,
                textTransform: 'none',
              }}
            >
              Create Project
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;