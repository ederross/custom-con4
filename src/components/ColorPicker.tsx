import React, { useEffect, useState } from 'react';
import reactCSS from 'reactcss';
import { RGBColor, SketchPicker } from 'react-color';

type IColor = {
  initialRGBColor: RGBColor;
  setPlayerColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPicker = ({ initialRGBColor, setPlayerColor }: IColor) => {
  const [displayColor, setDisplayColor] = useState(false);
  const [color, setColor] = useState<RGBColor>(initialRGBColor);

  const handleClick = () => {
    setDisplayColor(!displayColor);
  };

  const handleClose = () => {
    setDisplayColor(false);
  };

  const handleChange = (color: any) => {
    setColor(color.rgb);
    setPlayerColor(color.hex);
  };


  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        backgroundColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, ${color?.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <>
      <div>
        <div style={styles.swatch} onClick={handleClick}>
          <div style={styles.color} />
        </div>
        {displayColor ? (
          <div style={{ position: 'absolute', zIndex: 2 }}>
            <div
              style={{ position: 'absolute', zIndex: 2 }}
              onClick={handleClose}
            />
            <SketchPicker color={color} onChange={handleChange} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ColorPicker;
