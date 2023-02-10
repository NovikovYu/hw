import {
  // createContext,
  createRef,
  // JSXElementConstructor,
  // Key,
  // ReactElement,
  // ReactFragment,
  useState
} from 'react';
import classNames from 'classnames/bind';

import classes from './combo-box.module.scss';
// import React from 'react';

let cx = classNames.bind(classes);
const inputRef = createRef<HTMLInputElement>();

export function ComboBox(props: {
  defaultValue: string;
  options: Array<string>;
}) {
  const [inputValue, setInputValue] = useState(
    props.defaultValue ? props.defaultValue : ''
  );
  const [isListOpen, setIsListOpen] = useState(false);
  const [actualOptions, setActualOptions] = useState(
    props.options ? props.options : ['']
  );

  // контролиреум инпут
  const changeInputValue = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
    filterOptionsList(e.target.value);
  };

  // подверждаем выбор при клике Enter
  const onSubmit = (e: { code: string }) => {
    if (e.code === 'Enter') {
      // мы снимаем фокус с инпута и его содержимое автоматически считается финальным выбором
      inputRef.current?.blur();
    }
  };

  // фильтруем список
  const filterOptionsList = (str: string) => {
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

    if (newArr.length == 0) {
      setIsListOpen(false);
    } else {
      setIsListOpen(true);
    }
  };

  //выбриаем опцию при клике в неё
  const selectOption = (el: string) => {
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

    setIsListOpen(false);
  };

  //собираем список опций
  const optionsList = actualOptions.map((el: string) => {
    return (
      <li
        className={classes['combo-box__li']}
        key={el}
        //блюр сработает до клика, поэтому обрабатываем нажатие / тыкание
        onMouseDown={() => selectOption(el)}
        onPointerDown={() => selectOption(el)}
      >
        {el}
      </li>
    );
  });

  //делаем что-что, что должно делаться, при выборе опции
  const submitOptionSelection = (option: string) => {
    if (option != '' && option != inputValue) {
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
        <ul className={classes['combo-box__list']}>{optionsList}</ul>

        <input
          ref={inputRef}
          onFocus={openList}
          onBlur={closeList}
          onKeyDown={onSubmit}
          value={inputValue}
          onChange={changeInputValue}
          className={classes['combo-box__input']}
          placeholder="Movie"
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eum quis
        molestiae fugiat repellendus aliquid quisquam fuga. Soluta nesciunt
        dignissimos explicabo, temporibus et dicta laudantium porro, molestias
        eum fugit ullam. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi eum quis molestiae fugiat repellendus aliquid quisquam fuga.
        Soluta nesciunt dignissimos explicabo, temporibus et dicta laudantium
        porro, molestias eum fugit ullam. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Animi eum quis molestiae fugiat repellendus aliquid
        quisquam fuga. Soluta nesciunt dignissimos explicabo, temporibus et
        dicta laudantium porro, molestias eum fugit ullam.
      </p>
    </>
  );
}
