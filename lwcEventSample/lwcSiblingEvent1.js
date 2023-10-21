import { LightningElement , track} from 'lwc';
import { publish, subscribe, unsubscribe, createMessageContext, releaseMessageContext } from 'lightning/messageService';
import lmsDemo from "@salesforce/messageChannel/lmsDemoChannel__c";

export default class LwcDemoLMSEventSibling1Component extends LightningElement {
    subscription = null;
    context = createMessageContext();
    @track receivedMessage;

    publishLMS() {
        const message = {
            messageToSend: 'Sample Message from Sibling 1',
            sourceSystem: "xyz"
        };
        publish(this.context, lmsDemo, message);
    }

    subscribeLMS() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.context, lmsDemo, (message) => {
            this.displayLMSMessage(message);
        });
        this.receivedMessage = 'Subscribed';
    }

    unsubscribeLMS() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    displayLMSMessage(message) {
        this.receivedMessage = JSON.stringify(message);
    }

    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}
