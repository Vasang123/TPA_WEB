import { useEffect, useState } from "react";
import style from '@/styles/Home/landingpage.module.scss'
import { transform } from "typescript";

interface Props {
    slides: {
        image: string;
    }[];
}
const Carousel = ({ slides }: Props) => {
    const [currIndex, setCurrIndex] = useState(slides.length - 1);
    const slideStyles = {
        backgroundImage: slides[currIndex]?.image ? `url(${slides[currIndex].image})` : '',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        zIndex: "-1",
        transition: "background-image .5s ease-out"
    }
    const prev = () => {
        if (currIndex == 0) {
            setCurrIndex(slides.length - 1)
        } else {
            setCurrIndex(currIndex - 1)
        }
    }
    const next = () => {
        if (currIndex == slides.length - 1) {
            setCurrIndex(0)
        } else {
            setCurrIndex(currIndex + 1)
        }
    }
    function loop(count: any) {
        if (count === slides.length - 1) {
            return count = 0;
        } else {
            return count = currIndex - 1
        }
        return count;
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            next();
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [currIndex]);
    return (
        <>
            <button className={style.leftArrow} onClick={prev}>
                <i className="uil uil-angle-left-b"></i>
            </button>
            <div style={slideStyles}>
            </div>
            <button className={style.rightArrow}>
                <i className="uil uil-angle-right-b" onClick={next}></i>
            </button>
        </>
    )

}
export default Carousel;