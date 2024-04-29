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

    async getTrainingComplianceBrief(userId = 1) {
        try {
            const response = await get(`compliance/training-compliance-brief/${userId}/`,);
            return response;
        } catch (error) {

        }
    }

    async getTrainingComplianceBriefs() {
        try {
            const response = await get("compliance/training-compliance-brief/",);
            return response;
        } catch (error) {

        }
    }
}
export default new TrainingService();