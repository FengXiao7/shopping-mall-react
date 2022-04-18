
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import PubSub from 'pubsub-js'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import style from './index.module.css'

const ImageList = ({ imgList }) => {
  const BigImgIndex = (index) => {
    return () => {
      PubSub.publish('BigImgIndex', index)
    }
  }

  return (
    imgList &&
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      //   spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {
        imgList.map((item, index) => {
          return (
            <SwiperSlide key={item.id} >
        
                <img src={`${item.imgUrl}`} alt="" onClick={BigImgIndex(index)} style={{ cursor: 'pointer' }} className={style.imageList}/>
  
            </SwiperSlide>
          )

        })
      }
    </Swiper>
  );
};
export default ImageList