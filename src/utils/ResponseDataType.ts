export interface ResponseDataType<K extends string, T extends any> {
  data: {
    [Key in K]: T;
  };
}

export interface ResponseGeneralDataType<T extends any> {
  data: T;
}
