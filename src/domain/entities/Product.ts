import { randomUUID } from "node:crypto";
import formatsToBrazilianLocalDate from "../../utils/formatsToBrazilianLocalDate";

export interface IProductProps {
  name: string;
  description: string;
  price: number;
  active: boolean;
}

export class Product {
  private _id: string;
  private props: IProductProps;
  private _createdAt: string;
  private _updatedAt?: string;

  constructor(props: IProductProps) {
    if (!props.name || typeof props.name !== "string")
      throw new Error("Nome inválido: o campo nome não pode ser vazio.");

    if (!props.description || typeof props.description !== "string")
      throw new Error(
        "Descrição inválida: o campo descrição não pode ser vazio.",
      );

    if (props.price === undefined || typeof props.price !== "number")
      throw new Error(
        "Preço inválido: o campo preço não pode ser vazio e não pode ser diferente de números.",
      );

    this._id = randomUUID();
    this.props = props;
    this._createdAt = formatsToBrazilianLocalDate();
    this.props.active = true;
  }

  get id() {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this._updatedAt = formatsToBrazilianLocalDate();
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
    this._updatedAt = formatsToBrazilianLocalDate();
  }

  get price(): number {
    return this.props.price;
  }

  set price(value: number) {
    this.props.price = value;
    this._updatedAt = formatsToBrazilianLocalDate();
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt(): string | undefined {
    return this._updatedAt;
  }

  get active(): boolean {
    return this.props.active;
  }

  set active(value: boolean) {
    this.props.active = value;
    this._updatedAt = formatsToBrazilianLocalDate();
  }
}
