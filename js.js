(function(){
    // detecting the winning
    function isWin(){
        if (!tds[numbersLength - 1].innerHTML) {
            for(var i = 1; i < numbersLength; ++i) {
                if (tds[i - 1].innerHTML != i) return false;
            }
        } else return false;
        return true;
    }

    var tds = document.getElementsByTagName('td'),
        table = document.getElementsByTagName('tbody')[0],
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9],
        numbersConst = numbers.slice(0),
        numbersLength = numbers.length,
        dimension = Math.sqrt(numbersLength),
        logicFc = function(){
            var rowIndex = this.parentElement.rowIndex,
                cellIndex = this.cellIndex,
                swap = function(a, b){
                    var t = a.innerHTML;
                    a.innerHTML = b.innerHTML;
                    b.innerHTML = t;
                }
            // if not first column
            if (cellIndex && !this.previousElementSibling.innerHTML) {
                swap(this.previousElementSibling, this);
            // if not last column
            } else if (cellIndex != dimension - 1 && !this.nextElementSibling.innerHTML) {
                swap(this.nextElementSibling, this);
            // if not first row
            } else if (rowIndex && !table.children[rowIndex - 1].children[cellIndex].innerHTML) {
                swap(table.children[rowIndex - 1].children[cellIndex], this);
            // if not last row
            } else if (rowIndex != dimension - 1 && !table.children[rowIndex + 1].children[cellIndex].innerHTML) {
                swap(table.children[rowIndex + 1].children[cellIndex], this);
            }
            
            if (isWin()) {
                alert("You're win!");
            }
        }
        
    var fillFields = function(){
        numbers = numbersConst.slice(0);
        for(var i = 0; i < numbersLength; ++i) {
            var value = numbers[Math.floor(Math.random(numbers.length) * (numbersLength - i))];
            tds[i].innerHTML = numbersLength == value ? '' : value;
            numbers.splice(numbers.indexOf(value), 1);
            tds[i].addEventListener('click', logicFc, false);
        }    
    }
    
    fillFields();
    
    document.getElementById('newgame').addEventListener('click', fillFields, false);
})()