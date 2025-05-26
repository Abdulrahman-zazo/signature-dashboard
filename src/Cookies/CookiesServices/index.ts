import Cookies, { type CookieSetOptions } from "universal-cookie"; // استيراد CookieSetOptions لـ type safety أفضل

const cookies = new Cookies(); // أو new Cookies(null, { path: '/' }); لتعيين path افتراضي

class CookiesService {
  get(name: string): string | undefined {
    return cookies.get(name);
  }

  // دالة set مُعدلة لتدعم مدة الصلاحية و Secure flag
  set(
    name: string,
    value: string,
    daysToExpire?: number,
    isSecure?: boolean
  ): void {
    const options: CookieSetOptions = {
      // استخدام النوع المستورد
      path: "/",
      sameSite: "strict", // يمكنك تغييرها إلى 'lax' أو 'none' حسب حاجتك
      // إذا استخدمت 'none'، يجب أن يكون secure: true
    };

    if (daysToExpire) {
      const date = new Date();
      date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
      options.expires = date; // تعيين تاريخ الانتهاء
      // أو يمكنك استخدام maxAge (بالثواني):
      // options.maxAge = daysToExpire * 24 * 60 * 60;
    }

    if (isSecure) {
      options.secure = true; // لتفعيل Secure flag (يتطلب HTTPS)
    }

    // ملاحظة هامة بخصوص HttpOnly:
    // على الرغم من أن مكتبة universal-cookie قد تُظهر خيار httpOnly في أنواعها (types),
    // فإن تعيين سمة HttpOnly من خلال JavaScript من جانب العميل (المتصفح)
    // هو بشكل عام غير فعال أو غير ممكن بسبب قيود أمان المتصفح.
    // الكوكيز التي تحمل سمة HttpOnly يجب أن يتم تعيينها من قبل الخادم (server-side).
    // إذا أضفت options.httpOnly = true; هنا، فغالباً سيتجاهلها المتصفح.

    cookies.set(name, value, options);
    if (daysToExpire) {
      console.log(
        `تم تعيين الكوكيز '${name}' لتبقى لمدة ${daysToExpire} يومًا.`
      );
    } else {
      console.log(`تم تعيين الكوكيز '${name}' ككوكيز جلسة.`);
    }
  }

  remove(name: string): void {
    cookies.remove(name, {
      path: "/",
      // إذا كنت تستخدم domain أو secure عند الإعداد، قد تحتاج لإضافتها هنا أيضاً لضمان الحذف
      // sameSite: "strict", // أحياناً تكون مطلوبة للمطابقة الكاملة
    });
  }
}

export const cookieService = new CookiesService();

// ----- مثال على كيفية استخدام الخدمة المُعدلة -----

// لتخزين توكن تسجيل الدخول لمدة 30 يومًا (مع افتراض أن موقعك يستخدم HTTPS لتفعيل Secure)
// const loginToken = "your_actual_token_here";
// const isSiteSecure = window.location.protocol === "https:"; // تحقق إذا كان الموقع HTTPS
// cookieService.set("authToken", loginToken, 30, isSiteSecure);

// لتخزين توكن ككوكيز جلسة (مثلما كان الوضع سابقاً)
// cookieService.set("sessionToken", "another_token_value", undefined, isSiteSecure);

// لقراءة الكوكيز
// const myToken = cookieService.get("authToken");
// if (myToken) {
//   console.log("التوكن موجود:", myToken);
// }

// لحذف الكوكيز
// cookieService.remove("authToken");
