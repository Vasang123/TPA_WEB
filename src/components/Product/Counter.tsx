import { SecondarySpanColor2 } from "../Other/GlobalComponent";
import style from '@/styles/Product/detail.module.scss'
export function Counter({ count, setCount, limit }: any) {

    function increment() {
        if(count == limit){
            setCount(limit);
        }else{
            setCount(count + 1);
        }
    }

    function decrement() {
        if(count == 0){
            setCount(0);
        }else{
            setCount(count - 1);

        }
    }

    return (
        <div className={style.incre_container}>
            <button onClick={decrement} className={style.count_button} >-</button>
            <SecondarySpanColor2>{count}</SecondarySpanColor2>
            <button onClick={increment} className={style.count_button} >+</button>
        </div>
    );
}
