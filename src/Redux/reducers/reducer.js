import { ReactFormConst } from "./const";

const stateDefault = {
    mangSV: [],
    studentEdit: null,
    mangSVTK: []
}

export const reactFormReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ReactFormConst.Submit: {
            const newmangSV = [...state.mangSV];
            newmangSV.push(action.payload);
            state.mangSV = newmangSV;
            return { ...state };
        }

        case ReactFormConst.Delete: {
            // console.log(action.payload);
            const newmangSV = state.mangSV.filter((sv) => sv.maSV !== action.payload)
            state.mangSV = newmangSV;
            return { ...state }
        }
        case ReactFormConst.Edit: {
            state.studentEdit = action.payload
            return { ...state }
        }
        case ReactFormConst.Update: {
            const newmangSV = [...state.mangSV]
            const index = state.mangSV.findIndex((sv) => sv.maSV === action.payload.maSV)
            newmangSV.splice(index, 1, action.payload)
            state.mangSV = newmangSV;
            state.studentEdit = null
            return { ...state }
        }
        case ReactFormConst.Search: {

            if (action.keySearch) {
                let searchName = state.mangSV.filter((sv) => {
                    return sv.hoTen.toLocaleLowerCase().includes((action.keySearch).toLocaleLowerCase().trim());
                })
                state.mangSVTK = searchName;
            } else {
                state.mangSVTK = []
            }
            return { ...state }
        }
        default:
            return state;
    }
};