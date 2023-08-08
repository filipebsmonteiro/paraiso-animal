export interface Field {
  id: string;
  name: string;
  outerClass: string;
  type: string;
  placeholder: string;
  modelValue: any;
  validation: Array<Array<string>>,
  children: Array<Field> | null | undefined;
}