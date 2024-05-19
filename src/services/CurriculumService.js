import { get, post } from "../lib/api";

class CurriculumService {
    async getCurriculum() {
        try {
            const response = await get("compliance/curriculum/",);
            return response
        } catch (error) {

        }
    }
    async addCurriculum(data) {
        try {
            const response = await post("compliance/curriculum/", data);
            return response
        } catch (error) {

        }
    }
    async assignCurriculums(empIds, curriculumIds) {
        try {
            const response = await post("compliance/curriculum/assign/", { curricula: curriculumIds, employees: empIds });
            return response
        } catch (error) {

        }
    }
}

export default new CurriculumService()