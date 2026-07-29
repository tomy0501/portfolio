import type { Meta,StoryObj} from '@storybook/react'
import type { Room } from '@/page/Reservation';
import { RoomTable } from '@/components/RoomTable'


const meta: Meta<typeof RoomTable> = {
    title: "utility/RoomTable",
    component: RoomTable,
    parameters: {
        layouts: "centered"
    },
    argTypes:{
        gotoRoomDetail: {action:"click"}
    }
}

export default meta;

type Story = StoryObj<typeof RoomTable>

const room1 : Room = {
    RoomID: "testRoom",
    RoomName:"tesutoroom",
    RoomType:"testRoomType"
}
    
const room2 : Room = {
    RoomID: "room2",
    RoomName:"tesutoroom2",
    RoomType:"testroomtype2"
}

const rooms : Room[] = [room1,room2]

export const Default : Story = {
    args:{
        isLoading:false,
        errorMessage:"",
        rooms:rooms
    }
}