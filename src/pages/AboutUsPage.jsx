import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  Public as PublicIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import aboutUsImage from '../images/aboutus.avif';

const StatCard = ({ icon: Icon, value, label }) => (
  <Card elevation={3} sx={{ height: '100%' }}>
    <CardContent>
      <Stack spacing={2} alignItems="center">
        <Icon color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h4" component="div" color="primary" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </CardContent>
  </Card>
);

const AboutUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = [
    { icon: PeopleIcon, value: '15K', label: 'Happy Customers' },
    { icon: VisibilityIcon, value: '150K', label: 'Monthly Visitors' },
    { icon: PublicIcon, value: '15', label: 'Countries Worldwide' },
    { icon: BusinessIcon, value: '100+', label: 'Top Partners' }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center" direction={isMobile ? 'column-reverse' : 'row'}>
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography 
                variant="subtitle1" 
                color="primary" 
                fontWeight="bold" 
                gutterBottom
              >
                ABOUT COMPANY
              </Typography>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold"
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                ABOUT US
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}
              >
                We are dedicated to providing exceptional shopping experiences. Our platform combines 
                cutting-edge technology with user-friendly design to make your online shopping journey 
                seamless and enjoyable. With a focus on quality, convenience, and customer satisfaction, 
                we strive to be your preferred destination for all your shopping needs.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Get Quote Now
              </Button>
            </Box>
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={4}
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'perspective(1000px) rotateY(0deg)'
                }
              }}
            >
              <Box
                component="img"
                src={aboutUsImage}
                alt="Shopping Experience"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Additional Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                To revolutionize the online shopping experience by providing innovative solutions
                and exceptional customer service, making quality products accessible to everyone.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                To become the world's most trusted and preferred online shopping destination,
                known for our commitment to quality, innovation, and customer satisfaction.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsPage;
