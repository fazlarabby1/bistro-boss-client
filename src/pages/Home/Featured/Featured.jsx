import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed my-16">
            <div className="bg-black bg-opacity-30">

                <SectionTitle subHeading={"Check it out"} heading={"Featured Item"} />

                <div className="md:flex justify-center items-center py-20 px-16">
                    <div>
                        <img className="md:w-3/4 md:mx-auto" src={featuredImg} alt="" />
                    </div>
                    <div className="my-auto text-white">
                        <p>Sep 16, 2023</p>
                        <p className="uppercase">Where Can I get Some?</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque quia, quisquam, labore impedit nam, vitae iusto magnam quaerat inventore explicabo quo? Asperiores debitis commodi perspiciatis ipsa facilis neque cum placeat?</p>
                        <button className="btn btn-outline border-0 border-b-4 border-white hover:bg-white hover:text-black text-white">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;