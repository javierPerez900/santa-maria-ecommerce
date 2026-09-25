import { Amplify } from "aws-amplify";

export function initAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: "us-east-1_jRhD0vCko",
        userPoolClientId: "j9mhb0s3q3ot2e4511ig64319",
        identityPoolId: "us-east-1:9ebac35e-dd33-43e2-b838-b2cd1159818e",
      },
    },
  });
}
