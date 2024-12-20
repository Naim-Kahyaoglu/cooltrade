// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  IconButton,
  Divider,
  Card,
  CardContent,
  useTheme,
  alpha,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Fax as FaxIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Send as SendIcon
} from '@mui/icons-material';
import contactBackground from '../images/contactbackgorund.avif';

const ContactInfoCard = ({ icon: Icon, title, content }) => (
  <Card elevation={3} sx={{ height: '100%', bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon color="primary" sx={{ fontSize: 32, mr: 1 }} />
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        {content}
      </Typography>
    </CardContent>
  </Card>
);

const ContactPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setOpenSnackbar(true);
  };

  const contactInfo = [
    {
      icon: LocationIcon,
      title: 'Address',
      content: '75000 Paris, France'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      content: '+451 215 215'
    },
    {
      icon: FaxIcon,
      title: 'Fax',
      content: '+451 215 215'
    },
    {
      icon: EmailIcon,
      title: 'Email',
      content: 'contact@cooltrade.com'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(
          theme.palette.primary.dark,
          0.8
        )}), url(${contactBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We'd love to hear from you. Please fill out this form.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{ mt: 3 }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <ContactInfoCard {...info} />
                </Grid>
              ))}
            </Grid>

            {/* Map */}
            <Paper
              elevation={4}
              sx={{
                mt: 3,
                height: 300,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Map will be integrated here
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;