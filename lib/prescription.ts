

export type PrescriptionType = {
        Medicine: string;
        dose: string;
        frequency: number;
        remarks: string;
        times?: string[];
}

// Function to add specific timings based on frequency
const addTimingsToPrescriptions = (prescriptions: PrescriptionType[]) => {
    return prescriptions.map(prescription => {
        const times = getTimesForFrequency(prescription?.frequency);
        return { ...prescription, times };
    });
};


const getTimesForFrequency = (frequency: number): string[] => {
    // console.log(frequency)
    switch (frequency) {
        case 1:
            return ['09:00'];
        case 2:
            return ['08:00', '20:00'];
        case 3:
            return ['07:00', '13:00', '19:00'];
        default:
            return [];
    }
};


export default addTimingsToPrescriptions