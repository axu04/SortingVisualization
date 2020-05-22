//Sorting Algorithm Visualization JS implementation

//Animation speed 
const ANIMATION_SPEED = 4;

//Creating new DOM element for the each Array bar
let newElement = document.createElement('barGraph');
document.body.appendChild(newElement)
//Creating new DOM element for the buttons
var button = document.createElement("buttons");
document.body.appendChild(button);

//Create a button for each type of sorting algorithm
var body = document.getElementsByTagName("buttons")[0];
var reset = document.createElement("button");
reset.innerHTML = "Create New Array";
reset.style.backgroundColor = '#e75480';
var bubble = document.createElement("button");
bubble.innerHTML = "Bubble Sort";
var insertion = document.createElement("button");
insertion.innerHTML = "Insertion Sort";
var heap = document.createElement("button");
heap.innerHTML = "Heap Sort";
var merge = document.createElement("button");
merge.innerHTML = "Merge Sort";
var selection = document.createElement("button");
selection.innerHTML = "Selection Sort";

//Add each button to the DOM
body.appendChild(reset);
body.appendChild(bubble);
body.appendChild(insertion);
body.appendChild(heap);
body.appendChild(merge);
body.appendChild(selection);

//global array, array animation, and screen size values
var array = [];
var animationArray = [];
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

//createArray function
//Does: Creates an array of random values, shuffles the values, and creates 
//      new div elements for each randomly generated number
function createArray() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        for (let i = 0; i < Math.floor(screenWidth/10); ++i) {
                array.push(randomIntOnInterval(screenHeight*0.05, screenHeight*0.9));
        }
        function shuffleArray(inputArray) {
                for (var i = inputArray.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = inputArray[i];
                        inputArray[i] = inputArray[j];
                        inputArray[j] = temp;
                }
        }
        shuffleArray(array);
        let temp = document.getElementsByTagName('barGraph');
        for (let c in array) {
                let newElement1 = document.createElement('div');
                newElement1.id = array[c]; 
                newElement1.className = "arrayBar";
                newElement1.style.height = array[c] + "px";
                newElement1.style.backgroundColor = 'pink';
                temp[0].appendChild(newElement1);
        }
}

//randomIntOnInterval function
//Does: Returns a random number on a given interval
function randomIntOnInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

createArray();
var bars = document.getElementsByTagName("barGraph");
var divs = bars[0].childNodes;

//Reset Button Event Listener 
reset.addEventListener("click", () => {
        enableButtons();
        clearAnimations();
        while(array.length) {
                array.pop();
        }
        let bars = document.getElementsByTagName("barGraph");
        while (bars[0].firstChild) {
                bars[0].removeChild(bars[0].firstChild);
        }
        createArray();
});

//clearAnimations function
//Does: Clears all animations stored in all animation arrays
function clearAnimations() {
        for (let i = 0; i < animationArray.length; i++) {
                clearTimeout(animationArray[i]);
        }
        for (let i = 0; i < heapAnimation.length; i++) {
                bubbleAnimation.pop();
        }
        for (let i = 0; i < heapAnimation.length; i++) {
                insertionAnimation.pop();
        }
        for (let i = 0; i < heapAnimation.length; i++) {
                heapAnimation.pop();
        }
        for(let i = 0; i < mergeAnimation.length; i++) {
                mergeAnimation.pop();
        }
        for (let i = 0; i < selectionAnimation.length; i++) {
                selectionAnimation.pop();
        }
        animationArray = [];
        bubbleAnimation = [];
        insertionAnimation = [];
        heapAnimation = [];
        mergeAnimation = [];
        selectionAnimation = [];
}

//Bubble Sort Event Listener 
bubble.addEventListener("click", () => {
        disableButtons();
        getBubbleAnimation(array, divs);
})

//Insertion Sort Event Listener 
insertion.addEventListener("click", () => {
        disableButtons();
        getInsertionAnimation(array, divs);
})

//Heap Sort Event Listener 
heap.addEventListener("click", () => {
        disableButtons();
        heapAnimationFunc(array, divs);
})

//Merge Sort Event Listener 
merge.addEventListener("click", () => {
        disableButtons();
        getMergeAnimations(array, divs);
})

//Selection Sort Event Listener 
selection.addEventListener("click", () => {
        disableButtons();
        getSelectionAnimation(array, divs);
        console.log(array);
})

//disableButtons Function
//Does: Disables all sorting buttons until a new array is array is created
function disableButtons() {
        let button_divs = document.getElementsByTagName('buttons');
        let buttons_array = button_divs[0].childNodes;
        for (let i = 1; i < buttons_array.length; i++) {
                buttons_array[i].disabled = true;
        }
}

//enableButtons Function
//Does: Enables all sorting buttons after a new array is created 
function enableButtons() {
        let button_divs = document.getElementsByTagName('buttons');
        let buttons_array = button_divs[0].childNodes;
        for (let i = 1; i < buttons_array.length; i++) {
                buttons_array[i].disabled = false;
        }
}

