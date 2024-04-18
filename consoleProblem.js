console.log("Hello, Starting process");

let cb = (arg) => {
    console.log("Inside CB", arg);
    return new Promise((resolve,reject) => {
        resolve(`Hello Promise ${arg}`)
    })
}

async function main(cb) {
    console.log("inside main");
    cb("1").then(res => console.log(res))
    const result = await cb("2");
    console.log(result)
}



main(cb);

console.log("In between execution");

console.log("Finish execution")