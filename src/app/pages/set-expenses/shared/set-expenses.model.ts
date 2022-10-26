import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class SetExpense extends BaseResourceModel {
  constructor(
    public override id?: number,
    public name?: string,
    public cpfCnpj?: string,
    public description?: string
  ) {
    super();
  }
  static fromJson(json: any): SetExpense {
    return Object.assign(new SetExpense, json);
  }
}
