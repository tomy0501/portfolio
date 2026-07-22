import type { HotelInfos } from "@/page/Hotel"

type HotelProperty = {
    isLoading:boolean,
    errorMessage:string,
    hotelInfos:HotelInfos | null
    userName:string,
    hotelID:string | undefined
    seeReservation: (hotelID:string) => void,
    seeRoomInfo:(hotelID:string) => void,
    seeCustomerInfo:(hotelID:string) => void,
    setSeasonality:(hotelID:string) => void
}

export const HotelIndex = ({isLoading,errorMessage,userName,hotelInfos,hotelID,seeReservation,seeRoomInfo,seeCustomerInfo,setSeasonality}:HotelProperty) =>{
    if (hotelInfos !== null && hotelID){
        const getReservation = (event:React.MouseEvent) => {
            event.preventDefault()
            seeReservation(hotelID)
        }
        const getRoom = (event:React.MouseEvent) =>{
            event.preventDefault()
            seeRoomInfo(hotelID)
        }

        const getGuestInfo = (event:React.MouseEvent) => {
            event.preventDefault()
            seeCustomerInfo(hotelID)
        }

        const openSeasonalityDisplay = (event:React.MouseEvent) => {
            event.preventDefault()
            setSeasonality(hotelID)
        }
        return (

        <>
            {isLoading ? <h2>しばらくお待ちください</h2>:errorMessage !== "" ?<p>{errorMessage}</p> : 
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                    <p>{hotelInfos.hotelName}のプロパティ</p>
                    <p>{userName}さんの権限は{hotelInfos.authority}です</p>
                    <h3 onClick={getReservation}>予約状況をみる</h3>
                    <h3 onClick={getRoom}>部屋情報をみる</h3>
                    <h3 onClick={getGuestInfo}>宿泊者情報をみる</h3>
                    <h3 onClick={openSeasonalityDisplay}>シーズナリティの設定をする</h3>
                </div>
            }
        </>
        )
    }

    return (
        <p>ホテルの情報にアクセスできませんでした。</p>
    )
        
    
}