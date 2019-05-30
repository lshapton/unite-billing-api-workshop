import React from "react";
import { Button, Link, DisplayText } from "@shopify/polaris";
import { Mutation } from "react-apollo";
import USAGERECORD_CREATE from "../../Mutations/UsageRecord";

export class CreateUsageRecord extends React.Component {

  createUsageRecord = (
    mutation,
  ) => {
    const subscriptionLineItemId = this.props.subscriptionLineItemId
    mutation({variables: { subscriptionLineItemId }});
  };

  triggerOnResult = (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const {appUsageRecord, userErrors} = data.appUsageRecordCreate;
      const successContent = appUsageRecord ? (<DisplayText size="">Created usage record {appUsageRecord.id}</DisplayText>) : null;
      this.props.onResult({successContent, userErrors});
    }
  };

  render() {
    return (
      <Mutation
        onCompleted={data => this.triggerOnResult(null, data)}
        onError={err => this.triggerOnResult(err, null)}
        mutation={USAGERECORD_CREATE}
      >
        {mutation => (
          <Button primary
            onClick={() => this.createUsageRecord(mutation)}
          >
            Create usage record
          </Button>
        )}
      </Mutation>
    );
  }
}
