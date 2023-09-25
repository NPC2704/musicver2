import { get, post } from "../utils/request";
import API from "./API";

function discoverPageService() {
  const API_ = API.GET_DISCOVER_API;

  return get(API_).then((data) => {
    return data;
  });
}

export default discoverPageService;
