
import { HotelContext } from "../Context/hotelContext";
import { UserContext } from "../Context/userContext";
import React, { useContext, useState, useEffect } from "react";
import { getHotel } from "../../firebaseConfig";


function Book(props) {
  const { currentHotel, setCurrentHotel } = useContext(HotelContext);
  const { currentUser} = useContext(UserContext);
  const [checkIn,setCheckIn] = useState("");
  const [checkOut,setCheckOut] = useState("");
  const [totalDays, setTotalDays] = useState("0")
  const [totalPrice, setTotalPrice] = useState();
  let temp = currentHotel.price.split("$");
  const price = Math.floor(temp[1].split(",").join("") / 30);

  function addDays(){
    const checkInDate = document.getElementById("check-in").value;
    const ToDate = new Date();

    if (new Date(checkInDate).getTime() < ToDate.getTime()) {
        window.alert("Check-in date MUST be a future date");
        return;
      }
    if(checkIn != "" && checkOut != ""){
      const ci = new Date(checkIn);
      const co = new Date(checkOut);
      const timeDifference = co.getTime() - ci.getTime();

      if(checkIn < checkOut){
        setTotalDays(timeDifference / (1000*3600 * 24));
        let tempDays = timeDifference / (1000*3600 * 24);
        setTotalPrice(price * tempDays);
      }
      else if (checkIn == checkOut){
        setTotalDays(timeDifference / (1000*3600 * 24) + 1);
        let tempDays = timeDifference / (1000*3600 * 24) + 1;
        setTotalPrice(price * tempDays);
      }
      else{
        alert("Select a later Check-Out date!");
      }
    }
    else{
      alert("Please select dates!");
    }
  }
  
  

  useEffect(async () => {
    const hotel = await getHotel(props.condition);
    setCurrentHotel(hotel);
  }, []);
  console.log(currentHotel);

  return (
    <>
      {!currentHotel ? (
        <></>
      ) : (
        <div className='flex flex-col h-[auto] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10'>
            <span className='text-center text-white pt-5 pb-8 pl-16 font-bold tracking-widest text-[30px]'>BOOK</span>
            <hr></hr>
            
            <div className="flex flex-col justify-left align-center p-1">
                    <span className='text-center text-white pl-20 font-bold tracking-widest text-[16px] p-4'>BOOKING</span>
            </div>
            
            <div className="flex flex-row justify-left align-center">
                <div className="flex flex-col justify-left align-center p-7">
                    <img src={currentHotel.images[0]} className=" w-[300px] h-[250px]"></img>
                    <span className='text-white pl-0 font-bold tracking-widest text-[16px] p-0'>{currentHotel.title}</span>
                    <span className='text-white pl-0 font-bold tracking-widest text-[16px] p-0'>Address: {currentHotel.publicAddress}</span>
                    <span className='text-white pl-0 font-bold tracking-widest text-[16px] p-0'>Listing Description: {currentHotel.beds} beds and {currentHotel.bathrooms} bathrooms
 </span>
                </div>
                <div className="flex flex-col justify-left align-center">
                    <span className='text-white pl-20 font-bold tracking-widest text-[16px] p-4'>Booking information:</span>
                    <span className='text-white pl-20 tracking-widest text-[16px]'>Name: {currentUser.firstname} {currentUser.lastname} </span>
                    <span className='text-white pl-20 tracking-widest text-[16px] '>Check-in: <input type='date' onChange={e=> setCheckIn(e.target.value)} className='text-center text-black' id='check-in' size='12'></input> Check-out: <input type='date' onChange={e=>setCheckOut(e.target.value)} className='text-center text-black' id='check-out' size='12'></input></span>
                    <span className='text-white pl-20 tracking-widest text-[16px] '>Days Staying: {totalDays}</span>
                    <span className='text-white pl-20 tracking-widest text-[16px] '>Room: {currentHotel.beds} beds </span>
                    <span className='text-white pl-20 tracking-widest text-[16px] '>Daily Price: $ {price}</span>
                    <span className='text-white pt-5 pl-60 tracking-widest text-[16px] '><button type='button' className="button11 tracking-widest" onClick={() => addDays()} > Check Price </button>
                    </span>
                    <span className=' text-white pt-20 pb-8 pl-20 font-bold tracking-widest text-[15px]'>Total Price: $ {totalPrice}</span>

                </div>
            </div>           

            <div className="pt-10 text-center text-white font-bold text-[20px]">            
                <button type='button' className="button10 " > Book </button>
            </div>

        </div>
      )}
    </>
  );
}

export default Book;
