import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import {
  SliderItem,
  SliderContainer,
  SliderWrapper,
  BulletList,
  BulletListItem,
  ControlLeft,
  ControlRight,
} from "./styles";

const Slider = (props) => {
  const { images } = props;

  const [bulletStatus, setBulletStatus] = useState(true);
  const [arrowStatus, setArrowStatus] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const width = useWindowWidth();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => prevSlide(),
    onSwipedRight: () => nextSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });
    return width;
  }

  const nextSlide = () => {
    setCurrentIndex(() => {
      if (currentIndex === images.length - 1) {
        return 0;
      } else {
        return currentIndex + 1;
      }
    });
  };

  const prevSlide = () => {
    setCurrentIndex(() => {
      if (currentIndex === 0) {
        return images.length - 1;
      } else {
        return currentIndex - 1;
      }
    });
  };

  const onBulletClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <SliderContainer
        {...swipeHandlers}
        className={"slider-instance"}
        height={"500px"}
      >
        <SliderWrapper
          {...swipeHandlers}
          width={width * images.length}
          style={{
            transform: `translateX(${-(currentIndex * width)}px)`,
            transition: "transform ease-out 0.30s",
            width: width * images.length + "px",
          }}
        >
          {images.map((i, index) => {
            return (
              <Slide
                key={index}
                last={index === images.length - 1}
                index={index}
                currentIndex={currentIndex}
                item={i}
                width={width}
              />
            );
          })}
        </SliderWrapper>

        <BulletList style={{ display: bulletStatus ? "flex" : "none" }}>
          {images.map((i, index) => {
            return (
              <BulletListItem
                active={index === currentIndex}
                onClick={() => onBulletClick(index)}
                key={index}
              >
                &nbsp;
              </BulletListItem>
            );
          })}
        </BulletList>
        <div style={{ display: arrowStatus ? "block" : "none" }}>
          {currentIndex > 0 ? (
            <ControlLeft onClick={prevSlide}>prev</ControlLeft>
          ) : (
            ""
          )}

          {currentIndex < images.length - 1 ? (
            <ControlRight onClick={nextSlide}>next</ControlRight>
          ) : (
            ""
          )}
        </div>
      </SliderContainer>
      <button onClick={() => setArrowStatus(!arrowStatus)}>
        {" "}
        Show/Hide Arrow
      </button>
      <button onClick={() => setBulletStatus(!bulletStatus)}>
        Show/Hide Bullets
      </button>
    </div>
  );
};

const Slide = ({ item, width, index, currentIndex }) => {
  return (
    <SliderItem width={width}>
      <div>
        <img
          src={item}
          style={{
            position: index === currentIndex ? "relative" : "absolute",
          }}
          alt={`index-${index}`}
        ></img>
      </div>
    </SliderItem>
  );
};

export default Slider;
