const error = {
  fullName: "",
  emailId: "",
  phoneNumber: "",
};
let failCount = 2;
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var iChars = "!`@#$%^&*()+=-[]\\';,./{}|\":<>?~_";

const stateMappping = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka ",
  "Kerala ",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur ",
  "Meghalaya",
  "Mizoram ",
  "Nagaland ",
  "Odisha",
  "Punjab ",
  "Rajasthan ",
  "Sikkim",
  "Tamil Nadu",
  "Telangana ",
  "Tripura ",
  "Uttarakhand ",
  "Uttar Pradesh",
  "West Bengal",
  "Goa ",
  "Jammu and Kashmir",
  "Delhi ",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Pondicherry ",
  "Chandigarh",
  "Andaman & Nicobar",
];
function handleChange() {
  let fullName = document.getElementById("fullName").value;
  fullName = fullName.trim();
  applyErrorFullname(fullName);
}

function stringContainsNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if (
      (!isNaN(str.charAt(i)) && !(str.charAt(i) === " ")) ||
      iChars.indexOf(str.charAt(i)) != -1
    ) {
      return true;
    }
  }
  return false;
}
function applyErrorEmail(emailString) {
  error["emailId"] = "";
  if (emailString !== "") {
    const atSymbol = emailString.indexOf("@");
    if (atSymbol < 2) {
      error["emailId"] = "Please enter valid email id";
    }

    const dot = emailString.indexOf(".");
    if (dot <= atSymbol) {
      error["emailId"] = "Please enter valid email id";
    }

    const emailExt = emailString.slice(atSymbol + 1, dot);

    if (!isNaN(emailExt)) {
      error["emailId"] = "Please enter valid email id";
    }

    const globalExt = emailString.slice(dot + 1, emailString.length);

    if (!isNaN(globalExt)) {
      error["emailId"] = "Please enter valid email id";
    }

    if (dot === emailString.length - 1) {
      error["emailId"] = "Please enter valid email id";
    }
  } else {
    error["emailId"] = "Email is mandatory";
  }

  if (error.emailId !== "") {
    document.getElementById("emailIdError").innerHTML = error.emailId;
    document.getElementById("emailIdError").style.display = "block";
  } else {
    document.getElementById("emailIdError").innerHTML = "";
    document.getElementById("emailIdError").style.display = "none";
  }

  return error.emailId;
}

function CheckEmail() {
  const email = document.getElementById("emailId").value;
  applyErrorEmail(email);
}

function applyErrorFullname(fullName) {
  error["fullName"] = "";
  if (fullName !== "") {
    const countWord = fullName.split(" ");
    const countWordLen = countWord.length;
    const errorfullName = stringContainsNumber(fullName);

    if (errorfullName === true) {
      error["fullName"] =
        "only alphabets and spaces allowed, min two words each with min 4 chars";
    }

    if (countWordLen < 2) {
      error["fullName"] =
        "only alphabets and spaces allowed, min two words each with min 4 chars";
    } else {
      let flag = false;
      for (let i = 0; i < countWordLen; i++) {
        if (countWord[i].length < 4) {
          flag = true;
          break;
        }
        continue;
      }
      if (flag) {
        error["fullName"] =
          "only alphabets and spaces allowed, min two words each with min 4 chars";
      }
    }
  } else {
    error["fullName"] = "Full Name is mandatory";
  }

  if (error.fullName !== "") {
    document.getElementById("fullNameError").innerHTML = error.fullName;
    document.getElementById("fullNameError").style.display = "block";
  } else {
    document.getElementById("fullNameError").innerHTML = "";
    document.getElementById("fullNameError").style.display = "none";
  }

  return error.fullName;
}

function checkFullname(fullName) {
  return applyErrorFullname(fullName);
}

function verifyEmail(email) {
  return applyErrorEmail(email);
}

function validatePhone() {
  const phone = document.getElementById("phoneNumber").value;
  phone_number_mask(phone);
}

