
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

// Get premium expiration date (for future implementation)
export const getPremiumExpiration = (): Date | null => {
  const expirationStr = localStorage.getItem('premiumExpiration');
  return expirationStr ? new Date(expirationStr) : null;
};

// Set premium expiration date (for future implementation)
export const setPremiumExpiration = (date: Date): void => {
  localStorage.setItem('premiumExpiration', date.toISOString());
};

// Clear premium status (for testing or account deletion)
export const clearPremiumStatus = (): void => {
  localStorage.removeItem('premiumUser');
  localStorage.removeItem('premiumExpiration');
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
