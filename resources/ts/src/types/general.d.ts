type TAppComponentInput<T> = AppProps<T>;

type TAppComponent<T = any> = ({
    Component,
    pageProps,
}: TAppComponentInput<T>) => JSX.Element;

declare global {
    interface Window {
        RedisGUI: {
            path: string;
            connections: Array<string>;
        };
    }
}
