import React, { useState, useEffect,useRef } from 'react';
import style from './index.module.css'
//                  每页数据   当前页   页数      数据总量 连续页数(奇数) 改变页号，发请求  改变每页数据，发请求
const Pagination = ({ pageSize, pageNo, totalPages, total, continues, getPageNo,getPageSize }) => {
    continues = +continues
    const [startAndEnd, SetstartAndEnd] = useState([])
    const myRef =useRef()
    const myRef2 =useRef()
    //连续页码的起始页至终止页构成的数组，数组大小为continues
    useEffect(() => {
        let start = 0
        let end = 0;
        let array = [];
        //非正常现象1：连续页比总页数多
        if (continues > totalPages) {
            start = 1
            end = totalPages
        } else {
            start = pageNo - parseInt(continues / 2)
            end = pageNo + parseInt(continues / 2)
            // 非正常现象2：start出现非正数
            if (start < 1) {
                start = 1
                end = continues
            }
            // 非正常现象3：end>总页数
            if (end > totalPages) {
                end = totalPages
                start = totalPages - continues + 1
            }
        }
        for (let i = start; i <= end; i++) {
            array.push(i)
        }
        SetstartAndEnd(array)
    }, [totalPages,continues,pageNo])
    //输入页码跳转
    const go =()=>{
        let regExp = /^\+?[1-9]\d*$/
        let num = +myRef.current.value
        if(!regExp.test(myRef.current.value)){
            alert('请输入正确格式的页码！')
        }else{
            if(num>totalPages){
                alert('页码超过了最大值！')
            }else{
                getPageNo(num)()
            }
        }
    }
    const getSize=()=>{
    getPageSize(myRef2.current.value)
    }
    return (
        <div className={style['pagination']}>
            <button onClick={getPageNo(pageNo - 1)} disabled={pageNo === 1}>上一页</button>
            {
                startAndEnd[0] > 1 &&
                <button className={pageNo === 1 ? style.active : null} onClick={getPageNo(1)}>1</button>
            }
            {
                startAndEnd[0] > 2 &&
                <button>···</button>
            }
            {
                startAndEnd.map((num, index) => {
                    return (
                        <button 
                        key={index} 
                        onClick={getPageNo(num)} 
                        className={pageNo === num ? style.active : null}>
                            {num}
                        </button>
                    )
                })
            }
            {
                startAndEnd[continues - 1] < totalPages - 1 &&
                <button>···</button>
            }
            {
                startAndEnd[continues-1] < totalPages &&
                <button className={pageNo === totalPages ? style.active : null} onClick={getPageNo(totalPages)}>{totalPages}</button>
            }
            <button onClick={getPageNo(pageNo + 1)} disabled={pageNo === totalPages}>下一页</button>
            <input type="number" placeholder="输入页数" ref={myRef} min="1" max="totalPage"/>
            <button  onClick={go} style={{backgroundColor:'#eb0d36',color:'white'}}>前往</button>
            <select ref={myRef2} onChange={getSize} style={{}}>
                <option value="3" select='selected'>3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            <button style={{ 'marginLeft': 30 }}>共 {total} 条</button>
        </div>
    );
}

export default Pagination;
