import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Stack,
  Tooltip,
  Zoom
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import emreProfile from '../images/emresahiner.webp';
import gokhanProfile from '../images/gokhanprofil.webp';
import naimProfile from '../images/naimprofil.jpg';

const TeamMemberCard = ({ member }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={4}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={member.image}
        alt={member.name}
        sx={{
          height: 300,
          objectFit: 'cover',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
          {member.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          {member.role}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {member.bio}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'center', p: 2 }}>
        <Stack direction="row" spacing={1}>
          <Tooltip title="LinkedIn Profile" TransitionComponent={Zoom} arrow>
            <IconButton
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub Profile" TransitionComponent={Zoom} arrow>
            <IconButton color="inherit">
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Twitter Profile" TransitionComponent={Zoom} arrow>
            <IconButton color="primary">
              <TwitterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email" TransitionComponent={Zoom} arrow>
            <IconButton color="error">
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardActions>
    </Card>
  );
};

const TeamPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const teamMembers = [
    {
      name: "Emre Şahiner",
      role: "Project Owner",
      image: emreProfile,
      linkedin: "https://www.linkedin.com/in/emresahiner/",
      bio: "Experienced project owner with a passion for creating innovative solutions and leading teams to success."
    },
    {
      name: "Gökhan Özdemir",
      role: "Scrum Master",
      image: gokhanProfile,
      linkedin: "https://www.linkedin.com/in/gokhan-ozdemir/",
      bio: "Dedicated Scrum Master focused on facilitating team collaboration and ensuring project success through agile methodologies."
    },
    {
      name: "Naim Kahyaoglu",
      role: "Full Stack Developer",
      image: naimProfile,
      linkedin: "https://www.linkedin.com/in/naimkahyaoglu/",
      bio: "Versatile Full Stack Developer with expertise in both frontend and backend technologies, creating seamless user experiences."
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3
            }}
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6
            }}
          >
            A dedicated team of professionals working together to bring you the best online shopping experience.
          </Typography>
          <Divider sx={{ maxWidth: '200px', mx: 'auto', mb: 6 }} />
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TeamMemberCard member={member} />
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={8}>
          <Typography variant="h5" gutterBottom color="primary">
            Want to Join Our Team?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We're always looking for talented individuals to join our team.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            View Open Positions
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TeamPage;

