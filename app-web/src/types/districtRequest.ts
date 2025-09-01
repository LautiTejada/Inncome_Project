
export interface CreateDistrictBody {
    companyName: string;
    cuit: string;
    noRepetition: boolean;
    country: string;
    province: string;
    locality: string;
    address: string;
    addressNumber: string;
    email: string;
    phoneNumber: string;
    amountMinimum: number;
}

export interface CreateQrBody {
    districtCuit: string;
    productIds: number[];
}
