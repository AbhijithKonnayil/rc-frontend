import { get, post } from "../lib/api";

class CurriculumService {
  async getCurriculum() {
    try {
      const params = {};
      const response = await get("compliance/curriculum/", params);
      return response;
    } catch (error) {}
  }
  async addCurriculum(data) {
    try {
      const response = await post("compliance/curriculum/", data);
      return response;
    } catch (error) {}
  }

  async getCurriculumAssignment({ status = null } = {}) {
    try {
      const params = {};
      if (status === "completed") {
        params.status = "completed";
      }
      const response = await get("compliance/curriculum-assignment/", params);
      return response;
    } catch (error) {}
  }
  async assignCurriculums(empIds, curriculumIds, dueDate) {
    try {
      const response = await post("compliance/curriculum/assign/", {
        curricula: curriculumIds,
        employees: empIds,
        due_date: dueDate,
      });
      return response;
    } catch (error) {}
  }
  async getCurriculumDueDates() {
    try {
      const empId = localStorage.getItem("userID");
      console.log("empId", empId);
      const response = await get("compliance/curriculum/due-dates/", {
        emp_id: empId,
      });
      return response;
    } catch (error) {}
  }
}

export default new CurriculumService();
