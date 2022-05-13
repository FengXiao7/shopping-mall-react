
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = ({imgList}) => {
  return (
    imgList&&
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
    //   spaceBetween={50}
      autoplay
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {
        imgList.map(item=>{
          return <SwiperSlide key={item.id}><img src={require(`${item.imgUrl}`)} alt="" /></SwiperSlide>
        })
      }
    </Swiper>
  );
};
export default Carousel