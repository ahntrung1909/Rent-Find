import { atom, selector } from "recoil";

const userState = atom({
    key: "userState",
    default: null,
});

export { userState };
