import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FiberManualRecord as DotIcon
} from '@mui/icons-material';

const Slider = ({ images }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      height: 400,
      overflow: 'hidden'
    }}>
      {/* Images */}
      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image.imgPath || image}
          alt={image.title || `Slide ${index + 1}`}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 500ms ease-in-out',
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: theme.spacing(2),
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: alpha(theme.palette.common.white, 0.8),
          '&:hover': {
            bgcolor: alpha(theme.palette.common.white, 0.9),
          }
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: theme.spacing(2),
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: alpha(theme.palette.common.white, 0.8),
          '&:hover': {
            bgcolor: alpha(theme.palette.common.white, 0.9),
          }
        }}
      >
        <KeyboardArrowRight />
      </IconButton>

      {/* Dots Navigation */}
      <Box
        sx={{
          position: 'absolute',
          bottom: theme.spacing(2),
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}
      >
        {images.map((_, index) => (
          <IconButton
            key={index}
            size="small"
            onClick={() => handleDotClick(index)}
            sx={{
              color: index === currentIndex ? 'primary.main' : 'common.white',
              '&:hover': {
                color: 'primary.light'
              }
            }}
          >
            <DotIcon fontSize="small" />
          </IconButton>
        ))}
      </Box>

      {/* Optional Title */}
      {images[currentIndex].title && (
        <Paper
          elevation={0}
          sx={{
            position: 'absolute',
            bottom: theme.spacing(8),
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            px: 2,
            py: 1,
            borderRadius: 1
          }}
        >
          <Typography variant="h6">
            {images[currentIndex].title}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Slider;

