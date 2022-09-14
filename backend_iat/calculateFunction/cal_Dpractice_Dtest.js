const cal_Dpractice_Dtest = (bInBX, bInBY, StdBX) => {
    // console.log("bInBX: ", bInBX)
    // console.log("bInBY: ", bInBY)
    // console.log("StdBX: ", StdBX)
    const result = ((bInBX - bInBY) / StdBX)
    return result;

}

module.exports = cal_Dpractice_Dtest