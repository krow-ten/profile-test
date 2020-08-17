import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import loginAPI from "../../api/login";

import Login from ".";

jest.mock("../../api/login");

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("successful login", () => {
    const setLoggedInUser = jest.fn();

    beforeEach(async () => {
      (loginAPI as jest.Mock).mockResolvedValue({ id: "1" });
      const component = await shallow(
        <Login setLoggedInUser={setLoggedInUser} />
      );

      component
        .find("input[name='username']")
        .simulate("change", { target: { value: "bob" } });

      component
        .find("input[name='password']")
        .simulate("change", { target: { value: "test" } });

      component
        .find("button[type='submit']")
        .simulate("click", { preventDefault: {} });
    });

    it("calls given loginAPI on submit", () => {
      expect(loginAPI).toHaveBeenCalledWith({
        userName: "bob",
        password: "test",
      });
    });

    it("calls given setLoggedInUser with return from loginAPI", () => {
      expect(setLoggedInUser).toHaveBeenCalledWith({ id: "1" });
    });
  });

  describe("unsuccessful login", () => {
    const setLoggedInUser = jest.fn();
    let component: ShallowWrapper;

    beforeEach(async () => {
      (loginAPI as jest.Mock).mockRejectedValue(401);
      component = await shallow(<Login setLoggedInUser={setLoggedInUser} />);

      component
        .find("input[name='username']")
        .simulate("change", { target: { value: "bob" } });

      component
        .find("input[name='password']")
        .simulate("change", { target: { value: "test" } });

      component
        .find("button[type='submit']")
        .simulate("click", { preventDefault: {} });
    });

    it("setLoggedInUser not called", () => {
      expect(setLoggedInUser).not.toHaveBeenCalled();
    });

    it("renders error message", () => {
      expect(component.find(".error").text()).toBe(
        "There was a problem logging in, please try again"
      );
    });
  });
});
