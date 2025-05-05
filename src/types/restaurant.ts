
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  veg: boolean;
  popular?: boolean;
  category: string;
  spicyLevel?: "mild" | "medium" | "hot";
  allergens?: string[];
  preparationTime?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  cuisine: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  discount?: string;
  veg: boolean;
  address: string;
  description: string;
  priceRange?: string;
  contactNumber?: string;
  openingHours?: string;
  featuredDishes?: string[];
}
