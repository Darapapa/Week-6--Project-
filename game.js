const textElement = document.getElementById('text') // defining the text class in a variable
const optionButtonsElement = document.getElementById('option-buttons') // defining the buttons in a variable by id

let state = {} // Empty object. defining different states later on in the game. Items for example

function startGame() { // starts the game 
    state = {} // It has to be an empty Object when the game starts
    showTextNode(1) //defining which textnode id the game starts with
}

function showTextNode(textNodeIndex) { // display the option we are on.Takes a specific index of a textnode
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) // current textNode id variable i want to display
    textElement.innerText = textNode.text // replacing the text in HTML with the textNode from the js
    while (optionButtonsElement.firstChild) { //while loop to remove all the options i dont want to show
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => { //looping through the options
        if (showOption(option)) { // checking if i can display the node.
            const button = document.createElement('button') //creating a button
            button.innerText = option.text //replacing the inner text with the option text
            button.classList.add('btn') // defining the styling from the css
            button.addEventListener('click', () => selectOption(option)) // addEventListener for the click which will execute the selectOption function
            optionButtonsElement.appendChild(button) //adding(appending) the button to the optionButtonsElement group
        }
    })
}

function showOption(option) { // option that will happen every time we select an option
    return option.requiredState == null || option.requiredState(state) // checking if the option have a required state object
}

function selectOption(option) { // function for chosing the options
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) { // if(statement) the next id is less than 0 it will return to startGame(restarting the game)
        return startGame() // returning to the startGame function
    }
    state = Object.assign(state, option.setState) // takes the current state and going to add everything from option.setState to it and overwrites anything that is already there.
    showTextNode(nextTextNodeId)
}

const textNodes = [{ // the textNodes variables with options objects.
        id: 1, // index(id) of the textNodes variable.startGame function starts with 1 as defined 
        text: 'You are relaxing in your Mansion.At some point during the day you walk out to your garage to pick a car for today from your super car collection.Suddenly you hear a weird noise from the bushes to your right.',
        options: [{
                text: 'Scream for help!',
                nextText: 2
            },
            {
                text: 'Go and check out the source of the noise',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'You wake up screaming in terror.Your wife rush into the room to see why are you screaming?!Suddenly you realize that you are in your bed....',
        options: [{
                text: 'Sit up in your bad, Calm her down and tell her that you just had a nightmare',
                nextText: 4
            },
            {
                text: 'Ask her who is she and what is this place?',
                nextText: 4
            },

        ]
    },
    {
        id: 3,
        text: 'You take a big breath and start walking toward the noise.A million things crossing your mind as you approach the bushes.You are about to reach the bushes when suddenly you wake up in your bed.',
        options: [{
                text: 'Sit up in your bed and turn off the alarm clock',
                nextText: 4
            },
            {
                text: 'Turn off the alarm clock to and continue to sleep',
                nextText: 5
            },
        ]
    },

    {
        id: 4,
        text: 'You are frustrated, tired and confused a little bit.That dream not only felt so real but was sooo good but good luck explaining to your wife that your so called nightmare that woke you up screaming was a luxury life without her',
        options: [{
            text: 'Wake up from your bed and go to the kitchen to make a coffe and some breakfast',
            nextText: 6
        }, {
            text: 'Try to fall asleep back for a few minute hoping you will get back to that dream',
            nextText: 5
        }]
    },


    {
        id: 5,
        text: 'You choose to go back to sleep but you wake up 3 hours later thanks to the turned off alarm clock.Unfortunately your boss did not appreciate that you did not showed up at work, especially that this was the third time this week.You got fired!',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },

    {
        id: 6,
        text: 'You made some breakfast and coffe to start your day',
        options: [{
            text: 'Brush your teeth and start dressing.You gotta get to work soon',
            nextText: 9
        }, {
            text: 'Call your boss to ask to work from home.',
            nextText: 7

        }]
    },
    {
        id: 7,
        text: 'You called your boss to ask to work from home and he asked you why?!',
        options: [{
                text: 'You dont feel too good and you are concerned about infecting people in the office',
                nextText: 8
            },
            {
                text: 'Your kids are sick and you have to stay with them today',
                nextText: 8
            },
            {
                text: 'You just need an easy day without the stress in the office',
                nextText: 8
            },
            {
                text: 'You have to take your dog to the vet later',
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        text: 'Your boss tells you that it is perfectly fine and that he understand your situtation but ask you to be responsive on the phone and active at your work. ',
        options: [{
            text: 'You are happy but feel a little bit of guilt too.....Lets get to work',
            nextText: 110 // another story line path
        }]
    },

    {
        id: 9,
        text: 'Brushed your teeth and dressed up.Ready to go to work.',
        options: [{
            text: 'Grab your keys and lets go',
            nextText: 10
        }, {
            text: 'do a quick check list in your head before your leave',
            nextText: 11
        }]
    },

    {
        id: 10,
        text: 'You grabbed your keys, closed the door.The elevator takes some time because its really busy in the morning and you live on the 15th floor.',
        options: [{
            text: 'A little warm up in the morning cant hurt.Ill take the stairs.',
            nextText: 13
        }, {
            text: 'I will just wait for the elevator.It will be here soon anyway',
            nextText: 14
        }]
    },
    {
        id: 11,
        text: 'You often forget things in the morning rush so you do a quick check list in your head....phone,watch,laptop,mon...my wallet.good thing you checked',
        options: [{
            text: 'Search the house for your wallet',
            setState: { wallet: true },
            nextText: 12
        }, {
            text: 'You have no clue where can it be and you dont want to be late from work.You got money in the car anyway',
            setState: { wallet: false },
            nextText: 10
        }]

    },
    {
        id: 12,
        text: 'After 5 minutes of searching in the house you finally find your wallet.',
        options: [{
            text: 'Lets go to work!',
            nextText: 10
        }]
    },

    {
        id: 13,
        text: 'You start walking down the stairs.After 2 floor something feels a little bit weird.',
        options: [{
            text: 'Lets stop at this floor and call the elevator',
            nextText: 14
        }, {
            text: 'Keep walking down on the stairs',
            nextText: 15
        }]
    },

    {
        id: 14,
        text: 'You waiting for the elevator.After 5 minute the elevator still not here.',
        options: [{
            text: 'keep waiting for the elevator',
            nextText: 16
        }, {
            text: 'You think you better be going on the stairs',
            nextText: 13
        }]
    },
    {
        id: 15,
        text: 'As you keep walking down the stairs you realize that you passing floor 12th again.You could swear you already passed that level',
        options: [{
            text: 'You must be tired probably.Keep walking down the stairs',
            nextText: 16
        }, {
            text: 'Stop at this floor and wait for the elevator',
            nextText: 12321 // for now
        }, {
            text: 'Start Panicking and think things through',
            nextText: 1231 // still not worked out
        }]
    }

]

startGame()

// requiredState: (currentState) => currentState.item, // checking the statement is true.If its true the option will show up
// setState: { item: false, item2: true }, // defining the state variable to loop through the if statement