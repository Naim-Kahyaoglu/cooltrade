// Convert Turkish characters to their non-accented equivalents
export const normalizeText = (text) => {
  return text
    .replace(/İ/g, 'I')
    .replace(/ı/g, 'i')
    .replace(/Ş/g, 'S')
    .replace(/ş/g, 's')
    .replace(/Ğ/g, 'G')
    .replace(/ğ/g, 'g')
    .replace(/Ü/g, 'U')
    .replace(/ü/g, 'u')
    .replace(/Ö/g, 'O')
    .replace(/ö/g, 'o')
    .replace(/Ç/g, 'C')
    .replace(/ç/g, 'c');
};

// Format title properly
export const formatTitle = (title) => {
  // First normalize to handle Turkish characters
  const normalizedTitle = normalizeText(title.toLowerCase());
  // Then capitalize first letter
  return normalizedTitle.charAt(0).toUpperCase() + normalizedTitle.slice(1);
};

// Format price
export const formatPrice = (price) => {
  return price.toFixed(2);
}; 