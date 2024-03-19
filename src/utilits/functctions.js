const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validate(name, age, email, pass, nat) {
  if (name.trim().length < 3) {
    alert("Name is empty");
    return false;
  }

  if (age <= 0 || age > 150) {
    alert("Age is not valid number");
    return false;
  }

  if (!Number(age)) {
    alert("Age is not valid nuber");
    return false;
  }

  const emailValidate = validateEmail(email);
  if (!emailValidate) {
    alert("Email is not valid");
    return false;
  }

  if (!nat) {
    alert("Nationality is not valid");
    return false;
  }

  if (email.trim().length < 3) {
    alert("Name is empty");
    return false;
  }

  if (pass.trim().length < 3) {
    alert("Name is empty");
    return false;
  }

  return true;
}

function getUsers() {
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  return users;
}

export { validate, getUsers };
