  
  export interface ILoginCredentials {
    identifier: string;
    password: string;
  }

  export interface IAuthToken {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  }
  
  export interface IRegisterRequest {
    username: string;
    nombre: string;
    apellido: string;
    documento: string;
    password: string;
    email: string;
    enabled: boolean;
    establecimientoId: number;
    rolId: string;
    manzana?: string;
    lote?: string;
  }
  
  export interface IRegisterResponse {
    message: string;
    timestamp: number;
  }
  // export interface IAuthToken {
  //   accessToken: string;
  //   refreshToken: string;
  //   tokenType: string;
  //   expiresIn: number;
  //   username: string;
  //   roles: string[];
  // }