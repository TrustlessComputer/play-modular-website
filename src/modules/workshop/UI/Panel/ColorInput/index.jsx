/* eslint-disable no-unused-vars */
import React from 'react';
import { useStoreGlobal } from '../../../../store/store';
import './styles.css';
import { listMaterial } from '../../../../utils/mock-data';
export const ColorInput = () => {
  const { setColor, setTexture, color } = useStoreGlobal();

  const handleSelectColor = (e) => {
    setColor(e.target.value);
  };
  return (
    <div className="SliderInputContainer">
      <div className="dropdown-container">
        <select onChange={handleSelectColor}>
          {listMaterial.map((item) => {
            return (
              <option key={item.color} style={{ color: item.color }} value={`${item.color}`}>
                Color:{item.color}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
