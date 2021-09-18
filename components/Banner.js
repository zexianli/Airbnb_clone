import Image from "next/image";

function Banner() {
    return (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] xl:h-[800px] 2xl:h-[1200px]">
            <Image
                src="https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560"
                layout="fill"
                objectFit="cover"
            />
        </div>
    )
}

export default Banner
