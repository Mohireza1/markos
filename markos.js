"use strict";
const endglishDatabase = [];
const persianDatabase = [];
const wordAdder = (string) => {
  const words = string
    .toLowerCase()
    .split(
      /[^A-Za-z0-9\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff\u0600-\u061E\u0620-\u06ff]+/
    );
  for (const word of words) {
    if (
      /[\u0600-\u061E\u0620-\u06ff\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff]+/gi.test(
        word
      ) &&
      !persianDatabase.includes(word)
    ) {
      persianDatabase.push(word);
    } else if (
      /[A-Za-z0-9\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff]+/gi.test(
        word
      ) &&
      !endglishDatabase.includes(word)
    ) {
      endglishDatabase.push(word);
    }
  }
};
const wordMaker = () => {
  // The functions selects one of the two arrays based on a random number (the longer array has more chance)
  let selectedArray = [];
  if (
    Math.random() * (persianDatabase.length / endglishDatabase.length + 1) <
    persianDatabase.length / endglishDatabase.length
  ) {
    selectedArray = [...persianDatabase];
  } else if (
    Math.random() * (persianDatabase.length / endglishDatabase.length + 1) >
    persianDatabase.length / endglishDatabase.length
  ) {
    selectedArray = [...endglishDatabase];
  } else if (endglishDatabase.length === 0 && persianDatabase.length === 0) {
    return "ERR_EMPTY_DATABASES";
  } else if (persianDatabase.length === 0) {
    selectedArray = [...endglishDatabase];
  } else if (endglishDatabase.length === 0) {
    selectedArray = [...persianDatabase];
  }
  if (Math.random() < 0.8) {
    let numberOfWords = Math.floor(Math.random() * 3) + 1;
    if (numberOfWords > selectedArray.length)
      numberOfWords = selectedArray.length;
    // if numberofwords = 1
    const wordsToJoin = [];
    const usedIndexes = [];
    while (wordsToJoin.length < numberOfWords) {
      let indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      while (usedIndexes.includes(indexOfTheWord)) {
        indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      }
      usedIndexes.push(indexOfTheWord);
      wordsToJoin.push(selectedArray[indexOfTheWord]);
    }
    return wordsToJoin.join(" ");
  } else {
    let numberOfWords = Math.floor(Math.random() * 15) + 2;
    if (numberOfWords > selectedArray.length)
      numberOfWords = selectedArray.length;
    // if numberofwords = 1
    const wordsToJoin = [];
    const usedIndexes = [];
    while (wordsToJoin.length < numberOfWords) {
      let indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      while (usedIndexes.includes(indexOfTheWord)) {
        indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      }
      usedIndexes.push(indexOfTheWord);
      const preserve = Math.floor(Math.random() * 3) + 1;
      if (
        selectedArray.includes(selectedArray[indexOfTheWord - preserve]) &&
        selectedArray.includes(selectedArray[indexOfTheWord + preserve])
      ) {
        for (let looper = preserve * -1; looper <= preserve; looper++) {
          wordsToJoin.push(selectedArray[indexOfTheWord + looper]);
        }
      }
    }
    return wordsToJoin.join(" ");
  }
};

wordAdder(`
چرا میشه
حتی میشه دانلود نکرد و از همون صفحه ی توی سایت شات گرفت
نه توی اتوماسیون تغذیه رزرو میکنید و بعد تو سلفی که مشخص کردید کارت میزنید و میگیرید
الان دوستامو کنسل میکنم که کسی که جزو دوستام نیست بین غریبه ها نمونه
اگه تو سامانه ارور تایید مدیریت میگیرید تو بخش اطلاعات خوابگاهی دانشجو اعمال تغییرات رو بزنید تا تایید بشه
کارت واکسن برای کسی که خوابگاه هم هست تایید نشده مشکلی نیست اون
هزینه خوابگاه باید قبل رفتن پرداخت کنید طبق چیزی که تو دستورالعمل نوشته بود
اگه لیستتون خالیه خوابگاه و ساختمونو از لیست بالا انتخاب کنید
خب مگه این که مشکلی داشته باشید پرداخت نکنید وگرنه که پرداخت کنید بهتره
فکر کنم ورود با رمزش کار نمیکنه چون حتی بعد تغییر رمز هم ارور اتمام اعتبار میده
اتوماسیون بازه با احراز هویت ولی چیزی تعریف نشده ولی یه چند روز پیش با رمز ۱ هم میشد وارد شد اما دیگه نمیشه
اخه اصلا چرا باید مبلغ اضافه بدیم وقتی حتی اون صد تومن سرویس خوابگاه رو هم پرداختیم بعلاوه ی اجاره ی دو ماه`);
console.log(wordMaker());
