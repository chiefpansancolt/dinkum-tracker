interface BookData {
  aquiredFrom: string;
  requirements: string;
  buyingPrice: number;
  sellingPrice: number;
}

export interface Book {
  name: string;
  img: string;
  details: BookData[];
}

export interface BooksTabProps {
  books: {
    [key: string]: boolean;
  };
}

export interface BooksTabHandle {
  saveBooks: () => boolean;
}
