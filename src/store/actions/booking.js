import { SET_BOOKING_TIME,SET_BOOKING_DATE} from "../actionTypes/booking";

export const updateBookingTime =(data)=>{
    return{
        type: SET_BOOKING_TIME,
        payload: data
    }
}

export const updateBookingDate =(data)=>{
    return{
        type: SET_BOOKING_DATE,
        payload: data
    }
}