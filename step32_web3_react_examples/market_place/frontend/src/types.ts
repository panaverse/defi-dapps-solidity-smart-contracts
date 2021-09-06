export type Product = {
    id: string;
    name: string;
    price: number;
    owner: string;
    purchased: boolean;
  };
  
  export type NetworId = {
    events: {};
    links: {};
    address: string;
    transactionHash: string;
  };