import { List, Layout, Button, ButtonGroup, Card, Page, TextStyle, Stack, Badge, ResourceList } from '@shopify/polaris';
import { Mutation, Query } from "react-apollo";
import { CreateSubscription } from '../src/components/CreateSubscription';
import { CreateOneTimePurchase } from '../src/components/CreateOneTimePurchase';
import { CreateUsageRecord } from '../src/components/CreateUsageRecord';
import { MutationResult } from '../src/components/MutationResult';
import GET_SUBSCRIPTION from "../Queries/Subscription";
import GET_PURCHASE from "../Queries/OneTimePurchase";

class Index extends React.Component {
  state = {
    userErrors: []
  };

  getMutationResult = ({ userErrors = [], successContent }) => {
    this.setState({ userErrors, successContent });
  };

  render() {
    const { userErrors = [], confirmationUrl, successContent } = this.state;
    return (
      <Page>
        <MutationResult
          userErrors={userErrors}
          successContent={successContent}
        />
        <Card title="App Subscriptions">
          <Card.Section>
            <CreateSubscription onResult={this.getMutationResult} />
          </Card.Section>
          <Query query={GET_SUBSCRIPTION}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading…</div>;
              if (error) return <Card.Section>Add query for app subscriptions</Card.Section>;
              var subscription = data.currentAppInstallation.subscriptions[0]

              if (subscription == null) return <Card.Section>You have no app subscriptions</Card.Section>;
              var recurringLineItem = subscription.lineItems.find((lineItem) => {
                return lineItem.plan.pricingDetails.cappedAmount == undefined
              })
              var usageLineItem = subscription.lineItems.find((lineItem) => {
                return lineItem.plan.pricingDetails.price == undefined
              })

              return (
                <>
                  <Card.Section title="Recurring subscriptions">
                    <TextStyle variation="strong">{subscription.name} plan</TextStyle>
                    <p>This plan will charge ${recurringLineItem.plan.pricingDetails.price.amount} USD every 30 days</p>
                  </Card.Section>

                  <Card.Section title="Variable subscriptions">
                    <TextStyle variation="strong">${usageLineItem.plan.pricingDetails.balanceUsed.amount} USD usage charges to date.</TextStyle>
                    <p>{usageLineItem.plan.pricingDetails.terms}</p>
                    <p>(up to a maximum of ${usageLineItem.plan.pricingDetails.cappedAmount.amount} USD)</p>
                    <CreateUsageRecord onResult={this.getMutationResult} subscriptionLineItemId={usageLineItem.id} />
                  </Card.Section>
                </>
              );
            }}
          </Query>
        </Card>
        <Card title="App Purchases">
          <Card.Section>
            <CreateOneTimePurchase onResult={this.getMutationResult} />
          </Card.Section>
          <Query query={GET_PURCHASE}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading…</div>;
              if (error) return <Card.Section>Add query for app one time purchases</Card.Section>;
              var purchases = data.currentAppInstallation.oneTimePurchases.edges

              if (purchases == null) return <Card.Section>You have no app purchases</Card.Section>;
              console.log(purchases);
              return (
                <>
                  <Card.Section title="One-time purchases">
                    <ResourceList
                      resourceName={{singular: 'purchase', plural: 'purchases'}}
                      items={purchases}
                      renderItem={(purchase) => {
                        const name = purchase.node.name;
                        const amount = purchase.node.price.amount;

                        return (
                          <ResourceList.Item
                            name={name}
                            amount={amount}
                          >
                            <TextStyle variation="strong">{name}</TextStyle> one time purchase, ${amount} USD
                          </ResourceList.Item>
                        );
                      }}
                    />
                  </Card.Section>
                </>
              );
            }}
          </Query>
        </Card>
      </Page>
    );
  }
}

export default Index;
