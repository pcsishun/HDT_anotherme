const avgCalculate = require("./avgCalculate")
const stdCalulate = require("./stdCalulate")
const calDpracticeDtest = require("./cal_Dpractice_Dtest")

const D6scoreMethods = (isMethod,correctArray, worngArray, avgCorrect, stdCorrect) => {

    // console.log("isMethod: ", isMethod)
    // console.log("correctArray",correctArray)
    // console.log("worngArray",worngArray)
    // console.log("avgCorrect",avgCorrect)
    // console.log("stdCorrect",stdCorrect)

    let newArray = []

    const convertTime = avgCorrect + 600; ; 

    if(convertTime > 10000){

        return correctArray
    }else if(convertTime < 400){

        return correctArray
    }else{
        
        worngArray.forEach((element) => {
            if(element.typeCal === 'b3'){
                const setElement = {
                    typeCal: element.typeCal,
                    milliseconds:convertTime
                }
                newArray.push(setElement);
            }else if(element.typeCal === 'b4'){
                const setElement = {
                    typeCal: element.typeCal,
                    milliseconds:convertTime
                }
                newArray.push(setElement);
            }else if(element.typeCal === 'b6'){
                const setElement = {
                    typeCal: element.typeCal,
                    milliseconds:convertTime
                }
                newArray.push(setElement);
            }else if(element.typeCal === 'b7'){
                const setElement = {
                    typeCal: element.typeCal,
                    milliseconds:convertTime
                }
                newArray.push(setElement);
            }
        })

        let arrayOfB3 = [];
        let arrayOfB4 = [];
        let arrayOfB6 = [];
        let arrayOfB7 = [];

        const setNewArray = correctArray.concat(newArray);

        setNewArray.forEach((element) => {
            if(element.typeCal === 'b3'){
                arrayOfB3.push(element.milliseconds);
            }else if(element.typeCal === 'b4'){
                arrayOfB4.push(element.milliseconds);
            }else if(element.typeCal === 'b6'){
                arrayOfB6.push(element.milliseconds);
            }else if(element.typeCal === 'b7'){
                arrayOfB7.push(element.milliseconds);
            }
        })

        const setConcatB6_B3 = arrayOfB6.concat(arrayOfB3);
        const setConcatB7_B4 = arrayOfB7.concat(arrayOfB4);

        const meanB3 = avgCalculate(arrayOfB3)
        const meanB4 = avgCalculate(arrayOfB4)
        const meanB6 = avgCalculate(arrayOfB6)
        const meanB7 = avgCalculate(arrayOfB7)

        const stdB7_B4 = stdCalulate(setConcatB7_B4)
        const stdB6_B3 = stdCalulate(setConcatB6_B3)

        const DPractice = calDpracticeDtest(meanB6, meanB3, stdB6_B3)
        // console.log("DPractice: ", DPractice)
        const DTest = calDpracticeDtest(meanB7, meanB4, stdB7_B4)
        // console.log("DTest: ", DTest , "\n")

        const Dscore = (DPractice + DTest) / 2;
        return Dscore;
    }
}

module.exports = D6scoreMethods