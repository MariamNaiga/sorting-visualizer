export function getBubbleAnimations(arr, n) {
    const animations = [];
    bubbleSort(arr, n, animations)
    return animations;
}

function swap(arr, a, b, animations) {

    animations.push(['colorChange', a, 'red'])
    animations.push(['colorChange', b, 'blue'])

    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    animations.push(['heightChange', a, arr[a]])
    animations.push(['heightChange', b, arr[b]])

    animations.push(['colorChange', a, 'black'])
    animations.push(['colorChange', b, 'black'])
}

function bubbleSort(arr, n, animations) {

    for(let i = 0; i < n - 1; i++) {
        for(let j = 0; j < n - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1, animations)
            } 
            if (j === n - i - 2) {
            animations.push(['colorChange', j, 'green'])
            animations.push(['colorChange', j+1, 'green'])
            }
        }
    }
}

