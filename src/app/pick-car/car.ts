export interface Car {
    id: number;
    name: string;
    make: string;
    model: string;
    year: string;
    pprint: string;
}

export interface CarGasData {
    miles_driven: number | null;
    gallons_used: number | null;
    mpg: number | null;
    cost: number | null;
    date: string | null;
}