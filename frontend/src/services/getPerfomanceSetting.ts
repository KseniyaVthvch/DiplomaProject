interface ISetting {
    src: string;
    text: string;
    status: string;
}

export const getPerformanceSetting = (average: number | null): ISetting => {
    const defaultSetting: ISetting = {
        src: "/normal.glb",
        text: "Good luck!!!",
        status: "normal"
    }

    if(!average) return defaultSetting;

    if (average >= 70) {
        return {
            src: "/happy.glb",
            text: "You're doing great!!!",
            status: "good",
        }
    } else if (average >= 40) {
        return {
            src: "/normal.glb",
            text: "You're doing quite well!",
            status: "normal",
        }
    } else {
        return {
            src: "/sad.glb",
            text: "You should try harder…",
            status: "bad",
        }
    }
}