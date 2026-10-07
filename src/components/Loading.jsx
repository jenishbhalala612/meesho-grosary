import React from "react";
import { ColorRing } from "react-loader-spinner";
import LazyImage from "./LazyImage";
import Meesho_logo from '../images/Meesho_logo.png';
const Loading = () => {
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div>
                    <LazyImage src={Meesho_logo} className={'w-auto h-[80px] object-contain'} />
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#570d48','#570d48','#570d48','#570d48','#570d48','#570d48']} />
                </div>
            </div>
        </>
    )
}
export default Loading;