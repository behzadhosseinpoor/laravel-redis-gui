export const RenderTextShort = (text: string, length: number = 32): string =>
    text.length > length ? text.substring(0, length) + "..." : text;
