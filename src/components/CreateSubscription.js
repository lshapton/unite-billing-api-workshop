import React from "react";
import { Button, Link } from "@shopify/polaris";
import { Mutation } from "react-apollo";
import CREATE_SUBSCRIPTION from "../../Mutations/Subscription";

export class CreateSubscription extends React.Component {

  createSubscription = (mutation) => { mutation() };

  triggerOnResult = (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const {confirmationUrl, userErrors} = data.appSubscriptionCreate;
      const successContent = confirmationUrl ? (
        <Link url={confirmationUrl} external>Click here to accept charge</Link>) : null;
      this.props.onResult({successContent, userErrors});
    }
  };

  render() {
    return (
      <Mutation
        onCompleted={data => this.triggerOnResult(null, data)}
        onError={err => this.triggerOnResult(err, null)}
        mutation={CREATE_SUBSCRIPTION}
      >
        {mutation => (
          <Button primary
            onClick={() => this.createSubscription(mutation)}
          >
            Create subscription
          </Button>
        )}
      </Mutation>
    );
  }
}
