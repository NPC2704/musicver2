import {get, post} from '../utils/request';
import API from './API';

function homeChartService() {
  const API_ = API.GET_HOME_CHART_API;

  return get(API_).then(data => {
    return data;
  });
}

export default homeChartService;
