/* eslint-disable @typescript-eslint/no-unused-vars */
type SignInRequestData = {
  email: string;
  password: string;
};

type Response = {
  token: string;
  user: {
    email: string;
  };
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  await delay();

  return {
    token: '3ceaf1a5-064a-4f95-90b6-e682e2f86aa8',
    user: {
      email: 'Leonardo@gmail.com'
    }
  };
}
