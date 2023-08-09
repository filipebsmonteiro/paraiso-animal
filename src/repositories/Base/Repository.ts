export interface RepositoryInterface {
  fetch(params: any): Promise<any>
  find(params: any): Promise<any>
  post(params: any): Promise<any>
  put(id: string|number, params: any): Promise<any>
  delete(id: string|number): Promise<any>
}
