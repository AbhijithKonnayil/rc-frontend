import { get } from "../lib/api";

class TrainingService {
    async getTrainings({ trainingStatus = null } = {}) {
        const params = {};
        if (trainingStatus !== null) {
            params.status = trainingStatus;
        }
        console.log(`params:`)
        console.log(params)
        try {
            const response = await get("compliance/training/", params);
            return response;
        } catch (error) {

        }
    }
}
export default new TrainingService();