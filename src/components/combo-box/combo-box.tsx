import { createContext, createRef, useState } from 'react';
import classNames from 'classnames/bind';

import classes from './combo-box.module.scss';

let cx = classNames.bind(classes);
const inputRef = createRef();

export function ComboBox(props) {
  const [inputValue, setInputValue] = useState(
    props.defaultValue ? props.defaultValue : ''
  );
  const [isListOpen, setIsListOpen] = useState(false);
  const [actualOptions, setActualOptions] = useState(
    props.options ? props.options : ['']
  );

  // контролиреум инпут
  const changeInputValue = (e) => {
    setInputValue(e.target.value);
    filterOptionsList(e.target.value);
  };

  // подверждаем выбор при клике Enter
  const onSubmit = (e) => {
    if (e.code === 'Enter') {
      // мы снимаем фокус с инпута и его содержимое автоматически считается финальным выбором
      inputRef.current.blur();
    }
  };

  // фильтруем список
  const filterOptionsList = (str) => {
    let newArr = [...props.options];

    newArr = newArr.filter((el) => {
      // игнорируем регистр
      let lowEl = el.toLowerCase();
      let lowStr = str.toLowerCase();

      // ищем содержимое инпута в опциях
      if (lowEl.indexOf(lowStr) != -1) {
        return el;
      }
    });

    setActualOptions(newArr);
  };

  //выбриаем опцию при клике в неё
  const selectOption = (el) => {
    console.log('el', el);

    setInputValue(el);

    setIsListOpen(false);

    // глобально подтверждаем выбор опции
    submitOptionSelection(el);
  };

  // открываем список
  const openList = () => {
    setIsListOpen(true);
  };

  // закрываем список
  const closeList = () => {
    // глобально подтверждаем выбор опции
    submitOptionSelection(inputValue);

    // закидываем в конец очерди, чтобы выбор опиции успел отработать
    setIsListOpen(false);
  };

  //собираем список опций
  const optionsList = actualOptions.map((el) => {
    return (
      <li
        className={classes['combo-box__li']}
        key={el}
        onClick={() => selectOption(el)}
        // onClick={() => console.log(el)}
      >
        {el}
      </li>
    );
  });

  //делаем что-что, что должно делаться, при выборе опции
  const submitOptionSelection = (option) => {
    if (option != '') {
      console.log('мы выбрали', option);
    }
  };

  //классы для компонента
  let comboBoxStyles = cx({
    'combo-box': true,
    active: isListOpen
  });

  return (
    <>
      <div className={comboBoxStyles}>
        <input
          ref={inputRef}
          onFocus={openList}
          onBlur={() => {
            setTimeout(() => {
              closeList();
            }, 100);
          }}
          onKeyDown={onSubmit}
          value={inputValue}
          onChange={changeInputValue}
          className={classes['combo-box__input']}
          placeholder="Movie"
        />

        <ul className={classes['combo-box__list']}>{optionsList}</ul>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eum quis
        molestiae fugiat repellendus aliquid quisquam fuga. Soluta nesciunt
        dignissimos explicabo, temporibus et dicta laudantium porro, molestias
        eum fugit ullam.
      </p>
    </>
  );
}
