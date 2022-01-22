export function getQuickAnimations(arr, low, high) {
    const animations = [];
    quickSort(arr, low, high, animations)
    sortedAnimations(arr, animations)
    return animations;
}

function sortedAnimations(arr, animations) {
    for(let i = 0; i < arr.length; i++) {
        animations.push(['colorChange', i, 'green']);
    }
}

function swap(arr, a, b, animations) {

    animations.push([a, b, 'red'])

    animations.push([a, arr[b]])

    animations.push([b, arr[a]])

    animations.push([a, b, 'black'])
    
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function partition(arr, low, high, animations) {
    let pivot = arr[high]
    let i = (low - 1)
    for (let j = low; j <= high; j++) {
        if(arr[j] < pivot) {
            i++;
            if(i !== j) {
                swap(arr, i, j, animations)
            }
        }   
    }
    if(i + 1 !== high) {
        swap(arr, i + 1, high, animations);
    }
    return (i + 1);
}

function quickSort(arr, low, high, animations) {
    if (low < high) {
        let pi = partition(arr, low, high, animations)
        quickSort(arr, low, pi - 1, animations)
        quickSort(arr, pi + 1, high, animations)
    }
}

