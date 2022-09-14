const methodD3 = require("./D3_score_method")
const methodD4 = require("./D4_score_method")
const methodD5 = require("./D5_score_method")
const methodD6 = require("./D6_score_method")

const DscoreFunc = (arrayOfCorrect,arrayOfWorng, correctAvg, correctStd ) => {
        
    const newArrayD3 = methodD3("3",arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);
    const newArrayD4 = methodD4("4",arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);
    const newArrayD5 = methodD5("5",arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);
    const newArrayD6 = methodD6("6",arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);

    // console.log("newArrayD3", newArrayD3)
    // console.log("newArrayD4", newArrayD4)
    // console.log("newArrayD5", newArrayD5)
    // console.log("newArrayD6", newArrayD6)

    const sendD = {
        D1: newArrayD3,
        D2: newArrayD4,
        D3: newArrayD5,
        D4: newArrayD6
    }

    return sendD
}

module.exports = DscoreFunc