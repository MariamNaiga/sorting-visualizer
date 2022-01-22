export function getMergeAnimations(arr) {
    const animations = [];
    mergeSort(arr, 0, (arr.length - 1), animations);
    sortedAnimations(arr, animations)
    return animations;
}

function sortedAnimations(arr, animations) {
    for(let i = 0; i < arr.length; i++) {
        animations.push(['colorChange', i, 'green']);
    }
}

function merge(arr, l, m, r, animations) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
        
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    var i = 0, j = 0, k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            animations.push(["colorChange", k, 'red']);
            animations.push(["heightChange", k, L[i]]);
            arr[k] = L[i];
            i++;
        }
        else {
            animations.push(["colorChange", k, 'red']);
            animations.push(["heightChange", k, R[j]])
            arr[k] = R[j];
            j++;
        }
        animations.push(["colorChange", k, 'black']);
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        animations.push(["colorChange", k, 'red']);
        animations.push(["heightChange", k, L[i]]);
        animations.push(["colorChange", k, 'black']);
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        animations.push(["colorChange", k, 'red']);
        animations.push(["heightChange", k, R[j]])
        animations.push(["colorChange", k, 'black']);
        arr[k] = R[j];
        j++;
        k++;
    }
}

function mergeSort(arr, l, r, animations) {
    if (l < r) {
        var m = l + parseInt((r-l)/2);

        mergeSort(arr, l, m, animations);
        mergeSort(arr, m + 1, r, animations);
        merge(arr, l, m, r, animations)
    }
}

