import Cookies from "universal-cookie";
const cookies = new Cookies();
class CookiesService {
  get(name: string): string | undefined {
    return cookies.get(name);
  }

  set(name: string, value: string): void {
    cookies.set(name, value, {
      sameSite: "strict",
      path: "/",
    });
  }

  remove(name: string): void {
    cookies.remove(name, {
      path: "/",
    });
  }
}
export const cookieService = new CookiesService();
