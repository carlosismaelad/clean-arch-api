import IProductProps from "../../../shared/abstractions/IProductProps";
import formatsToBrazilianLocalDateTime from "utils/formatsToBrazilianLocalDateTime";

export class Product {
  public name: string;
  public description: string;
  public price: number;
  public active?: boolean;
  public createdAt?: string;
  public updatedAt?: string;

  constructor(props: IProductProps) {
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.active = props.active ?? true;
    this.createdAt = formatsToBrazilianLocalDateTime();
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}
