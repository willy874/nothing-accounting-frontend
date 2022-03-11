export function AsyncAction(funcs, initData) {
  return new Promise((resolve, reject) => {
    (async function () {
      let data = initData;
      for (let index = 0; index < funcs.length; index++) {
        const func = funcs[index];
        if (typeof func === 'function') {
          try {
            data = await func(data);
          } catch (error) {
            reject(error);
          }
        }
      }
      resolve(data);
    })();
  });
}

export function conditionData(value, defaultValue) {
  return value === defaultValue ? defaultValue : value || defaultValue;
}
const png1px = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAC4jAAAuIwF4pT92AAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYTg3MzFiOSwgMjAyMS8wOS8wOS0wMDozNzozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0xMi0xM1QwNzoxNzoyOSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMi0xM1QwNzoxNzoyOSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMTItMTNUMDc6MTc6MjkrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmNmN2U5MjFjLTZjZTEtMzk0Yy1hNmU4LWIzZjA0NmRmOWJkMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjZjdlOTIxYy02Y2UxLTM5NGMtYTZlOC1iM2YwNDZkZjliZDAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZjdlOTIxYy02Y2UxLTM5NGMtYTZlOC1iM2YwNDZkZjliZDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNmN2U5MjFjLTZjZTEtMzk0Yy1hNmU4LWIzZjA0NmRmOWJkMCIgc3RFdnQ6d2hlbj0iMjAyMS0xMi0xM1QwNzoxNzoyOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj3/j7AAAAAMSURBVAgdY/j//z8ABf4C/p/KLRMAAAAASUVORK5CYII=';
/**
 * 清除拖拉顯示元素
 * @param {DragEvent} event
 */
export function clearDragImage(event) {
  if (event.dataTransfer) {
    const img = new Image();
    img.src = png1px;
    event.dataTransfer.setDragImage(img, 0, 0);
  }
}

export function getBoundingClientRect(element) {
  if (!element || !element.getBoundingClientRect) {
    return null;
  }
  return element.getBoundingClientRect();
}

export function getViewportOffset(element) {
  const doc = document.documentElement;
  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;
  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;
  const box = getBoundingClientRect(element);
  const {
    left: retLeft,
    top: rectTop,
    width: rectWidth,
    height: rectHeight
  } = box;
  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;
  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;
  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  };
}