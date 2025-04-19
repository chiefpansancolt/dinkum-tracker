interface BookData {
  aquiredFrom: string;
  requirements: string;
  buyingPrice: number;
  sellingPrice: number;
}

export interface Book {
  id: string;
  name: string;
  img: string;
  details: BookData[];
}

export interface BooksTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface BooksTabHandle {
  saveBooks: () => boolean;
}
