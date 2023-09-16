import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle
            subHeading={"From 11:00am to 10:00pm"}
            heading={"ORDER ONLINE"}
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-12"
            >
                <SwiperSlide className='fixed'>
                    <img src={slide1} alt="" />
                    <div className='flex justify-center'>
                        <h3 className='text-xs sm:text-xl text-white md:text-4xl uppercase text-center relative bottom-8 md:bottom-16 bg-slate-700 bg-opacity-40 px-2 rounded'>Salads</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='fixed'>
                    <img src={slide2} alt="" />
                    <div className='flex justify-center'>
                        <h3 className='text-xs sm:text-xl text-white md:text-4xl uppercase text-center relative bottom-8 md:bottom-16 bg-slate-700 bg-opacity-40 px-2 rounded'>Pizzas</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='fixed'>
                    <img src={slide3} alt="" />
                    <div className='flex justify-center'>
                        <h3 className='text-xs sm:text-xl text-white md:text-4xl uppercase text-center relative bottom-8 md:bottom-16 bg-slate-700 bg-opacity-40 px-2 rounded'>Soups</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='fixed'>
                    <img src={slide4} alt="" />
                    <div className='flex justify-center'>
                        <h3 className='text-xs sm:text-xl text-white md:text-4xl uppercase text-center relative bottom-8 md:bottom-16 bg-slate-700 bg-opacity-40 px-2 rounded'>Deserts</h3>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;