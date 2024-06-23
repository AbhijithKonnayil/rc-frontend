import { get, post } from "../lib/api";

class TrainingService {
  async getTrainingsCompliances({ trainingStatus = null } = {}) {
    const params = {};
    if (trainingStatus !== null) {
      params.status = trainingStatus;
    }
    console.log(`params:`);
    console.log(params);
    try {
      const response = await get("compliance/training-compliance/", params);
      return response;
    } catch (error) {}
  }
  async getTrainings({ trainingStatus = null } = {}) {
    const params = {};
    if (trainingStatus !== null) {
      params.status = trainingStatus;
    }
    console.log(`params:`);
    console.log(params);
    try {
      const response = await get("compliance/training/", params);
      return response;
    } catch (error) {}
  }

  async addTrainings(training) {
    try {
      const response = await post("compliance/training/", training);
      return response;
    } catch (error) {}
  }

  async getTrainingComplianceBrief() {
    try {
      const userId = localStorage.getItem("userID");
      const response = await get(
        `compliance/training-compliance-brief/${userId}/`
      );
      console.log("response");
      console.log(response);
      return response;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  async getTrainingComplianceBriefs() {
    try {
      const response = await get("compliance/training-compliance-brief/");
      return response;
    } catch (error) {}
  }
}
export default new TrainingService();
