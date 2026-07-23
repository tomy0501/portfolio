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
    if(isLoading){
        return (
            <h2>しばらくお待ちください</h2>
        )
    }
    
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
            {errorMessage !== "" ?<p>{errorMessage}</p> : 
                <div className="w-full">
                    <h2>{hotelInfos.hotelName}のプロパティ</h2>
                    <p className="text-green-100">{userName}さんの権限は{hotelInfos.authority}です</p>
                    <ul className="list-disc">
                        <li className="o" onClick={getReservation}>予約状況をみる</li>
                        <li onClick={getRoom}>部屋情報をみる</li>
                        <li onClick={getGuestInfo}>宿泊者情報をみる</li>
                        <li onClick={openSeasonalityDisplay}>シーズナリティの設定をする</li>
                    </ul>
                    
                </div>
            }
        </>
        )
    }else{
        return(
            <p>ホテルデータが取得できませんでした。</p>
        )
    }

    
        
    
}