class iObserveIt {
    #defaultMode = 1;
    #defaultTriggerPercent = 1;
    #defaultActiveClass = 'is-visible';
    #defaultMultiplier = true;
    #defaultAction = true;

    constructor(element, options) {
        this.element =          element;
        this.mode =             element.getAttribute('data-observe-mode')       ? element.getAttribute('data-observe-mode')                     : (options.mode                     ? options.mode              : this.#defaultMode);
        this.triggerPercent =   element.getAttribute('data-observe-trigger')    ? element.getAttribute('data-observe-trigger')                  : (options.triggerPercent           ? options.triggerPercent    : this.#defaultTriggerPercent);
        this.activeClass =      element.getAttribute('data-observe-class')      ? element.getAttribute('data-observe-class')                    : (options.activeClass              ? options.activeClass       : this.#defaultActiveClass);
        this.multiplier =       element.getAttribute('data-observe-multiplier') ? JSON.parse(element.getAttribute('data-observe-multiplier'))   : (options.multiplier != undefined  ? options.multiplier        : this.#defaultMultiplier);
        this.action =           element.getAttribute('data-observe-action')     ? JSON.parse(element.getAttribute('data-observe-action'))       : (options.action != undefined      ? options.action            : this.#defaultAction);
        this.triggerAction =    options.triggerAction                           ? options.triggerAction                                         : function (){};

        document.addEventListener('DOMContentLoaded', () =>{ 
            this.init()
        })

        document.addEventListener('scroll', () => {
            this.onScroll()
        })
    }

    onScroll() {
        this.update()
    }

    stop() {
        this.onScroll = function (){};
    }
    run() {
        this.onScroll = this.update();
    }

    init() {
        this.element.setAttribute('data-observe-percent', '0');
        this.update()
    }

    getElement() {
        return this.element;
    }
    getPercent() {
        return this.element.getAttribute('data-observe-percent');
    }
    setPercent(percent) {
        this.element.setAttribute('data-observe-percent', percent);
    }

    update() {
        let that =                  this;
        let windowHeight =          window.innerHeight;
        let windowOffsetTop =       window.pageYOffset;
        let windowOffsetBottom =    windowOffsetTop + window.innerHeight;
        let elementHeight =         that.element.offsetHeight;
        let elementOffsetTop =      that.element.offsetTop;
        let elementOffsetBottom =   elementOffsetTop + elementHeight;
        let innerTop =              elementOffsetBottom - windowOffsetTop;
        let innerBottom =           windowOffsetBottom - elementOffsetTop;
        let windowMultiplier =      that.multiplier == true ? (windowHeight < elementHeight ? windowHeight / elementHeight : 1) : 1;
        let percent =               that.getPercent();

        if (elementOffsetBottom >= windowOffsetTop && windowOffsetBottom >= elementOffsetTop) {
            let resultPercent = percent;

            // resultPercent = Math.round(useMode(that.mode)* 100) / 100;
            resultPercent = Math.round(useMode(that.mode));
            that.setPercent(resultPercent)

            if(that.action){
                actions(resultPercent)
            }
        }

        function useMode(mode){
            let result;
            switch (mode) {
                case '1':
                    result = mode1()
                    break;
                    
                case '2':
                    result = mode2()
                    break;
                    
                case '3':
                    result = mode3()
                    break;
                    
                default:
                    result = mode1()
                    break;
            }

            return result;

            // MODE UpdateOneTime
            function mode1() {  
                if (innerBottom <= elementHeight * windowMultiplier) {
                    let temp = (innerBottom / elementHeight * 100) / windowMultiplier;

                    if (percent <= temp) {
                        percent = temp
                    }
                } else if (innerTop <= elementHeight * windowMultiplier) {
                    let temp = (innerTop / elementHeight * 100) / windowMultiplier;

                    if (percent <= temp) {
                        percent = temp
                    }
                } else {
                    percent = 100;
                }

                return percent;
            }

            // MODE UpdateOnlyDown
            function mode2() { 
                if (innerBottom <= elementHeight) {
                    percent = (innerBottom / elementHeight * 100) / windowMultiplier;
                } else {
                    percent = 100;
                }

                return percent;
            }
            
            // MODE UpdateAlways
            function mode3() {
                if (innerBottom <= elementHeight * windowMultiplier) {
                    percent = (innerBottom / elementHeight * 100) / windowMultiplier;
                } else if (innerTop <= elementHeight * windowMultiplier) {
                    percent = (innerTop / elementHeight * 100) / windowMultiplier;
                } else {
                    percent = 100;
                }

                return percent;
            }
        }

        function actions(percent) {
            if(percent >= that.triggerPercent){
                that.element.classList.add(that.activeClass)
                that.triggerAction()
            } else{
                that.element.classList.remove(that.activeClass)
            }
        }
    };
}

export default iObserveIt;