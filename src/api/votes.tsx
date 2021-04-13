import axios from '../axios';
import getAuthenticationToken from '../utils/getAuthenticationToken'

const votesApi = {
    vote: async (vote : any): Promise<any> => {
        return await axios.post("/votes", {
            headers: {
                "Authorization": getAuthenticationToken()
            },
            data: vote
        });
    },
}

export default votesApi;
