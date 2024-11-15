import { randomUUID } from "node:crypto";
import IProductProps from "../../../shared/abstractions/IProductProps";

export class Product {
  public id: string;
  public name: string;
  public description?: string;
  public price?: number;
  public active: boolean;
  public createdAt?: string;
  public updatedAt?: string;

  constructor(props: IProductProps) {
    this.id = randomUUID();
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.active = props.active ?? true;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}
