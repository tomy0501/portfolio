import type { Meta,StoryObj} from '@storybook/react'
import type { CalenderPrice,SeasonalityPrices} from '@/page/RoomPrices'
import { DatePriceCalendar } from './CalenderBase'

const meta: Meta<typeof DatePriceCalendar> = {
    title: "utility/CalenderPrice",
    component: DatePriceCalendar,
    parameters: {
        layouts: "centered"
    }
}

export default meta

function getThisMonth(date:Date) : Date[]{
    const year = date.getFullYear()
    const month = date.getMonth()
    const totalDays = new Date(year,month + 1,0).getDate()
    
    const yearMonthDays = Array.from(
        {length:totalDays},
        (_,i) => {
            return new Date(year,month,i + 1)
        }
    )
    return yearMonthDays
}

type Story = StoryObj<typeof DatePriceCalendar>

const TestSeasonalityPrice : SeasonalityPrices[] = [1,2,3,4,5].map(value => {
    const seasonality : SeasonalityPrices = {
        numberOfPeople:value,
        price:value * 10000
    }
    return seasonality
})

const testMonth = new Date("2026/11/1")
const testDays = getThisMonth(testMonth)
console.log(testDays)
const testCalenderPrices : CalenderPrice[] = testDays.map(value => {
    const testCalenderPrice : CalenderPrice = {
        date:value,
        seasonality:TestSeasonalityPrice
    }
    return testCalenderPrice
})
console.log(testCalenderPrices)

export const Default : Story = {
    args:{
        calenderPrices:testCalenderPrices
    }
}