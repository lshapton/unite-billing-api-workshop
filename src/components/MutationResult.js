import {
  Banner,
  Link,
} from "@shopify/polaris";

export const MutationResult = ({ userErrors = [], successContent }) => {
  if (userErrors.length === 0 && successContent == undefined) {
    return null;
  }

  if (userErrors.length > 0) {
    return (
      <Banner title="Error" status="critical">
        {userErrors.map(err => err.message).join(" , ")}
      </Banner>
    );
  } else {
    return (
      <Banner title="Success!" status="success">
        {successContent}
      </Banner>
    );
  }
};
