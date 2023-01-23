type TRoutesKey = "REDIS" | "KEYS";

type TRequestMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IReturnValue<Result = undefined> {
    status: number;
    message?: sring;
    result?: Result;
}

interface IPaginationValue<Data = undefined> {
    current_page: number;
    data: Data;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        active: boolean;
        label: string;
        url: string;
    }>;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
