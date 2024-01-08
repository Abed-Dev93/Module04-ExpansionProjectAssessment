///////////////////////Exercise 1///////////////////////
let array = [11, 22, 33, 44, 55]

function bubblesort (arr, N) {
    let temp = 0
    for (let i=0; i<N; i++)
        arr[i] = Math.floor(Math.random() * 100) + 1

    for (let i=0; i<N; i++) {
        for (let j=0; j<N; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }

    return arr
}

console.log(bubblesort(array, 7))


///////////////////////Exercise 2///////////////////////
function binarysearch (arr, N, K) {
    let found, kIsAt

    for (let i=0; i<N; i++)
        arr[i] = Math.floor(Math.random() * 100) + 1

    for (let i=0; i < Math.ceil(N / 2); i++) {
        if (arr[i] !== K)
            found = false
        else {
            found = true
            kIsAt = i
        }
    }

    for (let i = Math.ceil(N / 1.5); i < N; i++) {
        if (arr[i] !== K)
            found = false
        else {
            found = true
            kIsAt = i
        }
    }

    for (let i = Math.ceil(N / 2); i < Math.ceil(N / 1.5); i++) {
        if (arr[i] !== K)
            found = false
        else {
            found = true
            kIsAt = i
        }
    }

    if (!kIsAt)
        return -1
    return kIsAt
}

console.log(binarysearch(array, 8, 8))


///////////////////////Exercise 3///////////////////////
