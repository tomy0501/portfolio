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
                <div>
                    <p>{hotelInfos.hotelName}のプロパティ</p>
                    <p>{userName}さんの権限は{hotelInfos.authority}です</p>
                    <ul>
                        <li onClick={getReservation}>予約状況をみる</li>
                        <li onClick={getRoom}>部屋情報をみる</li>
                        <li onClick={getGuestInfo}>宿泊者情報をみる</li>
                        <li onClick={openSeasonalityDisplay}>シーズナリティの設定をする</li>
                    </ul>
                    
                </div>
            }
        </>
        )
    }

    return (
        <p>ホテルの情報にアクセスできませんでした。</p>
    )
        
    
}