export type Course = {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  isOnline: boolean;
  location?: string;
  image:string;
  price?: number 

  };
  
  export type Category = {
    id: number;
    title: string;
    image: string;
    description: string;
  };
  