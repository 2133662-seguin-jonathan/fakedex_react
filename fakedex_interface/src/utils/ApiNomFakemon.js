//  Source: https://fungenerators.com/api/namegen/
import axios from "axios";

export default axios.create({
    baseURL: "https://api.fungenerators.com"
});