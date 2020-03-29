import React from 'react';
import debounce from 'lodash/debounce';

import Product, { IProductProps } from './components/Product';

// Генерируем набор тестовых товаров, чтобы не вбивать руками
let products: IProductProps[] = Array(30)
  .fill(0)
  .map(() => ({
    title: 'Тумба прикроватная Rubus с двумя ящиками',
    rating: Number((Math.random() * 5 + 1).toFixed(2)),
    price: {
      new: Math.round(Math.random() * 100000),
      old: Math.round(Math.random() * 100000),
      hot: !!Math.round(Math.random() * 1),
    },
    color: 'Черный',
    material: 'Ткань',
    size: 'ш. 349 х в. 234 х г. 323',
    mechanism: 'Французская раскладушк',
    seller: 'Laska Family',
  }));

const App: React.FC = () => {
  // Максимальное отображение товаров
  const [maxCount, setMaxCount] = React.useState<number>(5);

  // Ссылка на DOM-элемент блока wrapper
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Объявляем функцию для отслеживания скролла.
  // Обязательно сохраняем одну и ту же ссылку у onScroll, чтобы позже удалить слушатель.
  // Для этого используем useCallback
  // ###############
  // UPD 29.03.2020: В случае с событием scroll, лучше использовать throttle, вместо debounce. Отдельное спасибо Alexander Kim.
  // Сравнить throttle и debounce можно тут http://emn178.github.io/js-throttle-debounce/samples/demo/
  const onScroll = React.useCallback(
    debounce((e: any) => {
      console.log('scroll');
      if (e.target) {
        const isEnd = e.target.scrollWidth - e.target.scrollLeft - 250 <= e.target.clientWidth;
        if (isEnd) {
          // Если дошли до конца, показываем 1 новый товар
          setMaxCount(count => count + 1);
        }
      }
    }, 50),
    [],
  );

  // Следим за изменениями переменных maxCount, onScroll.
  // Если макс. отображаемых товаров >= кол-во товаров
  // Удаляем слушатель скролла у основного блока wrapper
  React.useEffect(() => {
    if (wrapperRef.current && maxCount >= products.length) {
      wrapperRef.current.removeEventListener('scroll', onScroll);
    }
  }, [maxCount, onScroll]);

  // Устанавливаем слушатель скролла на блок wrapper
  // И очищаем, если произошло демонтирование компонента App
  React.useEffect(() => {
    const { current } = wrapperRef;
    current?.addEventListener('scroll', onScroll);
    return () => {
      current?.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div ref={wrapperRef} className="wrapper">
      <ul className="columns columns--first">
        <li></li>
        <li>Рейтинг</li>
        <li>Цена</li>
        <li>Цвет</li>
        <li>Материал</li>
        <li>Размеры</li>
        <li>Механизм</li>
        <li>Продавец</li>
      </ul>
      {products.slice(0, maxCount).map((obj: IProductProps, index: number) => (
        <Product key={index} {...obj} />
      ))}
    </div>
  );
};

export default App;
