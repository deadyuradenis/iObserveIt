# iObserveIt & iObserveItLight

> Данные скрипты вычисляют процент видимости или прокрутки элемента

## Import

```javascript
import iObserveIt from 'iobserveit/src/iObserveIt';
import iObserveItLight from 'iobserveit/src/iObserveItLight';
```

## iObserveIt
> Это основная версия данного скрипта, с основным набором возможностей и настроек.

> Настройка происходит либо через параметры при объявлении, либо через дата-аттрибуты.

### Параметры:

- _mode_            - Режим наблюдения и обновления процентов.
    + Type = *number* ;     Default = '1';
    ===
    1. Type = '1' - Режим, при котором процент не идет на уменьшение, сработает только один раз.
    2. Type = '2' - Режим, при котором высчитывается процент прокрутки, а не процент видимости элемента. Соответственно начало элемента = 0%, а конец 100%.
    3. Type = '3' - Режим, при котором высчитывается процент видимости элемента, всегда.

- _triggerPercent_  - Процент при котором сработает триггер и присвоется класс.
    + Type = *number* ;     Default = 1;

- _multiplier_      - В случае, если высота елемента больше окна бразуера, то процент дополнительно домножается, чтобы при полном заполнении окна процент был равен 100.
    + Type = *boolean* ;    Default = true;

- _action_          - Есть ли какие действия при срабатываении триггера.
    + Type = *boolean* ;    Default = true;

- _activeClass_     - Активный класс
    + Type = *number* ;     Default = 'is-visible';

- _triggerAction_   - Функция, которая начнет выполнение как сработает триггер
    + Type = *function* ;   Default = none;

---

#### Пример объявления с параметрами:

```javascript
const test = new iObserveIt(element, {
    mode: '1',
    triggerPercent: '25',
    multiplier: true,
    action: true,
    activeClass: 'is-active',
    triggerAction: function (){
        console.log('percent = ' + test.getPercent() + '%');
    }
});
```

---

### Аттрибуты:

- data-observe-mode
- data-observe-multiplier 
- data-observe-action 
- data-observe-trigger          
- data-observe-class

---

### Методы:

- init() - *Начинает наблюдение*
- stop() - *Останавливает наблюдение*
- run() - *Продолжает наблюдение*
- update() - *Обновляет значения*
- getElement() - *Возвращает отслеживаемый элемент*
- getPercent() - *Возвращает текущий процент видимости элемента*
- setPercent(percent) - *Задает процент видимости элемента*


## iObserveItLight
> Данная версия является более легкой и имеет только один режим, который вычисляет видимость элемента, постоянно.

> Настройка происходит либо через параметры при объявлении, либо через дата-аттрибуты.

### Параметры:

- _triggerPercent_  - Процент при котором сработает триггер и присвоется класс.
    + Type = *number* ;     Default = 1 ;

- _action_          - Есть ли какие действия при срабатываении триггера.
    + Type = *boolean* ;    Default = true ;

- _activeClass_     - Активный класс
    + Type = *number* ;     Default = 'is-visible' ;

- _triggerAction_   - Функция, которая начнет выполнение как сработает триггер
    + Type = *function* ;   Default = none ;

---

#### Пример объявления с параметрами:

```javascript
const test = new iObserveItLight(element, {
    triggerPercent: '25',
    action: true,
    activeClass: 'is-active',
    triggerAction: function (){
        console.log('percent = ' + test.getPercent() + '%');
    }
});
```

---

### Аттрибуты:

- data-observe-action 
- data-observe-trigger          
- data-observe-class

---

### Методы:

- init() - *Начинает наблюдение*
- stop() - *Останавливает наблюдение*
- run() - *Продолжает наблюдение*
- update() - *Обновляет значения*
- getElement() - *Возвращает отслеживаемый элемент*
- getPercent() - *Возвращает текущий процент видимости элемента*
- setPercent(percent) - *Задает процент видимости элемента*

