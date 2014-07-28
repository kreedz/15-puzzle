(function(){
    var tds = document.getElementsByTagName('td'),
        table = document.getElementsByTagName('tbody')[0],
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9],
        numbersLength = numbers.length,
        logicFc = function(){
            var rowIndex = this.parentElement.rowIndex,
                cellIndex = this.cellIndex,
                swap = function(a, b){
                    var t = a.innerHTML;
                    a.innerHTML = b.innerHTML;
                    b.innerHTML = t;
                }
            // не первый столбец
            if (cellIndex && !this.previousElementSibling.innerHTML) {
                swap(this.previousElementSibling, this);
            // не последний столбец
            } else if (cellIndex != Math.sqrt(numbersLength) - 1 && !this.nextElementSibling.innerHTML) {
                swap(this.nextElementSibling, this);
            // не первая строка
            } else if (rowIndex && !table.children[rowIndex - 1].children[cellIndex].innerHTML) {                   
                swap(table.children[rowIndex - 1].children[cellIndex], this);
            // не последняя строка
            } else if (rowIndex != Math.sqrt(numbersLength) - 1 && !table.children[rowIndex + 1].children[cellIndex].innerHTML) {            
                swap(table.children[rowIndex + 1].children[cellIndex], this);
            }
        }
        
    for(var i = 0; i < numbersLength; ++i) {
        var value = numbers[Math.floor(Math.random(numbers.length) * (numbersLength - i))];
        tds[i].innerHTML = numbersLength == value ? '' : value;
        numbers.splice(numbers.indexOf(value), 1);
        tds[i].addEventListener("click", logicFc, false);        
    }
})()