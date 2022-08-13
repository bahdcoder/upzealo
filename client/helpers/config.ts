export const config = {
  solanaRpcUrl: process.env.NEXT_PUBLIC_RPC_URL as string,
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  solanaProgramId: process.env.NEXT_PUBLIC_BOUNTY_PROGRAM as string,
  authenticationSignatureTemplate: () =>
    `I want to login on Upzealo. I accept the Terms of Service https://upzealo.com/terms-and-conditions.`,
}
