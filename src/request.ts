import Axios from '@/plugins/axios';
import api from '@/api';
// import store from '@/store';

export default {
    // demo...
    getHouseList() {
        // const url = populateUrl(api.getEcharts);
        // axios.get(url);
        return Axios.get(api.getHouseList);
    }
};
