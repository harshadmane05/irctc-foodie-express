
export const getFallbackImage = (name: string) => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('cheese') || nameLower.includes('pizza')) {
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('biryani') || nameLower.includes('rice')) {
    return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('chicken') || nameLower.includes('meat')) {
    return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('asian') || nameLower.includes('fusion')) {
    return 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('madras') || nameLower.includes('chennai')) {
    return 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('bengaluru') || nameLower.includes('bangalore')) {
    return 'https://images.unsplash.com/photo-1624836017867-b8c7ea3a3417?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('south indian') || nameLower.includes('dosa') || nameLower.includes('idli')) {
    return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('north indian') || nameLower.includes('curry')) {
    return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('seafood') || nameLower.includes('fish')) {
    return 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=800&auto=format&fit=crop&q=90';
  } else if (nameLower.includes('drink') || nameLower.includes('beverage')) {
    return 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&auto=format&fit=crop&q=90';
  }
  
  // Higher quality default fallback
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=90';
};
