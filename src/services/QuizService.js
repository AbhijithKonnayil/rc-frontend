import { get, post } from '../lib/api';

class QuizService {
    async getQuiz(trainingId) {
        try {
            const response = await get(`compliance/start-quiz/${trainingId}/`,);
            return response;
        } catch (error) {
            console.log('Error in quiz service getting the quiz: ', error);
        }
    }

    async submitAnswer(trainingId, answerList) {
        const response = await post(`compliance/start-quiz/${trainingId}/`, answerList);
        return response;
    } catch(error) {
        console.log('Error in quiz service getting the quiz: ', error);
    }


}

export default new QuizService(); 