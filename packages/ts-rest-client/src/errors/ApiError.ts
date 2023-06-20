export class ApiError extends Error {
  constructor(message: string, errors = []) {
    super(message);

    this.errors = errors;
  }

  private errors: any[];

  public getErrors(): any[] {
    return this.errors;
  }
}
