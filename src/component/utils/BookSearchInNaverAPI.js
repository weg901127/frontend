import axios from "axios";
import convert from "xml-js";

const bookSearchInNaverAPI = async (name, value) => {
  let result;
  const ID_KEY = `${process.env.REACT_APP_API_ID_KEY}`;
  const SECRET_KEY = `${process.env.REACT_APP_API_SECRET_KEY}`;
  const param = {};
  param[name] = value;
  try {
    result = await axios
      .get("/naverApi/v1/search/book_adv.xml", {
        params: param,
        headers: {
          "X-Naver-Client-Id": ID_KEY,
          "X-Naver-Client-Secret": SECRET_KEY,
        },
      })
      .then(response => {
        result = convert.xml2js(response.data);
        console.log(result);
        if (result.elements[0].elements[0].elements[7]) {
          return convert.xml2js(response.data).elements[0].elements[0]
            .elements[7].elements;
        }
        return undefined;
      });
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default bookSearchInNaverAPI;
