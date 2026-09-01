import type { Meta,StoryObj} from '@storybook/react'
import type { Room } from '@/page/Room';
import { RoomTable } from '@/components/RoomTable'


const meta: Meta<typeof RoomTable> = {
    title: "utility/RoomTable",
    component: RoomTable,
    parameters: {
        layouts: "centered"
    },
    argTypes:{
        checkSeasonality: {action:"click"}
    }
}

export default meta;

type Story = StoryObj<typeof RoomTable>

const room1 : Room = {
    RoomID: "testRoom",
    RoomName:"tesutoroom",
    RoomType:"testRoomType",
    RoomTypeID:"testRoomTypeID",
    SeasonalityID:"testSeasonalityID",
    SeasonalityName:"testSeasonalityName"
}
    
const room2 : Room = {
    RoomID: "room2",
    RoomName:"tesutoroom2",
    RoomType:"testroomtype2",
    RoomTypeID:"testRoomTypeID2",
    SeasonalityID:null,
    SeasonalityName:null
}

const rooms : Room[] = [room1,room2]

export const Default : Story = {
    args:{
        isLoading:false,
        errorMessage:"",
        rooms:rooms
    }
}