import EventEmitter from "events"

//Blueprint an Event Emitter class using built in 
//Event Emitter Class in Node
class EventBus extends EventEmitter { }


//create instance (object) of Event Emitter
//called eventBus
const eventBus = new EventBus();


//export eventEmitter object
export {eventBus}