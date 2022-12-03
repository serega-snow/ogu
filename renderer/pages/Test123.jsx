import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getVehiclesFromBD,
  clearStateAllVehicle,
} from '../redux/slices/mainSlice';

const Test123 = () => {
  const dispatch = useDispatch();

  const { allVehicles } = useSelector((store) => {
    const { allVehicles } = store.mainSlice;

    return { allVehicles };
  });

  return (
    <div>
      <div className='test1'></div>
      <button onClick={() => dispatch(getVehiclesFromBD())}>Все машины</button>
      <button onClick={() => dispatch(clearStateAllVehicle())}>Очистить</button>

      <div>
        {allVehicles &&
          allVehicles.map((vehicle) => <p key={vehicle.ID}>{vehicle.Model}</p>)}
      </div>
    </div>
  );
};

export default Test123;
