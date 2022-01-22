export function getInsertionAnimations(arr, n) {
    const animations = [];
    insertionSort(arr, n, animations)
    return animations;
}

function insertionSort(arr, n, animations) {
    animations.push(['colorChange', 0, 'green'])
    var i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while(j >= 0 && arr[j] > key) {

            animations.push(['heightChange', j + 1, arr[j]]);
            animations.push(['colorChange', j + 1, 'green'])
            arr[j + 1] = arr[j];
            j = j - 1;
            animations.push(['colorChange', j + 1, 'black'])
        }
        animations.push(['colorChange', j + 1, 'green'])

        animations.push(['heightChange', j + 1, key]);
        arr[j + 1] = key;
    }
}

