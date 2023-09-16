
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="py-6
        text-center md:w-1/3 mx-auto">
            <p className="text-orange-300">---{subHeading}---</p>
            <h1 className="text-3xl border-t-2 border-b-2 my-2 py-2">{heading}</h1>
        </div>
    );
};

export default SectionTitle;