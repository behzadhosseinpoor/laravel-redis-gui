export const ConvertSize = (bytes: number, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + " B";
    }

    const units = si
        ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
    );

    return bytes.toFixed(dp) + " " + units[u];
};

export const ConvertSeconds = (seconds: number) => {
    if (seconds < 60) {
        return seconds + " s";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return minutes + " m";
    }

    const hours = Math.floor(seconds / 3600);

    if (hours < 24) {
        return hours + " h";
    }

    const days = Math.floor(seconds / 86400);

    return days + " d";
};
