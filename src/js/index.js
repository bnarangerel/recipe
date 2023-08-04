const arr = [23, 44, 53];

let myfunc = a =>{
    console.log(`too: ${a}`);
}

const arr2 = [...arr, 44, 11233];

myfunc(arr2[2]);