const ConvertToEnglishNumber = (value: string) => {
    const persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
    ];

    let returnedValue = value;
    if (returnedValue) {
        for (let i = 0; i < 10; i++)
            returnedValue = returnedValue.replace(
                persianNumbers[i],
                i.toString(),
            );
    }

    return returnedValue;
};

export const ConvertBodyData = (data: any) =>
    JSON.parse(
        ConvertToEnglishNumber(JSON.stringify(data))
            .replace("ي", "ی")
            .replace("ك", "ک"),
    );
