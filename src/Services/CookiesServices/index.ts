import Cookies from "universal-cookie";
const cookies = new Cookies();
interface CookiesParameter {
  name: string;
  value: string;
}
class CookiesServices {
  //get
  get({ name }: CookiesParameter) {
    return cookies.get(name);
  }
  //set
  set({ name, value }: CookiesParameter) {
    return cookies.set(name, value);
  }
  //remove
  remove({ name }: CookiesParameter) {
    return cookies.remove(name);
  }
}
export default new CookiesServices();
