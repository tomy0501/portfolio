import type { Meta,StoryObj } from '@storybook/react'
import { Dashboard } from './DashBoard'
import type { Hotel } from 'src/type/hotel';

const meta: Meta<typeof Dashboard> = {
    title: "utility/Dashboard",
    component: Dashboard,
    parameters: {
        layouts: "centered"
    },
}

export default meta;

type Story = StoryObj<typeof Dashboard>

const baseHotel : Hotel = {
    hotelID: "032323243253243242232AAd",
    hotelName:"グランドホテル",
    address:"新潟市西区",
    phone:"00-000-000"
}

const mockHotels : Hotel[] = [1,2,3,4,5].map((num) => ({
    ...baseHotel,
    hotelID: `32DAAD32343999854345${num}`,
    hotelName: `グランドホテル${num}`,
    address: `新潟市中央区443-${num}`,
    phone: `000-0000-00${num}`
}))

export const Default: Story = {
    args:{
        isLoading:false,
        errorMessage: "",
        hotels: mockHotels
    }
}

export const Error: Story = {
    args:{
        isLoading:false,
        errorMessage:"エラーが発生しました",
        hotels:mockHotels
        
    }
}

export const nowLoading: Story = {
    args:{
        isLoading:true,
        errorMessage:"",
        hotels:mockHotels
    }
}
