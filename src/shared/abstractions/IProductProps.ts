export default interface IProductProps {
  name: string;
  description: string;
  price: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
