/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to ecommerce store. What would you like me to do?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const NumberIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NumberIntent';
    },
   async handle(handlerInput) {
        //const speakOutput = 'Number fulfilled';
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = '';

        let slotStatus = '';
        let resolvedSlot;
        let slotValues=request.intent.slots.ordertype.resolutions.resolutionsPerAuthority[0].values[0].value.name
       // let slotValues = request.intent.slots.ordertype.value;    
        let num=''
        let url="https://6402f02ef61d96ac4873a510.mockapi.io/"+slotValues
        await getRemoteData(url)
      .then((response) => {
          
        const data = JSON.parse(response);
       num=data.length;
       
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });
        //let slotValues = getSlotValues(request.intent.slots);
        //let url="https://6402f02ef61d96ac4873a510.mockapi.io/"+slotValues.ordertype.heardAs;
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('*** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: ordertype 
        // if (slotValues.ordertype.heardAs) {
        //     slotStatus += ' slot ordertype was heard as ' + slotValues.ordertype.heardAs + '. ';
        // } else {
        //     slotStatus += 'slot ordertype is empty. ';
        // }
        // if (slotValues.ordertype.ERstatus === 'ER_SUCCESS_MATCH') {
        //     slotStatus += 'a valid ';
        //     if(slotValues.ordertype.resolved !== slotValues.ordertype.heardAs) {
        //         slotStatus += 'synonym for ' + slotValues.ordertype.resolved + '. '; 
        //         } else {
        //         slotStatus += 'match. '
        //     } // else {
        //         //
        // }
        // if (slotValues.ordertype.ERstatus === 'ER_SUCCESS_NO_MATCH') {
        //     slotStatus += 'which did not match any slot value. ';
        //     console.log('*** consider adding "' + slotValues.ordertype.heardAs + '" to the custom slot type used by slot ordertype! '); 
        // }

        // if( (slotValues.ordertype.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.ordertype.heardAs) ) {
        //     slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('NumberIntent','ordertype'), 'or');
        // }

        //say += slotStatus;
//         let listtype=slotValues.ordertype.resolved
//         let url="https://6402f02ef61d96ac4873a510.mockapi.io/"+listtype
//         let numberof
//         fetch(url)
// 	.then(response => response.json())
// 	.then(response => {
// // 		console.log(response.length);
//         numberof=response.length
//         // console.log(response);
//     })
    
// 	.catch(err => console.error(err));
        
        
        
        return handlerInput.responseBuilder
            //.speak(say+slotValues)
            .speak(num.toString())
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const ListIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'listintent';
    },
    async handle(handlerInput) {
        //const speakOutput = 'Number fulfilled';
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from ListIntent. ';

        let slotStatus = '';
        let resolvedSlot;
       // let slotValues = request.intent.slots.ordertype.value;
       let slotValues=request.intent.slots.ordertype.resolutions.resolutionsPerAuthority[0].values[0].value.name
        let s=''
        let num=''
        let url="https://6402f02ef61d96ac4873a510.mockapi.io/"+slotValues
        await getRemoteData(url)
      .then((response) => {
          
        const data = JSON.parse(response);
      num=data.length;
      for(let i=0;i<10;i++){
          s=s+" "+data[i].product
      }
       
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });
       //let slotValues = getSlotValues(request.intent.slots);
        //let url="https://6402f02ef61d96ac4873a510.mockapi.io/"+slotValues.ordertype.heardAs;
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('*** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: ordertype 
        // if (slotValues.ordertype.heardAs) {
        //     slotStatus += ' slot ordertype was heard as ' + slotValues.ordertype.heardAs + '. ';
        // } else {
        //     slotStatus += 'slot ordertype is empty. ';
        // }
        // if (slotValues.ordertype.ERstatus === 'ER_SUCCESS_MATCH') {
        //     slotStatus += 'a valid ';
        //     if(slotValues.ordertype.resolved !== slotValues.ordertype.heardAs) {
        //         slotStatus += 'synonym for ' + slotValues.ordertype.resolved + '. '; 
        //         } else {
        //         slotStatus += 'match. '
        //     } // else {
        //         //
        // }
        // if (slotValues.ordertype.ERstatus === 'ER_SUCCESS_NO_MATCH') {
        //     slotStatus += 'which did not match any slot value. ';
        //     console.log('*** consider adding "' + slotValues.ordertype.heardAs + '" to the custom slot type used by slot ordertype! '); 
        // }

        // if( (slotValues.ordertype.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.ordertype.heardAs) ) {
        //     slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('NumberIntent','ordertype'), 'or');
        // }

        //say += slotStatus;

        return handlerInput.responseBuilder
            .speak(s)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const ItemNameHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'itemname';
    },
    async handle(handlerInput) {
        //const speakOutput = 'Number fulfilled';
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from itemIntent. ';
        let num=10;
        let maxv=0;
        let minv=1000000;
        let val='';
        let slotStatus = '';
        let resolvedSlot;
        let slotValues = request.intent.slots.itemprop.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        let url="https://6402f02ef61d96ac4873a510.mockapi.io/fulfilled"
        await getRemoteData(url)
      .then((response) => {
          
        const data = JSON.parse(response);
      num=data.length;
      for(let i=0;i<num;i++){
          if(slotValues==='best selling item'){
              if(data[i].sales>maxv){
                  maxv=data[i].sales
                  val=data[i].product
              }
          }
          else{
              if(data[i].sales<minv){
                  minv=data[i].sales
                  val=data[i].product
              }
          }
         
      }
       
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });
        //let slotValues = getSlotValues(request.intent.slots);
        //let url="https://6402f02ef61d96ac4873a510.mockapi.io/"+slotValues.ordertype.heardAs;
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('*** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: ordertype 
        // if (slotValues.ordertype.heardAs) {
        //     slotStatus += ' slot ordertype was heard as ' + slotValues.ordertype.heardAs + '. ';
        // } else {
        //     slotStatus += 'slot ordertype is empty. ';
        // }
        // if (slotValues.ordertype.ERstatus === 'ER_SUCCESS_MATCH') {
        //     slotStatus += 'a valid ';
        //     if(slotValues.ordertype.resolved !== slotValues.ordertype.heardAs) {
        //         slotStatus += 'synonym for ' + slotValues.ordertype.resolved + '. '; 
        //         } else {
        //         slotStatus += 'match. '
        //     } // else {
        //         //
        // }
        // if (slotValues.ordertype.ERstatus === 'ER_SUCCESS_NO_MATCH') {
        //     slotStatus += 'which did not match any slot value. ';
        //     console.log('*** consider adding "' + slotValues.ordertype.heardAs + '" to the custom slot type used by slot ordertype! '); 
        // }

        // if( (slotValues.ordertype.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.ordertype.heardAs) ) {
        //     slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('NumberIntent','ordertype'), 'or');
        // }

        //say += slotStatus;

        return handlerInput.responseBuilder
            .speak(val)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
function getSlotValues(filledSlots) { 
    const slotValues = {}; 
 
    Object.keys(filledSlots).forEach((item) => { 
        const name  = filledSlots[item].name; 
 
        if (filledSlots[item] && 
            filledSlots[item].resolutions && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0] && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
                case 'ER_SUCCESS_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name, 
                        ERstatus: 'ER_SUCCESS_MATCH' 
                    }; 
                    break; 
                case 'ER_SUCCESS_NO_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: '', 
                        ERstatus: 'ER_SUCCESS_NO_MATCH' 
                    }; 
                    break; 
                default: 
                    break; 
            } 
        } else { 
            slotValues[name] = { 
                heardAs: filledSlots[item].value, 
                resolved: '', 
                ERstatus: '' 
            }; 
        } 
    }, this); 
 
    return slotValues; 
}
function sayArray(myData, penultimateWord = 'and') { 
    let result = ''; 
 
    myData.forEach(function(element, index, arr) { 
 
        if (index === 0) { 
            result = element; 
        } else if (index === myData.length - 1) { 
            result += ` ${penultimateWord} ${element}`; 
        } else { 
            result += `, ${element}`; 
        } 
    }); 
    return result; 
}
function getExampleSlotValues(intentName, slotName) { 
 
    let examples = []; 
    let slotType = ''; 
    let slotValuesFull = []; 
 
    let intents = model.interactionModel.languageModel.intents; 
    for (let i = 0; i < intents.length; i++) { 
        if (intents[i].name === intentName) { 
            let slots = intents[i].slots; 
            for (let j = 0; j < slots.length; j++) { 
                if (slots[j].name === slotName) { 
                    slotType = slots[j].type; 
 
                } 
            } 
        } 
         
    } 
    let types = model.interactionModel.languageModel.types; 
    for (let i = 0; i < types.length; i++) { 
        if (types[i].name === slotType) { 
            slotValuesFull = types[i].values; 
        } 
    } 
 
 
    examples.push(slotValuesFull[0].name.value); 
    examples.push(slotValuesFull[1].name.value); 
    if (slotValuesFull.length > 2) { 
        examples.push(slotValuesFull[2].name.value); 
    } 
 
 
    return examples; 
}

