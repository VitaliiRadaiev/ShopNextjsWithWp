
interface Options {
    position?: 'start' | 'end';
    space?: boolean;
}
export function addCurrencySymbol(num: number, options?: Options): string {
    const position = options?.position || 'end';
    const space = options?.space ? " " : "";

    return position === 'end' 
            ? `${num}${space}₴`
            : `₴${space}${num}`;
}