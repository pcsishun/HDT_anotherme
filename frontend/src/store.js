import { createStore } from 'vuex' 

export default createStore({
    state: {
        emotion:"",
        objective1: {
            firstTimeGreeting:[
                "Hi I'm your companion, your safe place, Just to listen whatever you feel free to tell me. What would you like to call me?"
            ],
            goalSetting:[
                "How would you like to be different as a result of our daily talking? Or how would you like your life to be different?",
                "Put your “Goals” at the top there.",
                "That's a very good goal. If you can reach your goal, what might you be doing differently?",
                "Okay. That's a good one."
            ]
        },
        objective2: {
            moodCheck:[
                "How have you been feeling this day?",
                "So, tell me a little bit about your mood."
            ],
            askForUpdate:[
                "How's your day going?",
                "Did that work?",
                "Okay"
            ],
            reviewTheHomework:[
                "So yesterday we talked about ..(word cloud) … how it's going?",
                "Did that work?",
                "Good. All right, so what do you want to do for tomorrow?"
            ],
            identifyIssuesOrGoalsForTheSession: [
                "All right. So is that something you would like to talk to",
                "Okay. So, what’s going to be different this time, then?",
            ]
        },
        objective3: {
            // if depression
            selfAwareness:[
                {
                    topic: "Why this topic is important?",
                    canPass: true
                },
                {
                    topic: "Does this question ask you to evaluate something?",
                    canPass: false
                },
                {
                    topic: "Do you have any evidence/proof of this?",
                    canPass: false
                },
                {
                    topic: "Is it helpful to think about everything that could go wrong?",
                    canPass: false
                },
                {
                    topic: "Is it helpful to think like this?",
                    canPass: false
                },
                {
                    topic: "How might somebody else see the situation?",
                    canPass: false
                },
                {
                    topic: "How many times has the worst-case scenario actually happened?",
                    canPass: false
                },
                {
                    topic: "How likely is it that this will actually happen?",
                    canPass: false
                },
                {
                    topic: "Is there another way of looking at it?",
                    canPass: false
                },
            ],
            // if depression
            resilience:[
                {
                    topic: "What's one thing you do every day because you really want to do it?",
                    canPass: false
                },
                {
                    topic: "What are some of the difficulties you run into in keeping up?",
                    canPass: true
                },
                {
                    topic: "Can you think of sometimes in the past few weeks when that has happened?",
                    canPass: false
                },
                {
                    topic: "So a few things kept you going. It sounds like you are committed to your goal and you want to keep it in your life.",
                    canPass: false
                },
                {
                    topic: " Can you imagine in the form of picture or the character of your life if we write down what you do when you run into difficulties with your important think to do. Can you descript?",
                    canPass: false
                },
                {
                    topic: "If there something difficult to your way again, what is the way that your imagine or character as you mention will action in the role?",
                    canPass: false
                },
                {
                    topic: "Being resilient doesn't mean you'll be happy about what you are facing. It just means you are still standing at the end of the day.",
                    canPass: false
                },
            ],
            // if anxiety
            problemSolving:[
                {
                    topic: "What problem is bothering you?",
                    canPass: true
                },
                {
                    topic: "What were your thought?",
                    canPass: false
                },
                {
                    topic: "How did you feel?",
                    canPass: false
                },
                {
                    topic: "How did your react?",
                    canPass: false
                },
                {
                    topic: "What was the outcome?",
                    canPass: false
                },
                {
                    topic: "What's keeping this problem as a problem? What could you do to target that part of the problem?",
                    canPass: false
                },
                {
                    topic: "Can you think of anyways that you could make this problem not be a problem any more?",
                    canPass: false
                },
                {
                    topic: "What were the advantage of this solution?",
                    canPass: false
                },
                {
                    topic: "And what were the disadvantage?",
                    canPass: false
                },
                {
                    topic: "What would be some of the worst ways of solving a problem like this? And the best?",
                    canPass: false
                },
            ],
            //  if anxiety or relax
            motivationInterview:[
                {
                    topic: "When did you first notice of this issue?",
                    canPass: false
                },
                {
                    topic: "In what ways do you think other people have been affected by this issue?",
                    canPass: false
                },
                {
                    topic: "What worries you about this issue?",
                    canPass: false
                },
                {
                    topic: "What would be the most important benefit of improving your way of reponse to?",
                    canPass: true
                },
                {
                    topic: "How has this problem stopped you from moving forward, from doing what's most important in your life?",
                    canPass: false
                },
                {
                    topic: "Do you think it's possible to improve?",
                    canPass: false
                },
                {
                    topic: "What might stand in your way of improve?",
                    canPass: false
                },
                {
                    topic: "How would you like to proceed from here?",
                    canPass: false
                },
                {
                    topic: "What is the first thing you can to by now?",
                    canPass: false
                },
            ],
        },
        objective4:{
            summary:[
                "All right. Well, it's a pretty good idea, then how could you summarize what's the key of today conversation?",
                "How would you like your life to be different or coming closer with your goal?",
                "What will the first thing you will do in tommorrow?"
            ]
        },

        userAction:{
            userAnswer: "",
            arrayCameraTrack:[],
            sentenceIndex:0,
            dialogueNow:"Dialogue1and2",
            isStartRec: false,
            setSentence:"",
            setQuestion:""
        },
        storeUserArray: [],
        isChangePages: 0,
        // arrayOfMood: [],
        // groupOfEmotion: [],
        isMicRec: false

    }
});
