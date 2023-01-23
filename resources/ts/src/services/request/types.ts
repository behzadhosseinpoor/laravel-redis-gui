export type TApiRoutes = {
    [key in TRoutesKey]: {
        url: string;
        methods: Array<TRequestMethods>;
    };
};
