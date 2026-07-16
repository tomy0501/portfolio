import type { Meta,StoryObj } from '@storybook/react'
import { ReservationLists } from './Reservation'
import type { Reservation,Room,Guest } from '@/page/Hotel';

const meta: Meta<typeof ReservationLists> = {
    title: "utility/Reservation",
    component: ReservationLists,
    parameters: {
        layouts: "centered"
    },
}

export default meta;

type Story = StoryObj<typeof ReservationLists>




const baseGuestArray : Guest[] = [1,2,3,4,5].map((num) =>{
    const sex = num % 2 == 0 ? 'male' : 'female'
    const RoomID = num < 3 ? '3411-1211-1455-1233' : '332-2344-2155aad-34ffed'
    const RoomName = num < 3 ? '極楽円' : '遊天の魔'
    const RoomType = num < 3 ? '大人用寝室' : '子供向け客間'
    const Room : Room = {
        RoomID: RoomID,
        RoomName: RoomName,
        RoomType: RoomType
    }
    const guest : Guest = {
        GuestID: `323da-32e98-11665-4341${num}`,
        GuestAge: { Valid: true,Int16:30 + num},
        GuestFrom: {Valid:true,String:`新潟市西区${num}丁目` },
        GuestName: `テスト${num}さん`,
        Checkin: {Valid:true,String:'2026-11-11'},
        Checkout: {Valid:true,String:'2026-11-13'},
        GuestSex: {Valid:true,String:sex},
        Room: Room
    }
    return guest
})



const testReservations : Reservation[] = [1,2,3,4].map((num)=>{
    const index = num % baseGuestArray.length - 1
    const guests : Guest[] = Array()
    const baseCheckin = new Date('2026-12-01')
    const baseCheckout = new Date('2026-12-04')
    baseCheckin.setDate(baseCheckin.getDate() + num)
    baseCheckout.setDate(baseCheckin.getDate() + num)
    for(let i = 0; i < num; i++){
        const RoomID = i < 3 ? '3411-1211-1455-1233' : '332-2344-2155aad-34ffed'
        const RoomName = i < 3 ? '極楽円' : '遊天の魔'
        const RoomType = i < 3 ? '大人用寝室' : '子供向け客間'
        const Room : Room = {
            RoomID: RoomID,
            RoomName: RoomName,
            RoomType: RoomType
        }
        const sex = i % 2 === 0 ? "male" : "female"
        const guest : Guest = {
            GuestID: `323da-32e98-11665-4344${i + num}`,
            GuestAge: {Valid:true,Int16:30 + num + i},
            GuestFrom: {Valid:true,String:`新潟県新潟市西区${i + num}番地`},
            GuestName: `テストイノウエ${i + num}`,
            Room: Room,
            GuestSex: {Valid:true,String:sex},
            Checkin: {Valid:true,String:baseCheckin.toDateString()},
            Checkout: {Valid:true,String:baseCheckout.toDateString()}
        }
        guests.push(guest)
    }
    const reservation : Reservation = {
        ReservationID: `acdda-234662-dcca-2345cf-22235${num}`,
        RepresentGuest: baseGuestArray[index],
        Guests: guests
    }
    return reservation
})

export const Default : Story = {
    args:{
        isLoading: false,
        errorMessage: "",
        reservations: testReservations
    }
}

