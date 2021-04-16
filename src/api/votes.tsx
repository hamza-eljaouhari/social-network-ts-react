import axios from '../axios';
import getAuthenticationToken from '../utils/getAuthenticationToken'

const votesApi = {
    addVote: async (vote : any): Promise<any> => {
        return await axios.post("/votes", vote);
    },
    removeVote: async (vote : any): Promise<any> => {
        return await axios.delete("/votes", vote);
    },
}

export default votesApi;