//typeCheck function
//Does: Checks the type of animation being requested (arrayBar swapping or color changing)
function typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i) {
        if (typeChange === 'color') {
                colorSwap(firstIndex, secondIndex, instruction, bars, i);
        } else {
                barSwap(firstIndex, secondIndex, bars, i);
        } 
}

//colorSwap function
//Does: Changes the colors of two array bars being checked. If the
//      bars are first being checked, they are turned red, if they
//      are being reverted, they are turned pink.
function colorSwap(firstIndex, secondIndex, instruction, bars, i) {
        let firstBar = bars[firstIndex].style;
        let secondBar = bars[secondIndex].style;
        let changeColor = instruction === 'change' ? 'red' : 'pink';
        animationArray.push(setTimeout( () => {
                firstBar.backgroundColor = changeColor;
                secondBar.backgroundColor = changeColor;
        }, i*ANIMATION_SPEED));
}

//barSwap function
//Does: Swaps the heights of two array bars given the first and 
//      second indices.
function barSwap(firstVal, secondVal, bars, i) {
        animationArray.push(setTimeout( () => {
                let temp = bars[firstVal].style.height;
                bars[firstVal].style.height = bars[secondVal].style.height;
                bars[secondVal].style.height = temp;
        }, i*ANIMATION_SPEED));
}

//Bubble Sort Animations Array
var bubbleAnimation = [];

//getBubbleAnimation function
//Does: Sorts and performs the visualization of a Bubble Sort 
function getBubbleAnimation(input, bars) {
        bubbleSort(input);
        for (let i = 0; i < bubbleAnimation.length; i++) {
                let [firstIndex, secondIndex, typeChange, instruction] = bubbleAnimation[i];
                if (typeChange === 'color') {
                        colorSwap(firstIndex, secondIndex, instruction, bars, i);
                } else {
                        barSwap(firstIndex, secondIndex, bars, i);
                }
        }
}

//bubbleSort function
//Does: Performs a bubble sort on the input array and pushes animations to 
//      the bubbleAnimation array.
function bubbleSort(input) {
        let length = input.length;
        let isSwapped;
        do {
                isSwapped = false;
                for (let i = 0; i < length-1; i++) {
                        if (input[i] > input[i + 1]) { 
                                //Pushes indices to bubbleAnimation to change the color indicating 
                                //the bars are being checked 
                                bubbleAnimation.push([i, i+1, 'color', 'change']);
                                //Pushes indices to bubbleAnimation to revert the color 
                                bubbleAnimation.push([i, i+1, 'color', 'rever']);   
                                //Pushes indices to bubbleAnimation to change the height of 
                                //the array bars
                                bubbleAnimation.push([i, i+1, 'height']);
                                let temp = input[i];
                                input[i] = input[i + 1];
                                input[i + 1] = temp;
                                isSwapped = true;
                        }
                }
        } while (isSwapped);

};

//Insertion Sort Animations Array
var insertionAnimation = [];

//getInsertionAnimation function
//Does: Sorts and performs the visualization of an insertion sort
function getInsertionAnimation(input, bars) {
        insertionSort(input);
        for (let i = 0; i < insertionAnimation.length; i++) {
                let [firstIndex, secondIndex, typeChange, instruction] = insertionAnimation[i];
                typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i);
        }
}

//insertionSort function
//Does: Performs an insertion sort on the input array and pushes animations
//      to the insertionAnimation array
function insertionSort(input) {
        let length = input.length;
        for (let i = 1; i < length; i++) {
                let value = input[i];
                let j = i - 1;
                while (j >= 0 && input[j] > value) {
                        //Pushes indices to insertionAnimation to change the color
                        insertionAnimation.push([j, j+1, 'color', 'change']);
                        //Pushes indices to insertionAnimation to revert the color
                        insertionAnimation.push([j, j+1, 'color', 'revert']);
                        //Pushes indices to insertionAnimation to swap array bars
                        insertionAnimation.push([j, j+1, 'height']);
                        input[j + 1] = input[j];
                        j--;
                }
                input[j + 1] = value;
        }
}

//Heap Sort Animations Array
var heapAnimation = [];

//heapAnimationFunc function
//Does: Sorts and visualizes a heap sort 
function heapAnimationFunc(input, bars) {
        heapSort(input);
        for(let i = 0; i < heapAnimation.length; i++) {
                let [firstIndex, secondIndex, typeChange, instruction] = heapAnimation[i];
                typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i);     
        }
}

//heapSort function
//Does: Performs a heap sort and pushes animations to the heapAnimation
//      array
function heapSort(input) {
        for (let i = Math.floor(input.length / 2 - 1); i >= 0; i--) {
                heapify(input, input.length, i);        
        }
        for (let i = input.length - 1; i >= 0; i--) {
                
                heapSwap(input, 0, i);
                heapify(input, i, 0); 
        }
}

//heapify function
//Does: Creates and maintains the heap. Also pushes animations to the 
//      heapAnimation array when necessary
function heapify(input, size, i) {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < size && input[left] > input[max]) {
                max = left;
        }
        if (right < size && input[right] > input[max]) {
                max = right;
        }

        //Pushes indices to the heapAnimation array to change color
        heapAnimation.push([i, max, 'color', 'change']);
        //Pushes indices to the heapAniamtion array to revert color 
        heapAnimation.push([i, max, 'color', 'revert']);

        if (max != i) {
                heapSwap(input, i, max);
                heapify(input, size, max);       
        }
}

