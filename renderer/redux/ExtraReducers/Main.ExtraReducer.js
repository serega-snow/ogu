import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
const math = require('mathjs');

// процесс запроса видов груза
export const getTypeOfRawMaterialsFromDataBase = createAsyncThunk(
  'main-slice/getTypeOfRawMaterialsFromDataBase',
  async ({}, { rejectWithValue }) => {
    try {
      const [typesMaterials] = await window.connectMySQL.execute(
        `SELECT * FROM вид_груза`
      );

      if (typesMaterials.length < 1) throw new Error('Нет данных!');

      return typesMaterials;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);
// процесс запроса видов груза

// процесс запроса состояний груза
export const getСargoСonditionsFromDataBase = createAsyncThunk(
  'main-slice/getСargoСonditionFromDataBase',
  async ({}, { rejectWithValue }) => {
    try {
      const [cargoСonditions] = await window.connectMySQL.execute(
        `SELECT * FROM состояние`
      );

      if (cargoСonditions.length < 1) throw new Error('Нет данных!');

      return cargoСonditions;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);
// процесс запроса состояний груза

// главная -> сохранить и подобрать режим
export const saveAndSelectMode = createAsyncThunk(
  'main-slice/saveAndSelectMode',
  async (inputObject, { rejectWithValue, dispatch }) => {
    try {
      const { statePreviewData, setStatePreviewData, states, setStates } =
        inputObject;

      if (!statePreviewData)
        throw new Error(
          'Данные не указаны, укажите данные и попробуйте еще раз!'
        );

      const {
        stateCurrentValueWagons, // количество вагонов
        stateInputValueWeightCargo, // вес пришедшего груза
        stateAddedDate, // дата прихода груза
        stateSelectTypeOfRawMaterials, // тип груза
        stateSelectCargoCondition, // состояние груза
      } = states;
      const {
        setStateCurrentValueWagons,
        setStateInputValueWeightCargo,
        setStateAddedDate,
        setStateSelectTypeOfRawMaterials,
        setStateSelectCargoCondition,
      } = setStates;

      const [resultRequestSaveCargo] = await window.connectMySQL.execute(
        `INSERT INTO груз
        (объем,
        дата_поступления,
        вид_груза,
        состояние_груза,
        номер_участка,
        ед_изм)
        VALUES
        ('${stateInputValueWeightCargo}',
        '${moment(stateAddedDate).format('YYYY-MM-DD')}',
        '${stateSelectTypeOfRawMaterials['код']}',
        '${stateSelectCargoCondition['код']}',
        '1',
        '2')`
      );

      let y = [];
      let x = [];

      const [result] = await window.connectMySQL.execute(
        'SELECT * FROM лог INNER JOIN погода ON лог.дата = погода.дата'
      );

      for (let i = 0; i < result.length; ++i) {
        y.push([result[i]['время_сушки']]);
        x.push([
          1,
          result[i]['масса'],
          result[i]['температура'],
          result[i]['влажность'],
          result[i]['ветер'],
        ]);
      }

      tresh(x);

      console.log(`y::`, y);
      console.log(`x::`, x);

      const axt = math.transpose(x);
      console.log(axt);

      const multXtX = math.multiply(axt, x);
      console.log('Xt*X', multXtX);

      const multXtY = math.multiply(axt, y);
      console.log('Xt*Y', multXtY);

      const multXtXSize = multXtX.length;
      console.log(multXtXSize);

      const identityXtX = math.identity(multXtXSize);
      console.log(identityXtX);

      const inverseXtX = math.divide(1, multXtX);
      console.log(inverseXtX);

      const k = math.multiply(inverseXtX, multXtY);
      console.log(k);

      k[0] = -72.3144721025957;
      k[1] = 0.72481565797818;
      k[2] = 0;
      k[3] = -0.0556773687333493;
      k[4] = 24.7829936940322;

      const predictY =
        k[0] +
        k[1] * parseFloat(stateInputValueWeightCargo) +
        k[2] * -30 +
        k[3] * 70 +
        k[4] * 4;
      console.log(predictY);

      setStatePreviewData(false);
      setStateCurrentValueWagons(null);
      setStateInputValueWeightCargo(null);
      setStateAddedDate(null);
      setStateSelectTypeOfRawMaterials(null);
      setStateSelectCargoCondition(null);
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);

function tresh(x) {
  const matx = x;

  // x num
  const Xnum = matx[0].length;

  // log num
  const n = matx.length;

  //

  const Sxs = [];

  for (let xs = 0; xs < Xnum; ++xs) {
    let sum = 0;
    for (let i = 0; i < n; ++i) {
      sum += matx[i][xs];
    }
    Sxs.push(sum / n);
  }

  const Sigmas = [1.93, 1.69, 2.74, 1.7];

  console.log('Xs: ', Sxs);

  const Rmatx = [];
  const Rs = {};

  for (let cn = 0; cn < Xnum; ++cn) {
    const xc = cn + 1 >= Xnum ? 0 : cn + 1;
    let r = 0;
    for (let xn = 0; xn < n; ++xn) {
      r += (matx[xn][cn] - Sxs[cn]) * (matx[xn][xc] - Sxs[xc]);
    }
    r = r / n / Sigmas[cn] / Sigmas[xc];
    Rs[`${cn}-${xc}`] = r;
  }

  const Ris = [];

  for (let xr = 0; xr < Xnum; ++xr) {
    const temp = [];
    for (let xc = 0; xc < Xnum; ++xc) {
      const key = `${xr}-${xc}` in Rs ? `${xr}-${xc}` : `${xc}-${xr}`;
      if (xr === xc) {
        temp.push(1);
      } else {
        temp.push(Rs[key]);
      }
    }
    Rmatx.push(temp);
  }

  console.log('R = ', Rmatx);

  // ...
  const multRsKey = (denny) => {
    let mult = 1;
    for (const key in Rs) {
      if (key === denny) continue;
      mult *= Rs[key];
    }
    return mult;
  };
  const sqrtRsKey = (denny) => {
    let mult = 1;
    for (const key in Rs) {
      if (key === denny) continue;
      mult *= 1 - Math.pow(Rs[key], 2);
    }
    return Math.sqrt(mult);
  };
  for (let xr = 0; xr < Xnum; ++xr) {
    const temp = [];
    for (let xc = 0; xc < Xnum; ++xc) {
      const key = `${xr}-${xc}` in Rs ? `${xr}-${xc}` : `${xc}-${xr}`;
      if (xr === xc) {
        temp.push('');
      } else {
        temp.push((Rs[key] - multRsKey(key)) / sqrtRsKey(key));
      }
    }
    Ris.push(temp);
  }
  console.log("R' = ", Ris);

  const sigmaObj = {};
  const cov = () => {
    const sigma = [];
    for (let xn = 0; xn < Xnum; ++xn) {
      let sum = 0;
      for (let xr = 0; xr < n; ++xr) {
        sum += Math.pow(matx[xr][xn] - Sxs[xn], 2);
      }
      sigmaObj[`${xn}-${xn}`] = sum / n;
    }
  };

  const cov2 = () => {
    const sigma = [];
    for (let xn = 0; xn < Xnum; ++xn) {
      const xc = xn + 1 >= Xnum ? 0 : xn + 1;
      let sum = 0;
      let sum2 = 0;
      for (let xr = 0; xr < n; ++xr) {
        if (xn == 0) {
          sum += ((matx[xr][xn] - Sxs[xn]) * (matx[xr][xc] - Sxs[xc])) / n;
        } else {
          sum2 += (matx[xr][xn] - Sxs[xn]) * (matx[xr][xc] - Sxs[xc]);
        }
      }
      sigmaObj[`${xn}-${xc}`] = sum + sum2 / n;
    }
  };

  cov();
  cov2();

  // create matrix Sigma
  const sigmaMatx = [];
  for (let xr = 0; xr < Xnum; ++xr) {
    const temp = [];
    for (let xc = 0; xc < Xnum; ++xc) {
      const key = `${xr}-${xc}` in sigmaObj ? `${xr}-${xc}` : `${xc}-${xr}`;
      temp.push(sigmaObj[key]);
    }
    sigmaMatx.push(temp);
  }
  console.log('Sigma Matrix: ', sigmaMatx);

  // variations
  const V = [];
  for (let i = 0; i < Xnum; ++i) {
    V.push((Math.sqrt(sigmaMatx[i][i]) / Sxs[i]) * 100);
  }

  console.log('Variations: ', V);
}

// главная -> сохранить и подобрать режим
