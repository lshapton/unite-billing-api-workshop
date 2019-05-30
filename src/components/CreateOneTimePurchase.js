import React from "react";
import {Mutation} from "react-apollo";
import CREATE_ONE_TIME_PURCHASE from "../../Mutations/OneTimePurchase";
import { Button, Link } from "@shopify/polaris";

export class CreateOneTimePurchase extends React.Component {
  createOneTimePurchase = (mutation) => { mutation() };

  triggerOnResult = (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const {confirmationUrl, userErrors} = data.appPurchaseOneTimeCreate;
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
        mutation={CREATE_ONE_TIME_PURCHASE}
      >
        {mutation => (
          <Button primary
            onClick={() => this.createOneTimePurchase(mutation)}
          >
            Create one time purchase
          </Button>
        )}
      </Mutation>
    );
  }
}
