
export const getFallbackImage = (name: string) => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('cheese') || nameLower.includes('pizza')) {
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop';
  } else if (nameLower.includes('biryani') || nameLower.includes('rice')) {
    return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop';
  } else if (nameLower.includes('chicken') || nameLower.includes('meat')) {
    return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop';
  } else if (nameLower.includes('asian') || nameLower.includes('fusion')) {
    return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop';
  } else if (nameLower.includes('south indian') || nameLower.includes('madras') || nameLower.includes('chennai')) {
    return 'https://images.unsplash.com/photo-1630383249896-52bdbd3372cb?w=800&auto=format&fit=crop';
  } else if (nameLower.includes('bengaluru') || nameLower.includes('bangalore')) {
    return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop';
  }
  
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop';
};
