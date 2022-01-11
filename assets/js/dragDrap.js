let dragSrcEl = null;


function dragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
}


function dragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); 
  }
  this.classList.add('drag-over');

  e.dataTransfer.dropEffect = 'move';  

  return false;
}

function dragEnter(e) {
  // this / e.target is the current hover target.
}

function dragLeave(e) {
  this.classList.remove('drag-over');  
}

function handleDrop(e) {

  if (e.stopPropagation) {
    e.stopPropagation(); 
  }
  if (dragSrcEl != this) {
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    
  }
  this.classList.remove('drag-over');
  return false;
}

function dragEnd(e) {
  this.classList.remove('drag-over');
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', dragStart, false);
  elem.addEventListener('dragenter', dragEnter, false)
  elem.addEventListener('dragover', dragOver, false);
  elem.addEventListener('dragleave', dragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', dragEnd, false);
}

function setDragDrop(items) {
    return items.forEach(item => {
        addDnDHandlers(item);
    });
}

export { setDragDrop };