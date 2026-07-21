import type { Meta,StoryObj} from '@storybook/react'
import { HotelIndex } from './HotelIndex'
import type { HotelInfos } from '@/page/Hotel';


const meta: Meta<typeof HotelIndex> = {
    title: "utility/HotelIndex",
    component: HotelIndex,
    parameters: {
        layouts: "centered"
    },
    argTypes:{
        seeCustomerInfo: { action: "clicked"},
        seeReservation: {action:"clicked"},
        seeRoomInfo:{action:"clicked"},
        setSeasonality:{action:"clicked"}
    }
}

export default meta;

type Story = StoryObj<typeof HotelIndex>

const baseHotelInfos:HotelInfos = {
    hotelID:"test",
    hotelName:"テスト施設",
    authority:"staff"
}

export const Default: Story = {
    args:{
        isLoading:false,
        errorMessage:"",
        userName:"トミー",
        hotelInfos:baseHotelInfos
    }
}