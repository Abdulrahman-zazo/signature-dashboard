export const transformNumber = (num: number) => {
  // 1. تجاهل الفاصلة العشرية (الحصول على الجزء الصحيح من الرقم)
  const integerPart = Math.floor(num); // مثال: 2000905.2 -> 2000905

  // 2. تحويل الجزء "905" (أو آخر ثلاثة أرقام من الجزء الصحيح) إلى أصفار
  //    يتم ذلك عن طريق طرح باقي القسمة على 1000 من الجزء الصحيح
  //    مثال: 2000905 % 1000 = 905
  //         2000905 - 905 = 2000000
  const result = integerPart - (integerPart % 1000);

  return result;
};
