// Map gender codes to normalized values
export const getGenderFromCode = (code) => {
  switch(code) {
    case 'k': return 'kadin';
    case 'e': return 'erkek';
    case 'E': return 'erkek';
    case 'm': return 'erkek';
    case 'M': return 'erkek';
    case 'ç': return 'cocuk';
    case 'c': return 'cocuk';
    default: return code;
  }
};

// Get display name for gender
export const getGenderDisplayName = (gender) => {
  switch(gender) {
    case 'kadin': return 'Kadın';
    case 'erkek': return 'Erkek';
    case 'cocuk': return 'Çocuk';
    default: return gender;
  }
}; 
