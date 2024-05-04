export type AuthPageType = {
    id: number;
    for: "name"
    | "city"
    | "sex"
    | "age"
    | "activity"
    | "height"
    | "weight"
    | "googlefit";
}

export const authPages: AuthPageType[] = [
    {
        id: 1,
        for: "name"
    },
    {
        id: 2,
        for: "city"
    },
    {
        id: 3,
        for: "sex",
    },
    {
        id: 4,
        for: "age"
    },
    {
        id: 5,
        for: "activity"
    },
    {
        id: 6,
        for: "height"
    },
    {
        id: 7,
        for: "weight"
    },
    {
        id: 8,
        for: "googlefit"
    }
] as const