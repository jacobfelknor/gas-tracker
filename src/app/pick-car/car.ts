export interface Car {
    id: number | null;
    name: string | null;
    make: string | null;
    model: string | null;
    year: string | null;
    pprint: string | null;
}

export interface CarGasData {
    miles_driven: number | null;
    gallons_used: number | null;
    mpg: number | null;
    cost: number | null;
    date: string | null;
}