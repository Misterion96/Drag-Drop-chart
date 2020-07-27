import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appRangeSelection]'
})
export class RangeSelectionDirective {
  rangeBarActive: Element;
  @Input('childSelector') childSelector: string;

  constructor(private _el: ElementRef) {
  }

  @HostListener('dragstart', ['$event.target']) onDragstart(target: Element) {
    this.rangeBarActive = target;
  }

  @HostListener('dragend', ['$event.target']) onDragend(target: Element) {
    const typeSide = target.getAttribute('data-range');
    let getOutRangeSib, getInRangeSib

    if (typeSide === 'left') {
      getOutRangeSib = 'previousElementSibling'
      getInRangeSib = 'nextElementSibling'
    } else {
      getOutRangeSib = 'nextElementSibling'
      getInRangeSib = 'previousElementSibling'
    }

    let outRangeSib = target[getOutRangeSib]
    let inRangeSib = target[getInRangeSib]

    while (outRangeSib) {
      outRangeSib.setAttribute('outside', typeSide)
      outRangeSib.classList.remove('active')
      outRangeSib = outRangeSib[getOutRangeSib]
      if ((outRangeSib && outRangeSib.getAttribute('outside')) || outRangeSib === null) {
        break;
      }
    }
    while (!inRangeSib.getAttribute('data-range')) {
      inRangeSib.classList.add('active')
      inRangeSib.removeAttribute('outside')
      inRangeSib = inRangeSib[getInRangeSib];
    }
    this.rangeBarActive = null;
  }

  @HostListener('dragover', ['$event', "$event.target"]) onDragover(event: MouseEvent, target: Element) {
    const actRngEl = this.rangeBarActive;
    const typeSideRange = actRngEl.getAttribute('data-range');
    const childSel = this.childSelector.slice(1);
    const overDragEl = target.classList.contains(childSel) ? target : target.closest(this.childSelector)
    const nextElSib = 'nextElementSibling'
    const prevElSib = 'previousElementSibling'

    if (!overDragEl ||
      (overDragEl.getAttribute('outside') && overDragEl.getAttribute('outside') !== typeSideRange)
    ) {
      return
    }

    const next = overDragEl[nextElSib] ? overDragEl[nextElSib].getAttribute('data-range') : null
    const prev = overDragEl[prevElSib] ? overDragEl[prevElSib].getAttribute('data-range') : null
    if (
      (typeSideRange === 'left' && (next === 'right' || prev === 'right'))
      ||
      (typeSideRange === 'right' && (next === 'left' || prev === 'left'))
    ) {
      return
    }

    const nextEl = getNextElementByX(event.clientX, overDragEl);
    if (nextEl && actRngEl === nextEl[prevElSib] || actRngEl === nextEl) {
      return;
    }
    this._el.nativeElement.insertBefore(actRngEl, nextEl);
  }
}

const getNextElementByX = (curPosX, el: Element) => {
  const curElCoord = el.getBoundingClientRect();
  const getElCenter = curElCoord.x + curElCoord.width / 2;
  return (curPosX < getElCenter) ? el : el.nextElementSibling;
};


