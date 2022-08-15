import { useRef, useState } from "react";
import { useDrag,useDrop } from "react-dnd";

const Item = ({Item,index,moveItem,status}) =>{
    const Ref = useRef(null);

    const [,drop] = useDrop({
        accept:"div",
        hover(item,monitor){
            if(!Ref.current){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = item.index;
        }
    })
}