//heapSwap function
//Does: Swaps the values stored at the given indices in the input 
//      array
function heapSwap(input, first, second) {
        //Pushes indices to the heapAnimation array to swap array bars 
        heapAnimation.push([first, second, 'height']);
        let temp = input[first];
        input[first] = input[second];
        input[second] = temp;
}

//Merge Sort Animation Array
var mergeAnimation = [];

//getMergeAnimations function
//Does: Sorts and visualizes of a Merge sort 
function getMergeAnimations(input, bars) {
        let tempArray = Array.from(array);
        mergeSortRecur(input, 0, input.length - 1, tempArray);
        for (let i = 0; i < mergeAnimation.length; i++) {
                let [firstIndex, secondIndex, typeChange, instruction] = mergeAnimation[i];
                if (typeChange === 'color') {
                        colorSwap(firstIndex, secondIndex, instruction, bars, i);
                } else {
                        animationArray.push(setTimeout( () => {
                                const [index, heightVal] = mergeAnimation[i];
                                bars[index].style.height = heightVal + 'px';
                        }, i*ANIMATION_SPEED));
                } 
        }
}

//mergeSortRecur function
//Does: Recursive merge sort helper function
function mergeSortRecur(input, startIndex, endIndex, tempArray) {
        if (startIndex === endIndex) {
                return;
        }
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        mergeSortRecur(tempArray, startIndex, middleIndex, input);
        mergeSortRecur(tempArray, middleIndex + 1, endIndex, input);
        mergeSortHelp(input, startIndex, middleIndex, endIndex, tempArray);
}

//mergeSortHelp function
//Does: Performs an iterative merge sort on a portion of the array and 
//      pushes animations to the mergeAnimations array
function mergeSortHelp(input, startIndex, middleIndex, endIndex, tempArray) {
        let x = startIndex, y = startIndex, z = middleIndex + 1;
        while (y <= middleIndex && z <= endIndex) {
                //Pushes indices to the mergeAnimation array to change color
                mergeAnimation.push([y, z, 'color', 'change']);
                //Pushes indices to the mergeAnimation array to revert color
                mergeAnimation.push([y, z, 'color', 'revert']);
                if (tempArray[y] <= tempArray[z]) {
                        //Pushes indices to the mergeAnimation array to swap array bars 
                        mergeAnimation.push([x, tempArray[y], 'height']);
                        input[x++] = tempArray[y++];
                } else {
                        //Pushes indices to the mergeAnimation array to swap array bars 
                        mergeAnimation.push([x, tempArray[z], 'height']);
                        input[x++] = tempArray[z++];
                }
        }
        while (y <= middleIndex) {
                //Pushes indices to the mergeAnimation array to change color
                mergeAnimation.push([y, y, 'color', 'change']);
                //Pushes indices to the mergeAnimation array to revert color
                mergeAnimation.push([y, y, 'color', 'revert']);
                //Pushes indices to the mergeAnimation array to swap array bars 
                mergeAnimation.push([x, tempArray[y], 'height']);
                input[x++] = tempArray[y++];
        }
        while (z <= endIndex) {
                //Pushes indices to the mergeAnimation array to change color
                mergeAnimation.push([z, z, 'color', 'change']);
                //Pushes indices to the mergeAnimation array to revert color
                mergeAnimation.push([z, z, 'color', 'revert']);
                //Pushes indices to the mergeAnimation array to swap array bars 
                mergeAnimation.push([x, tempArray[z], 'height']);
                input[x++] = tempArray[z++];
        }
}
  
//Selection Sort Animation Array
selectionAnimation = [];

//getSelectionAnimation function
//Does: Sorts and visualizes a selection sort
function getSelectionAnimation(input, bars) {
        selectionSort(input);
        for (let i = 0; i < selectionAnimation.length; i++) {
                let [firstIndex, secondIndex, typeChange, instruction] = selectionAnimation[i];
                typeCheck(firstIndex, secondIndex, typeChange, instruction, bars, i);
        }
}

//selectionSort function
//Does: Performs a selection sort and pushes animations to
//      the selectionAnimation function
function selectionSort(input) {
        let length = input.length;
        for (let i = 0; i < length; i++) {
                let minimum = i;
                for (let j = i + 1; j < length; j++) {
                        //Pushes indices to the selectionAnimation array to change colors
                        selectionAnimation.push([j, minimum, 'color', 'change']);
                        //Pushes indices to the selectionAnimation array to revert colors
                        selectionAnimation.push([j, minimum, 'color', 'revert']);
                        if (input[minimum] > input[j]) {
                                minimum = j;
                        }
                }
                if (minimum !== i) {
                        //Pushes indices to the selectionAnimation array to swap array bars
                        selectionAnimation.push([i, minimum, 'height']);
                        let temp = input[i];
                        input[i] = input[minimum];
                        input[minimum] = temp;
                }
        }
}