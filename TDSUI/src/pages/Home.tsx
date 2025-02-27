import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { Code2, Users, BookOpen, Cloud, ArrowRight, Blocks, Zap, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Blocks size={32} className="text-blue-600" />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                TDS API
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="contained" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          pt: { xs: 15, md: 20 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" maxWidth="800px" mx="auto">
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2
              }}
            >
              Build and Manage APIs with Confidence
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                mb: 5,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6
              }}
            >
              Create, test, and document your APIs with our powerful platform. No coding required.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight />}
                onClick={() => navigate('/signup')}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
                  }
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/docs')}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: '12px'
                }}
              >
                View Documentation
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            right: '0',
            transform: 'translateY(-50%)',
            zIndex: 0,
            opacity: 0.1,
            pointerEvents: 'none'
          }}
        >
          <Grid container spacing={4}>
            {Array.from({ length: 20 }).map((_, i) => (
              <Grid item xs={3} key={i}>
                <Box
                  sx={{
                    height: '100px',
                    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                    borderRadius: '12px',
                    transform: `rotate(${Math.random() * 45}deg)`,
                    opacity: Math.random() * 0.5 + 0.5
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {[
            {
              icon: <Zap size={32} />,
              title: 'Lightning Fast Development',
              description: 'Build and deploy APIs in minutes with our intuitive visual interface.'
            },
            {
              icon: <Shield size={32} />,
              title: 'Enterprise Security',
              description: 'Bank-grade security with automatic encryption and access controls.'
            },
            {
              icon: <BookOpen size={32} />,
              title: 'Auto Documentation',
              description: 'Generate comprehensive API documentation automatically.'
            },
            {
              icon: <Users size={32} />,
              title: 'Team Collaboration',
              description: 'Work together seamlessly with built-in version control and sharing.'
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  p: 4,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" maxWidth="600px" mx="auto">
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of developers who are building better APIs faster.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                },
                py: 1.5,
                px: 4,
                fontSize: '1.1rem'
              }}
            >
              Start Building Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;