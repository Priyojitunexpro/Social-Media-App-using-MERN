import React,{ useState,useEffect }from 'react'//Here we are creating the scrooling function
import {useWindowScroll} from "react-use";
const ScrollToTop = () => {//this function helps to scroll the mouse to the top of the window
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisibility] =  useState(false);
    useEffect(() => {
        if(pageYOffset > 100){
            setVisibility(true);//we have set the visibility to true
        }
        else{
           setVisibility(false);//otherwise the vibility will be set to false
        }
    }, [pageYOffset]);
    const scrollToTop = () => {
        window.scrollTo({top:0, behavior:"smooth" })//here we have used windows.scrollTo function
    }
    if(!visible){//we are checking whether visibilty is true or false
        return false;
    }

    return (
        <div className="scroll-to-top cursor-pointer text-center" onClick={scrollToTop}>
        <span class="fas fa-chevron-up icon"></span>
        </div>
    )
}

export default ScrollToTop;
