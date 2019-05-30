import gql from 'graphql-tag';

export default gql`
  mutation usageRecordCreate(
    $subscriptionLineItemId: ID!
  ) {
    appUsageRecordCreate
  }
`;
