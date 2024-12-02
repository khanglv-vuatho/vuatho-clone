'use client'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
import React, { Component } from 'react'
import Slider from 'react-slick'

function CustomPaging() {
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={`https://picsum.photos/800/400?random=${i + 1}`} alt={`Random image ${i + 1}`} />
        </a>
      )
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className='slider-container bg-red-200 py-[200px]'>
      <Slider {...settings}>
        <div>
          <img src='https://picsum.photos/800/400?random=1' alt='Random image 1' />
        </div>
        <div>
          <img src='https://picsum.photos/800/400?random=2' alt='Random image 2' />
        </div>
        <div>
          <img src='https://picsum.photos/800/400?random=3' alt='Random image 3' />
        </div>
        <div>
          <img src='https://picsum.photos/800/400?random=4' alt='Random image 4' />
        </div>
      </Slider>
    </div>
  )
}

export default CustomPaging
