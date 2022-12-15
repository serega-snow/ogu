import { createAsyncThunk } from '@reduxjs/toolkit';

// процесс запроса видов груза
export const getTypeOfRawMaterialsFromDataBase = createAsyncThunk(
  'main-slice/getTypeOfRawMaterialsFromDataBase',
  async ({}, { rejectWithValue }) => {
    try {
      const [typesMaterials] = await window.connectMySQL.execute(
        `SELECT * FROM вид_груза`
      );

      if (typesMaterials.length < 1) return null;

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

      if (cargoСonditions.length < 1) return null;

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
  async ({ states, setStates }, { rejectWithValue }) => {
    try {
      const {
        stateCurrentValueWagons,
        stateInputValueWeightCargo,
        stateAddedDate,
        stateSelectTypeOfRawMaterials,
        stateSelectCargoCondition,
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

      setStateCurrentValueWagons(null);
      setStateInputValueWeightCargo(null);
      setStateAddedDate(null);
      setStateSelectTypeOfRawMaterials(null);
      setStateSelectCargoCondition(null);

      console.log(`stateCurrentValueWagons::`, stateCurrentValueWagons);
      console.log(`resultRequestSaveCargo::`, resultRequestSaveCargo);
    } catch (errorObject) {
      rejectWithValue(errorObject.message);
    }
  }
);
// главная -> сохранить и подобрать режим
