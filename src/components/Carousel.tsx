import { useEffect, useState } from "react";
import style from '@/styles/landingpage.module.scss'
import { transform } from "typescript";
const Carousel = ({slides}:any) =>{
    const [currIndex, setCurrIndex] = useState(18);
    const slideStyles = {
        backgroundImage: `url(${slides[currIndex].url})`,
        backgroundSize: "cover",
        backgroundPosition : "center center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        zIndex : "-1",
        transition: "background-image .5s ease-out"
    }
    const prev = () => {
        if(currIndex == 0){
            setCurrIndex(19)
        }else{
            setCurrIndex(currIndex-1)
        }
    }
    const next = () => {
        if(currIndex == 19){
            setCurrIndex(0)
        }else{
            setCurrIndex(currIndex+1)
        }
    }
    function loop(count:any){
        if(count === 19){
            return count = 0;
        }else{
            return count = currIndex -1
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