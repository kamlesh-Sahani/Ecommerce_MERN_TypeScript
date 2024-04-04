import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import "../Styles/slider.scss";
const Slider = () => {
  const imgArr: string[] = [
    "https://hips.hearstapps.com/hmg-prod/images/index-tech-gadgets-652026f2776cc.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=1120:*",
    "https://api.time.com/wp-content/uploads/2017/11/best-gadgets1.jpg",
    "https://www.stuff.tv/wp-content/uploads/sites/2/2021/08/stuff_of_the_decade_2c.jpg?resize=1024,768",
  ];
  const [imgIndex, setImgIndex] = useState<number>(1);
  const imgHandler = (handle: string) => {
    if (handle === "pre") {
      if (imgIndex > 0) {
        setImgIndex((prev) => prev - 1);
      } else {
        setImgIndex(imgArr.length - 1);
      }
    } else {
      if (imgIndex < imgArr.length - 1) {
        setImgIndex((prev) => prev + 1);
      } else {
        setImgIndex(0);
      }
    }
  };
  return (
    <div className="slider">
      <MdArrowBackIosNew onClick={() => imgHandler("pre")} className="pre" />
      <img src={imgArr[imgIndex]} alt="latest_products ..." />
      <h3 className="banner_title">Boat Earphone</h3>
      <IoIosArrowForward onClick={() => imgHandler("next")} className="next" />
      <div className="dots">
        {imgArr.map((v, i) => (
          <div
          key={i}
            className="dot"
            onClick={() => setImgIndex(i)}
            style={
              imgIndex === i
                ? {
                    backgroundColor: "#fff",
                    transform: "scale(1.5)",
                    border: "none",
                  }
                : {}
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
