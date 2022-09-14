const stdCalulate = (array) => {

    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    const standardDeviation = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    // console.log(mean, standardDeviation, sum)
    // const replyData = {
    //     standardDeviation: standardDeviation
    // }   

    return standardDeviation;

}

module.exports = stdCalulate