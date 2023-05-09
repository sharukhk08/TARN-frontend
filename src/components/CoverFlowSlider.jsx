import React from "react";
import Coverflow from "react-coverflow";

const CoverFlowSlider = () => {
  var fn = function () {
    /* do you want */
  };
  return (
    <>
      <Coverflow
        width={960}
        height={480}
        displayQuantityOfSide={3}
        navigation={false}
        enableHeading={false}
      >
        <div
          onClick={() => fn()}
          onKeyDown={() => fn()}
          role="menuitem"
          tabIndex="0"
        >
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="title or description"
            style={{ display: "block", width: "100%" }}
          />
        </div>
        <img
          src="https://swiperjs.com/demos/images/nature-2.jpg"
          alt="title or description"
          data-action="http://andyyou.github.io/react-coverflow/"
        />
        <img
          src="https://swiperjs.com/demos/images/nature-3.jpg"
          alt="title or description"
          data-action="http://andyyou.github.io/react-coverflow/"
        />
        <img
          src="https://swiperjs.com/demos/images/nature-4.jpg"
          alt="title or description"
          data-action="http://andyyou.github.io/react-coverflow/"
        />
        <img
          src="https://swiperjs.com/demos/images/nature-5.jpg"
          alt="title or description"
          data-action="http://andyyou.github.io/react-coverflow/"
        />
      </Coverflow>
    </>
  );
};

export default CoverFlowSlider;
