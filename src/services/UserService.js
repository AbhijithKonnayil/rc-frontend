import { get } from "../lib/api";

class UserService {
    async getEmployees() {
        try {
            const response = await get("user/employee/",);
            return response
        } catch (error) {

        }
    }
}

export default new UserService()