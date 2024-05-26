export interface User {
  id: number;
  name: string;
  email: string;
  profession: string;
  age: number;
  created: string;
  location: {
    city: string;
    country: string;
  };
  avatar: {
    url?: string;
  };
}
