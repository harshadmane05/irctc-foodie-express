
/**
 * Premium status management utility
 */

// Check if user has premium status
export const checkPremiumStatus = (): boolean => {
  const premiumStatus = localStorage.getItem('premiumUser');
  return premiumStatus === 'true';
};

// Set premium status
export const setPremiumStatus = (status: boolean): void => {
  localStorage.setItem('premiumUser', status.toString());
};

// Get premium expiration date
export const getPremiumExpiration = (): Date | null => {
  const expirationStr = localStorage.getItem('premiumExpiration');
  return expirationStr ? new Date(expirationStr) : null;
};

// Set premium expiration date
export const setPremiumExpiration = (date: Date): void => {
  localStorage.setItem('premiumExpiration', date.toISOString());
};

// Clear premium status
export const clearPremiumStatus = (): void => {
  localStorage.removeItem('premiumUser');
  localStorage.removeItem('premiumExpiration');
  localStorage.removeItem('premiumPlan');
};

// Get premium plan type
export const getPremiumPlan = (): 'monthly' | 'yearly' | null => {
  const plan = localStorage.getItem('premiumPlan');
  return (plan === 'monthly' || plan === 'yearly') ? plan as 'monthly' | 'yearly' : null;
};

// Set premium plan type
export const setPremiumPlan = (plan: 'monthly' | 'yearly'): void => {
  localStorage.setItem('premiumPlan', plan);
};

// Check if the premium subscription is about to expire (within 7 days)
export const isSubscriptionAboutToExpire = (): boolean => {
  const expiration = getPremiumExpiration();
  if (!expiration) return false;
  
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 && diffDays <= 7;
};

// Get days remaining until expiration
export const getDaysRemaining = (): number | null => {
  const expiration = getPremiumExpiration();
  if (!expiration) return null;
  
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

// Premium filter types
export type PremiumFilterType = 'all' | 'premium' | 'regular';

// Check if a restaurant has premium items
export const hasPremiumItems = (restaurantId: string): boolean => {
  // This would typically be a backend check, but we're mocking it here
  // Mock logic: restaurants with even IDs have premium items
  return parseInt(restaurantId.replace(/\D/g, '') || '0') % 2 === 0;
};
