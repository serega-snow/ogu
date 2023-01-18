import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTypeOfRawMaterialsFromDataBase,
  getСargoСonditionsFromDataBase,
  saveAndSelectMode,
} from '../../../redux/ExtraReducers/Main.ExtraReducer';
import toastr from 'toastr';
import moment from 'moment';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const HomePage = () => {
  const dispatch = useDispatch();

  const refSelectValueWagons = useRef();
  const refInputValueWeightCargo = useRef();
  const refSelectTypeOfRawMaterials = useRef();
  const refSelectCargoConditions = useRef();

  const [statePreviewData, setStatePreviewData] = useState(false);
  const [stateCurrentValueWagons, setStateCurrentValueWagons] = useState(null);
  const [stateInputValueWeightCargo, setStateInputValueWeightCargo] =
    useState(null);
  const [stateAddedDate, setStateAddedDate] = useState(null);
  const [stateSelectTypeOfRawMaterials, setStateSelectTypeOfRawMaterials] =
    useState(null);
  const [stateSelectCargoCondition, setStateSelectCargoCondition] =
    useState(null);

  const { dataTypeOfRawMaterials, dataCargoСonditions } = useSelector(
    (store) => store.mainSlice
  );

  useEffect(() => {
    dispatch(getTypeOfRawMaterialsFromDataBase());
    dispatch(getСargoСonditionsFromDataBase());
  }, [dispatch]);

  return (
    <div className='HomePage'>
      <div className='HomePage__top'>
        <div className='input-wrapper'>
          <label className='label-input'>
            Колличество вагонов:
            <br />
            <select className='input' ref={refSelectValueWagons}>
              <option value='-1'>-- Выберите количество вагонов --</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
            </select>
          </label>
        </div>

        <div className='input-wrapper'>
          <label className='label-input'>
            Вес:
            <br />
            <input
              className='input'
              type='text'
              placeholder='Введите общий вес груза в тоннах'
              ref={refInputValueWeightCargo}
            />
          </label>
        </div>

        <div className='input-wrapper'>
          <label className='label-input'>
            Тип сырья:
            <br />
            <select className='input' ref={refSelectTypeOfRawMaterials}>
              <option value='-1'>-- Выберите вид сырья --</option>
              {dataTypeOfRawMaterials &&
                dataTypeOfRawMaterials.map((typeRawMatItem) => (
                  <option
                    key={typeRawMatItem['код']}
                    value={typeRawMatItem['код']}
                  >
                    {typeRawMatItem['название']} (
                    {typeRawMatItem['краткое_название']})
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className='input-wrapper'>
          <label className='label-input'>
            Состояние груза:
            <br />
            <select className='input' ref={refSelectCargoConditions}>
              <option value='-1'>-- Выберите состояние --</option>
              {dataCargoСonditions &&
                dataCargoСonditions.map((cargoCondigionItem) => (
                  <option
                    key={cargoCondigionItem['код']}
                    value={cargoCondigionItem['код']}
                  >
                    {cargoCondigionItem['название']} (
                    {cargoCondigionItem['краткое_название']})
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className='button-wrapper'>
          <button
            className='button'
            onClick={(event) => {
              event.preventDefault();

              if (refSelectValueWagons.current.value === `-1`) {
                toastr.error(
                  'Количество вагонов не выбрано!',
                  `Ошибка сохранения первичных данных`,
                  {
                    timeOut: 5000,
                    extendedTimeOut: 5000,
                    progressBar: true,
                    escapeHtml: true,
                    closeButton: true,
                  }
                );
                return;
              }

              if (!refInputValueWeightCargo.current.value) {
                toastr.error(
                  'Введите общий вес груза в тоннах не введен!',
                  `Ошибка сохранения первичных данных`,
                  {
                    timeOut: 5000,
                    extendedTimeOut: 5000,
                    progressBar: true,
                    escapeHtml: true,
                    closeButton: true,
                  }
                );
                return;
              }

              if (refSelectTypeOfRawMaterials.current.value === `-1`) {
                toastr.error(
                  'Выберите вид сырья!',
                  `Ошибка сохранения первичных данных`,
                  {
                    timeOut: 5000,
                    extendedTimeOut: 5000,
                    progressBar: true,
                    escapeHtml: true,
                    closeButton: true,
                  }
                );
                return;
              }

              if (refSelectCargoConditions.current.value === `-1`) {
                toastr.error(
                  'Выберите состояние груза!',
                  `Ошибка сохранения первичных данных`,
                  {
                    timeOut: 5000,
                    extendedTimeOut: 5000,
                    progressBar: true,
                    escapeHtml: true,
                    closeButton: true,
                  }
                );
                return;
              }

              setStatePreviewData(true);

              setStateCurrentValueWagons(refSelectValueWagons.current.value);
              setStateInputValueWeightCargo(
                refInputValueWeightCargo.current.value
              );

              const tempTypeItemRawMat = dataTypeOfRawMaterials.filter(
                (typeRawMatItem) =>
                  typeRawMatItem[`код`] ===
                  Number.parseFloat(refSelectTypeOfRawMaterials.current.value)
              );

              setStateSelectTypeOfRawMaterials(tempTypeItemRawMat[0]);

              const tempTypeItemCargCond = dataCargoСonditions.filter(
                (cargoCondigionItem) =>
                  cargoCondigionItem[`код`] ===
                  Number.parseFloat(refSelectCargoConditions.current.value)
              );

              setStateSelectCargoCondition(tempTypeItemCargCond[0]);

              setStateAddedDate(new Date());
            }}
          >
            Сохранить
          </button>
        </div>
      </div>

      <div className='HomePage__down'>
        <div className='current-download'>
          <p>Текущая загрузка:</p>
          <ol>
            <li>
              Колличество вагонов:{' '}
              {stateCurrentValueWagons && stateCurrentValueWagons}
            </li>
            <li>
              Дата добавления:{' '}
              {stateAddedDate && moment(stateAddedDate).format(`LL`)}
            </li>
            <li>
              Тип сырья:{' '}
              {stateSelectTypeOfRawMaterials &&
                stateSelectTypeOfRawMaterials['название']}
            </li>
            <li>
              Состояние:{' '}
              {stateSelectCargoCondition &&
                stateSelectCargoCondition['название']}
            </li>
            <li>
              Вес: {stateInputValueWeightCargo && stateInputValueWeightCargo}
            </li>
          </ol>
          <button
            className='button'
            onClick={(event) => {
              event.preventDefault();

              dispatch(
                saveAndSelectMode({
                  statePreviewData,
                  setStatePreviewData,
                  states: {
                    stateCurrentValueWagons,
                    stateInputValueWeightCargo,
                    stateAddedDate,
                    stateSelectTypeOfRawMaterials,
                    stateSelectCargoCondition,
                  },
                  setStates: {
                    setStateCurrentValueWagons,
                    setStateInputValueWeightCargo,
                    setStateAddedDate,
                    setStateSelectTypeOfRawMaterials,
                    setStateSelectCargoCondition,
                  },
                })
              );
            }}
          >
            Сохранить и подобрать режим
          </button>
        </div>

        <div className='mode-widget'>
          <label className='label'>
            Рекомендованный режим:{' '}
            <input className='input' disabled value={'Режим не подобран'} />
          </label>

          <label className='label'>
            Режим по умолчанию:{' '}
            <select className='input'>
              <option value={1}>не назначен</option>
              <option value={2}>Режим 2</option>
              <option value={3}>Режим 3</option>
              <option value={4}>Режим 4</option>
              <option value={5}>Режим 5</option>
            </select>
          </label>

          <div className='wrapper-progress'>
            <button
              className='button'
              onClick={() => {
                // toastr.success('Процесс сушки завершен', `Успешно`, {
                //   timeOut: 5000,
                //   extendedTimeOut: 5000,
                //   progressBar: true,
                //   escapeHtml: true,
                //   closeButton: true,
                // });

                window.alert(
                  'Режим не подобран!!! Нажмите "Сохранить и подобрать режим"'
                );
              }}
            >
              Начать
            </button>

            <div className='progressbar'>
              <CircularProgressbar
                value={100}
                text={`${100}%`}
                strokeWidth={8}
                className='progressbar-result'
              />

              <div className='current-proccess'>
                Текущий процесс сушки
                <br />
                <span>100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
