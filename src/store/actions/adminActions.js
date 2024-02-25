import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService } from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }

        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("err", e)

        }
    }

}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

// ==============
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }

        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("err", e)

        }
    }

}


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

// =======
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }

        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("err", e)

        }
    }

}


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

// CREATE USER
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create new user success");
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed());
            }

        } catch (e) {
            dispatch(saveUserFailed());
            console.log("err", e)

        }
    }
}

export const saveUserSuccess = (roleData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed());
            }

        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log("err", e)

        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_USER_FAILED
})

// edit
export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update user success");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                dispatch(editUserFailed());
            }

        } catch (e) {
            toast.success("Update user failed");
            dispatch(editUserFailed());
            console.log("err", e)

        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

// delete
export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed());
            }

        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("err", e)

        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


// let res1 = await getTopDoctorHomeService(1)
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorHomeService('')
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: response.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })

        }
    }
}

export const fetchTopDoctorSuccess = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})