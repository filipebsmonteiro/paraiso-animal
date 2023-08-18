import { Model } from "@/models/Base/Model"

export interface RepositoryInterface {
  model: Model;
  path: string;
  fetch(params: any): Promise<any>;
  find(params: any): Promise<any>;
  post(params: any): Promise<any>;
  put(id: string|number, params: any): Promise<any>;
  delete(id: string|number): Promise<any>;
}
