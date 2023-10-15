import { ReactFormConst } from "./const";

export const submitCreator = (payload) => ({
    type: ReactFormConst.Submit,
    payload,
});
export const updateCreator = (payload) => ({
    type: ReactFormConst.Update,
    payload,
});
export const deleteCreator = (payload) => ({
    type: ReactFormConst.Delete,
    payload,
});
export const editCreator = (payload) => ({
    type: ReactFormConst.Edit,
    payload,
});
export const searchCreator = (keySearch) => ({
    type: ReactFormConst.Search,
    keySearch,
});