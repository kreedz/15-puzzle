(function(){
    // detecting the winning
    function isWin(){
        if (!tds[numbersLength - 1].innerHTML) {
            for (var i = 1; i < numbersLength; ++i) {
                if (tds[i - 1].innerHTML != i) return false;
            }
        } else return false;
        return true;
    }
    
    // create rows & cells
    function createFields() {
        updateValues();
        for (var i = 0; i < dimension; ++i) {
            var tr = tbl.insertRow(-1);
            for (var j = 0; j < dimension; ++j) {
                tr.insertCell(j);
            }
        }
    }
    
    // remove all rows from table
    function removeFields() {
        while (tbl.firstChild) {
            tbl.removeChild(tbl.firstChild);
        }
    }
    
    function updateValues() {
        dimension = +document.getElementById('dimension').value;
        numbers = [];
        for (var i = 1; i <= dimension * dimension; ++i) {
            numbers.push(i);
        }
        numbersConst = numbers.slice(0);
        numbersLength = numbers.length;
    }
    
    // exchange of empty cell with clicked cell
    function swap(a, b) {
        var t = a.innerHTML;
        a.innerHTML = b.innerHTML;
        b.innerHTML = t;
        b.style.backgroundColor = colorEmptyCell;
        a.style.backgroundColor = colorMovingCell;
        setTimeout(function() {
            if (a.style.backgroundColor != colorEmptyCell) {
                a.style.backgroundColor = 'white';
            }
        }, 500);
    }
    
    var numbers = [],
        dimension = +document.getElementById('dimension').value,
        tbl = document.getElementsByTagName('tbody')[0],
        numbersConst = numbers.slice(0),
        numbersLength = numbers.length,
        colorEmptyCell = 'rgb(204, 204, 204)',
        colorMovingCell = 'rgb(235, 235, 235)';
    
    createFields();

    var tds = document.getElementsByTagName('td'),
        logicFc = function() {
            var rowIndex = this.parentElement.rowIndex,
                cellIndex = this.cellIndex;
            // if not first column
            if (cellIndex && !this.previousElementSibling.innerHTML) {
                swap(this.previousElementSibling, this);
            // if not last column
            } else if (cellIndex != dimension - 1 && !this.nextElementSibling.innerHTML) {
                swap(this.nextElementSibling, this);
            // if not first row
            } else if (rowIndex && !tbl.children[rowIndex - 1].children[cellIndex].innerHTML) {
                swap(tbl.children[rowIndex - 1].children[cellIndex], this);
            // if not last row
            } else if (rowIndex != dimension - 1 && !tbl.children[rowIndex + 1].children[cellIndex].innerHTML) {
                swap(tbl.children[rowIndex + 1].children[cellIndex], this);
            }
            
            if (isWin()) {
                alert("You're win!");
            }
        }
    
    // fill fields with numbers
    var fillFields = function() {
        numbers = numbersConst.slice(0);
        for (var i = 0; i < numbersLength; ++i) {
            var value = numbers[Math.floor(Math.random(numbers.length) * (numbersLength - i))];
            if (numbersLength == value) {
                tds[i].style.backgroundColor = colorEmptyCell;
                tds[i].innerHTML = '';
            } else {
                tds[i].innerHTML = value;
            }
            numbers.splice(numbers.indexOf(value), 1);
            tds[i].addEventListener('click', logicFc, false);
            tds[i].addEventListener('mouseover', function() {
                if (this.innerHTML) {
                    this.style.backgroundColor = colorMovingCell;
                }
            }, false);
            tds[i].addEventListener('mouseout', function() {
                if (this.innerHTML) {
                    this.style.backgroundColor = 'white';
                }
            }, false);
        }
    },
        buildFields = function() {
            removeFields();
            createFields();
            fillFields();
        }
        
    buildFields();
    
    document.getElementById('newgame').addEventListener('click', buildFields, false);
    
    // keyboard control
    document.onkeydown = function(e) {
        function getEmptyCell() {
            for (var i = 0; i < tds.length; ++i) {
                if (!tds[i].innerHTML) {
                    return tds[i];
                }
            }
        }
        
        var td = getEmptyCell(),
            cellIndex = td.cellIndex,
            rowIndex = td.parentElement.rowIndex;
            
        switch (e.keyCode) {
            // left
            case 37:
                if (cellIndex != dimension - 1) {
                    swap(td, td.nextElementSibling);
                }
                break;
            // up
            case 38:
                if (rowIndex != dimension - 1) {
                    swap(td, tbl.children[rowIndex + 1].children[cellIndex]);
                }
                break;
            // right
            case 39:
                if (cellIndex) {
                    swap(td, td.previousElementSibling);
                }
                break;
            // down
            case 40:
                if (rowIndex) {
                    swap(td, tbl.children[rowIndex - 1].children[cellIndex]);
                }
                break;
        }
    }    
})()