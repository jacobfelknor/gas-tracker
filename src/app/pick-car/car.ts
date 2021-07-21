export interface Car {
    id: number;
    name: string;
    make: string;
    model: string;
    year: string;
    pprint: string;
}

export interface CarGasData {
    miles_driven: number;
    gallons_used: number;
    mpg: number;
    cost: number;
    date: string;
}