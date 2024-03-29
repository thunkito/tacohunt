import React from "react";
import SignUpForm from "./SignUpForm";

import { mount } from "enzyme";

describe("SignUpForm test visual components", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SignUpForm />);
  });

  it("displays correct email input field", () => {
    expect(
      wrapper.find("[data-testid='signup-email']").first().prop("value")
    ).toEqual("");

    expect(
      wrapper.find("[data-testid='signup-email']").first().prop("placeholder")
    ).toEqual("Enter Email");
  });

  it("displays correct password input field", () => {
    expect(
      wrapper.find("[data-testid='signup-password']").first().prop("value")
    ).toEqual("");

    expect(
      wrapper
        .find("[data-testid='signup-password']")
        .first()
        .prop("placeholder")
    ).toEqual("Enter Password");
  });

  it("displays correct passwordConfirm input field", () => {
    expect(
      wrapper
        .find("[data-testid='signup-passwordConfirm']")
        .first()
        .prop("value")
    ).toEqual("");

    expect(
      wrapper
        .find("[data-testid='signup-passwordConfirm']")
        .first()
        .prop("placeholder")
    ).toEqual("Confirm Password");
  });

  it("displays correct sign up button", () => {
    expect(
      wrapper.find("[data-testid='signup-button']").first().text()
    ).toEqual("Sign Up");
  });

  it("displays correct log in link", () => {
    expect(
      wrapper.find("[data-testid='signup-login-link']").first().text()
    ).toEqual("Already have an account? Log In.");
    expect(
      wrapper.find("[data-testid='signup-login-link']").first().prop("href")
    ).toEqual("/login");
  });
});

describe("SignUpForm test functionality", () => {
  const user = {
    email: "test@test.com",
    password: "test1234",
    passwordConfirm: "test1234",
  };

  let wrapper;
  let formSubmitSpy;
  beforeEach(() => {
    SignUpForm.prototype.onFormSubmit = jest.fn()
    formSubmitSpy = jest.spyOn(SignUpForm.prototype, "onFormSubmit");
    wrapper = mount(<SignUpForm />);
  });

  afterEach(() => {
    // It's best practice to clear spied function after every test run.
    // https://stackoverflow.com/questions/43245040/
    //   using-jest-to-spy-on-method-call-in-componentdidmount/43284406#43284406
    formSubmitSpy.mockClear();
  })

  it("contains correct email input values", () => {
    // Email has not been inputted yet
    expect(
      wrapper.find("[data-testid='signup-email']").first().prop("value")
    ).toEqual("");

    wrapper
      .find("[data-testid='signup-email']")
      .first()
      .simulate("change", { target: { name: "email", value: user.email } });

    // Email has been inputted
    expect(
      wrapper.find("[data-testid='signup-email']").first().prop("value")
    ).toEqual(user.email);
  });

  it("contains correct password input values", () => {
    // Password has not been inputted yet
    expect(
      wrapper.find("[data-testid='signup-password']").first().prop("value")
    ).toEqual("");

    wrapper
      .find("[data-testid='signup-password']")
      .first()
      .simulate("change", {
        target: { name: "password", value: user.password },
      });

    // Password has been inputted
    expect(
      wrapper.find("[data-testid='signup-password']").first().prop("value")
    ).toEqual(user.password);
  });

  it("contains correct passwordConfirm input values", () => {
    // Password confirm has not been inputted yet
    expect(
      wrapper
        .find("[data-testid='signup-passwordConfirm']")
        .first()
        .prop("value")
    ).toEqual("");

    wrapper
      .find("[data-testid='signup-passwordConfirm']")
      .first()
      .simulate("change", {
        target: { name: "passwordConfirm", value: user.passwordConfirm },
      });

    // Password confirm has been inputted
    expect(
      wrapper
        .find("[data-testid='signup-passwordConfirm']")
        .first()
        .prop("value")
    ).toEqual(user.passwordConfirm);
  });

  it("submits form", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault: () => undefined });
    expect(formSubmitSpy).toHaveBeenCalled();
  });
});
