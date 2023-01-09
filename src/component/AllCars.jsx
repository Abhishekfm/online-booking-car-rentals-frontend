import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import car from "../images/car.png"
import { PageNumber } from "./PageNumber";
import plus from "../images/plus.png"
import minus from "../images/minus-sign.png"
import expand from "../images/expand.png"
import axios from "axios";


export function AllCars(props){
    const carData = props.carData
    const numberOfEntry = Number(props.totalEntry);
    const [numberOfPages, setNumberOfPages] = useState(0)
    // const [clickMoreInfo, setMoreInfo] = useState(1)
    const [isVisibleId, setIsVisibleId] = useState(null);
    useEffect(()=>{
        if(numberOfEntry > 0){
            setNumberOfPages(Math.ceil(numberOfEntry/5))
            console.log(numberOfEntry);
            console.log(numberOfPages);
        }
        console.log(`numberOfEntry:${numberOfEntry}`);
        console.log(`numberOfPages:${numberOfPages}`);
    },[])
    console.log(carData);
    async function addOneMoreCar(carId){
        try {
            const res = await axios.get(`${props.BaseUrl}/admin/addcaratsamelocation/${carId}`,
            { withCredentials: true }
            )
            if(!res){
                return
            }else{
                console.log(res);
                props.reRendor()
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function decOneMoreCar(carId){
        try {
            const res = await axios.get(`${props.BaseUrl}/admin/decrementcaratsamelocation/${carId}`,
            { withCredentials: true }
            )
            if(!res){
                return
            }else{
                console.log(res);
                props.reRendor()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function showLocation(carId){
        if(isVisibleId === carId){
            setIsVisibleId(null)
            return
        }
        setIsVisibleId(carId)
    }
    return(
        <div className="w-full">
            <div className="flex w-full gap-4 m-4 flex-col">
                {carData&&carData.map((ele)=>(
                    <div key={ele._id} className="flex w-full p-4 flex-row items-start justify-around border-dashed border-b-2 border-slate-400">
                        <div>
                         <img className="h-[200px] w-[340px] object-cover" src={ele.url? ele.url :car} alt="" />
                        </div>
                        <div className="flex w-1/2 flex-row justify-between">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-[30px] font-bold">{ele.carName}</h2>
                            <h1 className="text-[24px] font-semibold">Available Cars: <span className="text-[#EB455F]">{ele.numberOfCars}</span></h1>
                            <h2 onClick={()=>{showLocation(ele._id)}} className="text-[20px] flex items-center font-bold">More Info <img className="w-[30px]" src={expand} alt="" /></h2>
                            <div id={ele._id} className={isVisibleId === ele._id?"block":"hidden"}>
                                <p className="text-[20px] font-semibold ">Country: {ele.carLocation.country}</p>
                                <p className="text-[20px] font-semibold ">State: {ele.carLocation.state}</p>
                                <p className="text-[20px] font-semibold ">City: {ele.carLocation.city}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center w-[150px] justify-between">
                            <button onClick={()=>{addOneMoreCar(ele._id)}} className="transition ease-in-out delay-10 hover:-translate-y-2 hover:scale-125 duration-300 rounded-[10px] w-[20px] font-semibold text-[#000]"><img src={plus} alt="" /></button>
                            <p className="text-[30px]">{ele.numberOfCars}</p>
                            <button onClick={()=>{decOneMoreCar(ele._id)}} className="transition ease-in-out delay-10 hover:-translate-y-2 hover:scale-125 duration-300 rounded-[10px] w-[20px] font-semibold text-[#000]"><img src={minus} alt="" /></button>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* {numberOfPages ? <PageNumber setSkip={props.nom} pages={numberOfPages}/>: ""} */}
            <PageNumber setSkip={props.nom} pages={numberOfPages}/>
        </div>
    )
}