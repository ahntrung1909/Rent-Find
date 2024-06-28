import React, { useState } from 'react'
import './slider.scss'

function Slider({images}) {
    const[imgIndex, setImgIndex] = useState(null)

    const changeSlide = (direction) => {
        if(direction === "left") {
            if(imgIndex === 0) {
                setImgIndex(images.length - 1)
            }
            else{
                setImgIndex(prevImgIndex => prevImgIndex - 1)
            }
        } 
        else {
            if(imgIndex === images.length - 1){ // - 1 để lấy index vì index chỉ có 0 1 2 3 mà ảnh lại là 1 2 3 4
                setImgIndex(0)
            }
            else{
                setImgIndex(prevImgIndex => prevImgIndex + 1)
            }
        }
        
    }

    return(
        <div className="slider">
            {imgIndex !== null && (
                <div className="full-slider">
                    <div className="arrow" onClick={() => {changeSlide("left")}}>
                        <img src="/arrow.png" alt="" />
                    </div>
                    <div className="full-image">
                        <img src={images[imgIndex]} alt="" />
                    </div>
                    <div className="arrow" onClick={() => {changeSlide("right")}}>
                        <img className="right" src="/arrow.png" alt="" />
                    </div>
                <div className="close" onClick={() => {setImgIndex(null)}}>X</div>
            </div>
            )}

            <div className="big-image" onClick={() => {setImgIndex(0)}}>
                <img src={images[0]} alt="" />
            </div>

            <div className="small-images">
                {images.slice(1).map((img, index) => (
                    <img onClick={() => {setImgIndex(index + 1)}} key={index} src={img}></img>
                    // vì đã xóa phần tử đầu tiên [0] (= big image) nên khi truyền vào phải + 1 ở index 
                    // vì nếu truyền index thì hiện tại n sẽ = 0 ( = big image)
                ))}
            </div>

        </div>
    )
}

export default Slider