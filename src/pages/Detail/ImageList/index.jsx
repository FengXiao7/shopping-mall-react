
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import style from './index.module.css'
import {connect} from 'react-redux'
import {sendBigImgIndexAction} from '@redux/action/sendBigImgIndexAction'

const ImageList = ({ imgList,sendBigImgIndex }) => {
  return (
    imgList && imgList.length>0&&
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      // spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {
        imgList.map((item, index) => {
          return (
            <SwiperSlide key={item.id} >
        
                <img src={`${item.imgUrl}`} alt="" onClick={()=>sendBigImgIndex(index)} style={{ cursor: 'pointer' }} className={style.imageList}/>
  
            </SwiperSlide>
          )

        })
      }
    </Swiper>
  );
};

export default connect(null,{sendBigImgIndex:sendBigImgIndexAction})(ImageList)