const getRemoteData = (url) => new Promise((resolve, reject) => {
  const client = url.startsWith('https') ? require('https') : require('http');
  const request = client.get(url, (response) => {
    if (response.statusCode < 200 || response.statusCode > 299) {
      reject(new Error(`Failed with status code: ${response.statusCode}`));
    }
    const body = [];
    response.on('data', (chunk) => body.push(chunk));
    response.on('end', () => resolve(body.join('')));
  });
  request.on('error', (err) => reject(err));
});

const model = {
  "interactionModel": {
    "languageModel": {
      "invocationName": "my ecommerce store",
      "modelConfiguration": {
        "fallbackIntentSensitivity": {
          "level": "LOW"
        }
      },
      "intents": [
        {
          "name": "AMAZON.CancelIntent",
          "samples": [
            "cancel this"
          ]
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": []
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": [
            "stop"
          ]
        },
        {
          "name": "AMAZON.NavigateHomeIntent",
          "samples": []
        },
        {
          "name": "AMAZON.FallbackIntent",
          "samples": []
        },
        {
          "name": "SetFavoriteColorIntent",
          "slots": [
            {
              "name": "color",
              "type": "AMAZON.Color"
            }
          ],
          "samples": [
            "I love {color}",
            "my favorite color is {color}"
          ]
        },
        {
          "name": "GetFavoriteColorIntent",
          "slots": [],
          "samples": [
            "what is my favorite color"
          ]
        },
        {
          "name": "NumberIntent",
          "slots": [
            {
              "name": "ordertype",
              "type": "ordertype"
            }
          ],
          "samples": [
            "how many items {ordertype}",
            "find me the number of {ordertype} orders",
            "how many orders are {ordertype}",
            "how many {ordertype} orders I have"
          ]
        },
        {
          "name": "listintent",
          "slots": [
            {
              "name": "ordertype",
              "type": "ordertype"
            }
          ],
          "samples": [
            "to give me a list of {ordertype} orders",
            "which products {ordertype}"
          ]
        },
        {
          "name": "itemname",
          "slots": [
            {
              "name": "itemprop",
              "type": "itemprop"
            }
          ],
          "samples": [
            "find my {itemprop}",
            "what is my {itemprop}",
            "what my {itemprop} is"
          ]
        },
        {
          "name": "LaunchRequest"
        }
      ],
      "types": [
        {
          "name": "ordertype",
          "values": [
            {
              "name": {
                "value": "fulfilled",
                "synonyms": [
                  "fulfillment",
                  "complete",
                  "completed"
                ]
              }
            },
            {
              "name": {
                "value": "unfulfilled",
                "synonyms": [
                  "need to be shipped",
                  "need to be fulfilled",
                  "require fulfillment",
                  "yet to be fulfilled",
                  "not completed",
                  "incomplete",
                  "not fulfilled"
                ]
              }
            }
          ]
        },
        {
          "name": "itemprop",
          "values": [
            {
              "name": {
                "value": "worst selling item",
                "synonyms": [
                  "worst selling merchandise",
                  "worst seller",
                  "worst product"
                ]
              }
            },
            {
              "name": {
                "value": "best selling item",
                "synonyms": [
                  "best merchandise",
                  "best product",
                  "best selling merch",
                  "best selling product",
                  "best seller"
                ]
              }
            }
          ]
        }
      ]
    }
  }
};
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        NumberIntentHandler,
        ListIntentHandler,
        ItemNameHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();