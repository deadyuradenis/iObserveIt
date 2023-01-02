class iObserveItLight {
    #defaultTriggerPercent = 1;
    #defaultActiveClass = 'is-visible';
    #defaultAction = true;
    #observeOptions = {
        root: null,
        rootMargin: '0px',
        threshold: this.buildThresholdList()
    };

    constructor(element, options) {
        this.element =          element;
        this.triggerPercent =   element.getAttribute('data-observe-trigger')    ? element.getAttribute('data-observe-trigger')                  : (options.triggerPercent           ? options.triggerPercent    : this.#defaultTriggerPercent);
        this.activeClass =      element.getAttribute('data-observe-class')      ? element.getAttribute('data-observe-class')                    : (options.activeClass              ? options.activeClass       : this.#defaultActiveClass);
        this.action =           element.getAttribute('data-observe-action')     ? JSON.parse(element.getAttribute('data-observe-action'))       : (options.action != undefined      ? options.action            : this.#defaultAction);
        this.triggerAction =    options.triggerAction                           ? options.triggerAction                                         : function (){};

        document.addEventListener('DOMContentLoaded', () =>{ 
            this.init()
        })
    }

    init(){
        this.element.setAttribute('data-observe-percent', '0');
        this.observer.observe(this.element)
    }

    stop(){
        this.observer.unobserve(this.element)
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
      
    observer = new IntersectionObserver((entries) => {
        let that = this;
        let windowHeight = window.innerHeight;
        let elementHeight = that.element.offsetHeight;
        let windowMultiplier = windowHeight < elementHeight ? windowHeight / elementHeight : 1;

        function actions(percent) {
            if(percent >= that.triggerPercent){
                that.element.classList.add(that.activeClass)
                that.triggerAction()
            } else{
                that.element.classList.remove(that.activeClass)
            }
        }

        entries.forEach(entry => {
            const item = entry.target;

            let percent = Math.round(entry.intersectionRatio / windowMultiplier * 100)

            if (entry.isIntersecting) {
                that.setPercent(percent)
            } 
            
            if(that.action){
                actions(percent)
            }
        })

    }, 
    this.#observeOptions || {}
    );
           

    buildThresholdList() {
        let thresholds = [];
        let numSteps = 1000;
      
        for (let i=1.0; i<=numSteps; i++) {
          let ratio = i/numSteps;
          thresholds.push(ratio);
        }
      
        thresholds.push(0);
        return thresholds;
    }
}

export default iObserveItLight;