function hideAllLogo() {
  const x = document.getElementsByClassName("logo");

  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
}
function phone_number_mask(phone) {
  error["phoneNumber"] = "Number is invalid";
  const myMask = "___-___-____";
  const myNumbers = [];
  let myOutPut = "";
  let theLastPos = 1;
  //get numbers
  for (let i = 0; i < phone.length; i++) {
    if (!isNaN(phone.charAt(i)) && phone.charAt(i) != " ") {
      myNumbers.push(phone.charAt(i));
    }
  }
  //write over mask
  for (let j = 0; j < myMask.length; j++) {
    if (myMask.charAt(j) == "_") {
      //replace "_" by a number
      if (myNumbers.length == 0) myOutPut = myOutPut + myMask.charAt(j);
      else {
        myOutPut = myOutPut + myNumbers.shift();
        theLastPos = j + 1; //set caret position
      }
    } else {
      myOutPut = myOutPut + myMask.charAt(j);
    }
  }
  const countryCode = myOutPut.slice(0, 3).replaceAll("_", "");
  console.log(countryCode);
  hideAllLogo();
  if (countryCode.length >= 3) {
    if (countryCode >= 621 && countryCode <= 799) {
      document.getElementById("jio").style.display = "block";
      error["phoneNumber"] = "";
    } else if (countryCode >= 801 && countryCode <= 920) {
      document.getElementById("idea").style.display = "block";
      error["phoneNumber"] = "";
    } else if (countryCode >= 921 && countryCode <= 999) {
      document.getElementById("vodaphone").style.display = "block";
      error["phoneNumber"] = "";
    } else {
      error["phoneNumber"] = "Number is invalid";
    }
  } else {
    error["phoneNumber"] = "Number is invalid";
  }

  const stateCode = parseInt(myOutPut.slice(5, 9).replaceAll("_", ""));

  let lastDigit = 0;
  let stateName = "";
  if (stateCode > 0) {
    lastDigit = stateCode.toString().slice(1, 3);
    const firstDigit = lastDigit.toString().slice(0, 1);
    if (firstDigit === "0") {
      lastDigit = stateCode.toString().slice(2, 3);
    }
    if (lastDigit > 34) {
      lastDigit = stateCode.toString().slice(2, 3);
    }
    stateName = stateMappping[lastDigit];
  }

  document.getElementById("state").innerHTML = stateName;

  const numberFilter = myOutPut
    .replaceAll("_", "")
    // .replaceAll('(', '')
    // .replaceAll(')', '')
    .replaceAll("-", "")
    .replaceAll(" ", "");
  if (numberFilter.length < 10) {
    error["phoneNumber"] = "Number is invalid";
  }
  if (error["phoneNumber"] !== "") {
    document.getElementById("phoneNumberError").innerHTML = "Number is invalid";
    document.getElementById("phoneNumberError").style.display = "block";
  } else {
    document.getElementById("phoneNumberError").innerHTML = "";
    document.getElementById("phoneNumberError").style.display = "none";
  }

  document.getElementById("phoneNumber").value = myOutPut;
  document
    .getElementById("phoneNumber")
    .setSelectionRange(theLastPos, theLastPos);
  return error.phoneNumber;
}

function registerUser() {
  const fullName = document.getElementById("fullName").value.trim();
  const emailId = document.getElementById("emailId").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  error["fullName"] = checkFullname(fullName);
  error["emailId"] = verifyEmail(emailId);
  error["phoneNumber"] = phone_number_mask(phoneNumber);

  console.log(error);

  if (
    error["fullName"] === "" &&
    error["emailId"] === "" &&
    error["phoneNumber"] === ""
  ) {
    var val = Math.floor(1000 + Math.random() * 9000);
    const firstName = fullName.split(" ")[0];
    sessionStorage.setItem("verificationCode", val);
    window.location.href =
      "otp.html?firstName=" + firstName + "&phoneNumber=" + phoneNumber;

    document.getElementById("fullName").value = "";
    document.getElementById("emailId").value = "";
    document.getElementById("phoneNumber").value = "";
  }
}

function verifyOtp() {
  const code = document.getElementById("code").value;
  const verificationCode = sessionStorage.getItem("verificationCode");
  if (code !== "") {
    if (verificationCode == code) {
      document.getElementById("varifyOTP").style.display = "none";
      document.getElementById("successMsg").style.display = "block";
      sessionStorage.clear("verificationCode");
      window.location.href = " http://pixel6.co";
    } else {
      failCount--;
      if (failCount === 0) {
        sessionStorage.clear("verificationCode");
        window.location.href = "http://pixel6.co/404";
      }
      document.getElementById("codeError").style.display = "block";
      document.getElementById(
        "codeError"
      ).innerHTML = `Please enter valid OTP. ${failCount} remaining attemp`;
    }
  } else {
    document.getElementById("codeError").style.display = "block";
    document.getElementById("codeError").innerHTML = `Please enter OTP`;
  }
}
