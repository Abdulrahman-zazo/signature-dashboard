// types.ts

export interface MainCategory {
  id: number;
  name: string;
}

export interface Feature {
  id: number;
  name: string;
}

export interface Direction {
  id: number;
  title: string;
}

export interface OwnershipType {
  id: number;
  name: string;
}

export interface OrderData {
  id: number;
  serial_number: string;
  advertisement_id: number;
  is_favorite: boolean;
  area: number;
  price: number;
  price_history: {
    price: number;
    //  history: any[]
  };
  publication_type: "rent" | "sale";
  rent_type: string;
  address: Address;
  ownership_type: OwnershipType;
  main_category: MainCategory;
  sub_category: SubCategory;
  description: string;
  age: number;
  map_points: string[];
  rooms_number: string;
  directions: Direction[];
  ownership_papers: { id: number; url: string }[];
  features: Feature[];
  rating: number;
  detailed_attributes: { key: string; value: string }[];
  medias_url: string[];
  medias: { id: number; type: string; size: number; url: string }[];
}

export interface IAllUsers {
  key: React.Key;
  id: string;
  address: {
    country: {
      name: string;
    };

    city: {
      name: string;
    };
    region: {
      id: string;
      name: string;
    };
    secondary_address: string;
  };
  user_type: "merchant" | "user";
  first_name: string;
  last_name: string;
  email: string;
  image_url: string;
  phone_number: string;
  status: number;
  personal_identification_papers: File[];
  roles: string[];
}

export interface OrderWrapper {
  id: number;
  serial_number: string;
  date: string;
  status: string;
  reply: string;
  user: IAllUsers;
  type: string;
  order: OrderData;
}

export interface Address {
  country: { id: number; name: string };
  city: { id: number; name: string };
  region: { id: number; name: string };
  secondary_address: string;
}

export interface SubCategory {
  id: number;
  name: string;
}

export interface OrderItem {
  id: number;
  serial_number: string;
  date: string;
  status: string;
  reply: string;
  type: string;
  user: IAllUsers;
  order: {
    id: number;
    area: number;
    price: number;
    ownership_type?: OwnershipType;
    sub_category?: SubCategory;
    features?: Feature[];
    address: Address;
  };
}

export interface Filters {
  subCategory: string;
  priceRange: [number, number];
  areaRange: [number, number];
  ownershipType: string;
  features: string[];
  country: string;
  city: string;
  region: string;
}
