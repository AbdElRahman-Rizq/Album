'use client'
import Image from 'next/image'

const SliderItem = ({ backgroundImage, title }) => {
  return (
    <div className="slider-item" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="banner-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="row align-items-center">
                <div className="col-12">
                  <div className="banner-content-wrap">
                    <h2 className="banner-title">{title}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
