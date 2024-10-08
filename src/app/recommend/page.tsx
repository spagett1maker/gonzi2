'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GoogleMap, LoadScript, Marker, MarkerF } from '@react-google-maps/api';

interface mapContainerStyle{
    width: string;
    height: string;
}

interface leisureData{
    "id": number;
    "name": string;
    "category": string;
    "district": string;
    "detail_district": string;
    "longitude": number;
    "latitude": number;
    "toilet": string;
    "nursing": string;
    "locker": string;
}

interface bicycleData{
    "line_no": string;
    "station": string;
    "location": string;
    "admin": string;
    "number": string;
    "latitude" : number;
    "longitude": number;
}



export default function Recommend(){
    const containerStyle:mapContainerStyle = {
        width: '100%',
        height: '900px'
    }
    const center = {
        // lat: 35.172418, //latitude(위도)
        // lng: 129.147461, //longitude(경도)
        lat: 35.166330,
        lng: 129.150974
    }
    const type = ['휴식이 필요한 뚜벅이 갓생러', '액티비티 지향 드라이버']
    // 뚜벅이일 경우 자전거 경로 표시 및 근처 자전거 대여소 위치 표시 
    // 드라이버일 경우 자동차 경로 표시
    const remain_day = [8, 10]

    //marker icon image 가져오기
    const marker_like = {
        url: '/marker/marker_like.png',
        // scaledSize: new window.google.maps.Size(38, 38)
    }
    const marker_unlike = {
        url: '/marker/marker_unlike.png'
    }
    const marker_bicycle = {
        url: '/marker/marker_bicycle.png'
    }

    //for identifying completeness of map loading
    const [isLoad, setIsLoad] = useState(false)


    //for toggle category button
    const [isLeisure, setIsLeisure] = useState(false)
    const [isFood, setIsFood] = useState(false)
    const [isCulture, setIsCulture] = useState(false)
    const [isShop, setIsShop] = useState(false)
    const [isRelax, setIsRelax] = useState(false)
    const [isWork, setIsWork] = useState(false)
    const [isBicycle, setIsBicycle] = useState(false)

    const loadMap = () => {
        setIsLoad(true)
    }
    const clickLeisure = () => {
        setIsLeisure(!isLeisure)
        setIsBicycle(false)
    }

    const clickBicycle = () => {
        setIsBicycle(!isBicycle)
        setIsLeisure(false)
    }

    //for save data for each category: for persona0(enterprise employee with need of relax)
    const [leisure0, setLeisure0] = useState<leisureData[] | null>(null)
    const [food0, setFood0] = useState(null)
    const [culture0, setCulture0] = useState(null)
    const [shop0, setShop0] = useState(null)
    const [relax0, setRelax0] = useState(null)
    const [work0, setWork0] = useState(null)
    const [bicycle, setBicycle] = useState<bicycleData[] | null>(null)

    //for save data for each category: for persona1(freelancer with need of activity and networking)
    const [leisure1, setLeisure1] = useState<leisureData[] | null>(null)
    const [food1, setFood1] = useState(null)
    const [culture1, setCulture1] = useState(null)
    const [shop1, setShop1] = useState(null)
    const [relax1, setRelax1] = useState(null)
    const [work1, setWork1] = useState(null)



    useEffect(()=>{
        fetch('/leisure_data0.json').then(res=>res.json())
        .then(data=>setLeisure0(data))

        fetch('/leisure_data1.json').then(res=>res.json())
        .then(data=>setLeisure1(data))

        fetch('/bicycle.json').then(res=>res.json())
        .then(data=>setBicycle(data))
    }, [])
    
    return(
        <div className='mx-auto w-full '>
            <div className="fixed w-full h-[120px] text-center bg-cover bg-middle">
                <Image src="/bg1.jpg" alt="main" layout='fill' objectFit="cover"  
                className=' absolute w-full h-full object-cover brightness-[.6]'/>
                <div className="absolute inset-0 bg-[#237cfe] opacity-15"></div>
            </div>
                {/* <div className='absolute flex flex-col -translate-x-1/2 top-[57%] left-[50%] mx-auto -translate-y-1/2'>
                    <span className=' text-white text-2xl font-bold mx-auto'>New Lifestyle in Busan</span>
                </div> */}
            <div className='bg-white flex'>
                <div className='fixed float-left w-[40%] top-[120px] left-0 inline'>
                    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                        <GoogleMap 
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={14}
                        onLoad={loadMap}>
                            {isLeisure && leisure0 && leisure0.map((data, index)=>(
                                <MarkerF 
                                    position={{lat:data.latitude, lng:data.longitude}}
                                    icon={marker_like}
                                />      
                            ))}
                            {isLeisure && leisure1 && leisure1.map((data, index)=>(
                                <MarkerF 
                                    position={{lat:data.latitude, lng:data.longitude}}
                                    icon={marker_unlike}/>
                            ))}
                            {isBicycle && bicycle && bicycle.map((data, index)=>(
                                <MarkerF
                                    position={{lat:data.latitude , lng:data.longitude}}
                                    icon={marker_bicycle}
                                />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className=' w-[40%]'></div>
                <div className='float-right w-[60%] flex flex-col px-8 py-10 pt-[160px]'>
                    <div className='clear-both'> {/*title*/}
                        <h2 className='text-[28px] font-bold'>{type[0]}, 채연님!</h2>
                        {/**<h4 className='mt-3 text-[20px] font-bold text-[#999999]'>남은 워케이션 기간: {remain_day[0]} day</h4>*/}
                        <div className='mt-2'></div>
                        <p className='text-[14px]'>오늘은 어떤 하루를 보내고 싶으신가요? 채연님을 위한 워케이션 계획을 세워드립니다.</p>
                    </div>
                    <div className='flex mt-10 tracking-tight'>  {/*category button*/}
                        <button className={`mr-3 px-5 py-3 rounded-[50px] text-[14px] 
                        ${isLeisure? 'bg-[#ffffff] text-[#237cfe] font-bold border-[2px] border-[#237cfe]': 'hover:bg-blue-600 bg-[#237cfe] text-[#ffffff] border-[#ffffff]'}`} 
                        onClick={clickLeisure}>레저 / 액티비티</button>
                        <button className='mr-3 px-5 py-3 bg-[#237cfe] hover:bg-blue-600 rounded-[50px] text-[#ffffff] text-[14px]'>맛집 탐방</button>
                        <button className='mr-3 px-5 py-3 bg-[#237cfe] hover:bg-blue-600 rounded-[50px] text-[#ffffff] text-[14px]'>문화 생활</button>
                        {/* <button className='mr-3 px-5 py-3 bg-[#237cfe] rounded-[50px] text-[#ffffff] text-[14px]'>쇼핑</button> */}
                        <button className='mr-3 px-5 py-3 bg-[#237cfe] hover:bg-blue-600 rounded-[50px] text-[#ffffff] text-[14px]'>휴식 / 릴렉스</button>
                        {/* 휴식/릴렉스에는  */}
                        <button className='mr-3 px-5 py-3 bg-[#237cfe] hover:bg-blue-600 rounded-[50px] text-[#ffffff] text-[14px]'>워커홀릭</button>
                        <button className={`mr-3 px-5 py-3 rounded-[50px] text-[14px] 
                        ${isBicycle? 'bg-[#ffffff] text-[#237cfe] hover:bg-blue-600 font-bold border-[2px] border-[#237cfe]': 'bg-[#237cfe] text-[#ffffff] border-[#ffffff'}`} 
                        onClick={clickBicycle}>자전거 대여소</button>
                    </div> 
                    {/* leisure details */}
                    {isLeisure && 
                    <div>
                        <div className='mt-7 text-[20px] font-bold text-[#237cfe]'>추천 장소</div>
                        <div className='grid grid-cols-2 gap-3 mt-5'> {/*detail places*/}
                            {leisure0 && leisure0.map((data, index)=>(
                                <div className='rounded-[20px] shadow overflow-hidden'>
                                    <img className='w-full h-[200px] object-cover' src={`/detail_place/leisure_data0/${data.id}.jpg`}/>
                                    <div className='mt-2 px-8 py-3'>
                                        <h2 className='text-[20px] font-bold'>{data.name}</h2>
                                        <p className='text-[14px] text-[#237cfe]'>{data.category}</p>
                                        <p className='text-[14px]'><span>{data.district}</span> {data.detail_district}</p>
                                        <div className='mt-3 mb-5'><span className='bg-[#59B0FF] rounded-[50px] text-[9px] text-white px-3 py-2 font-bold'>화장실: {data.toilet}</span> <span className='bg-[#59B0FF] rounded-[50px] text-[9px] text-white px-3 py-2 font-bold'>수유실: {data.nursing}</span> <span className='bg-[#59B0FF] rounded-[50px] text-[9px] text-white px-3 py-2 font-bold'>물품보관소: {data.locker}</span></div>

                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <hr className="border-[#eeeeee] mb-5 mt-9" />
                        <div className='mt-10 text-[20px] font-bold text-[#000000]'>혹은, 오늘은 색다르게 이런 장소는 어때요?</div>
                        <div className='grid grid-cols-2 gap-3 mt-5'>
                            {leisure1 && leisure1.map((data, index)=>(
                                <div className='rounded-[20px] shadow overflow-hidden'>
                                    <img className='w-full h-[200px] object-cover' src={`/detail_place/leisure_data1/${data.id}.jpg`}/>
                                    <div className='mt-2 px-8 py-3'>
                                        <h2 className='text-[20px] font-bold'>{data.name}</h2>
                                        <p className='text-[14px] text-[#5247EF]'>{data.category}</p>
                                        <p className='text-[14px]'><span>{data.district}</span> {data.detail_district}</p>
                                        <div className='mt-3 mb-5'><span className='bg-[#837CE1] rounded-[50px] text-[9px] text-white px-3 py-2 font-bold'>화장실: {data.toilet}</span> <span className='bg-[#837CE1] rounded-[50px] text-[9px] text-white px-3 py-2 font-bold'>수유실: {data.nursing}</span> <span className='bg-[#837CE1] rounded-[50px] text-[9px] text-white px-3 py-2 font-bold'>물품보관소: {data.locker}</span></div>
                                    </div>
                            </div>
                            ))}
                        </div>
                    </div>}
                    {/* bicycle lent place details */}
                    {isBicycle &&
                    <div>
                        {/* <div className='text-[20px] my-6 font-bold text-[#237cfe]'>자전거 대여소 위치와 남아있는 자전거 수를 확인하세요!</div> */}
                        <div className='grid grid-cols-2 gap-3 mt-5'>
                            {bicycle && bicycle.map((data, index)=>(
                                <div className='rounded-[20px] shadow bg-[#ffffff] px-6 py-4 flex items-center h-[150px] w-[350px] mb-5'>
                                    <div>
                                        <div className={`rounded-[50px] px-3 py-2 text-[#ffffff] my-3 w-[70px] text-[12px] font-bold text-center
                                        ${data.line_no == '2호선' ? 'bg-[#81be47]': data.line_no == '3호선' ? 'bg-[#bb8c00]': 'bg-[#227dcb]'}`}>
                                            {data.line_no} 
                                        </div>
                                        <p className='text-[13px] '><span>{data.station}</span>, {data.location}</p>
                                    </div>
                                    <div className='px-8 ml-5 font-bold text-[24px]'>
                                        {data.number}
                                    </div>    
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}