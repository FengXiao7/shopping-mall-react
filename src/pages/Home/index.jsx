import React,{useState} from 'react';
import {reqGetFloorList} from '@/api'
import { useRequest } from 'ahooks';
import { message } from 'antd';
import TypeNav from '@com/TypeNav'
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like';
import Brand from './Brand';
import Floor from './Floor';
const Home = () => {
    const [FloorList, SetFloorList] = useState([])
    //请求FloorList
    // useEffect(() => {
    //     const doAsync = async () => {
    //         let result = await reqGetFloorList()
    //         if (result.code === 200) {
    //             SetFloorList(result.data)
    //         }
    //     }
    //     doAsync().catch((error) => console.log(error.msg))
    // }, [])

    useRequest(reqGetFloorList, {
        onSuccess: (result) => {
            SetFloorList(result.data)
        },
        onError: (error) => {
            message.error(error.message)
        }
    })
    return (
        <div>
            <TypeNav/>
            <ListContainer/>
            <Recommend/>
            <Rank/>
            <Like/>
            {
                FloorList.length>0 && FloorList.map(floor=>{
                    return <Floor key={floor.id} {...floor}/>
                })
            }
            <Brand/>
        </div>
    );
}

export default Home;
