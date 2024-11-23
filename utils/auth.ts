import { useUserStore } from "@/store/main";
import { AccessTokenResponse } from "@/types";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { router } from "expo-router";
import { useEffect } from "react";

const STRAVA_CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
const STRAVA_AUTH_URL = process.env.EXPO_PUBLIC_AUTH_URL;
const STRAVA_TOKEN_URL = process.env.EXPO_PUBLIC_TOKEN_URL;

export function useStravaAuth() {
  const { updateAccessToken, updateRefreshToken, updateUser } = useUserStore();

  const redirectUri = makeRedirectUri({
    scheme: "myapp",
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: STRAVA_CLIENT_ID as string,
      clientSecret: STRAVA_CLIENT_SECRET,
      redirectUri,
      scopes: ["activity:read_all"],
      responseType: "code",
      extraParams: {
        approval_prompt: "force",
      },
    },
    {
      authorizationEndpoint: STRAVA_AUTH_URL,
      tokenEndpoint: STRAVA_TOKEN_URL,
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      handleAuthResponse();
    }
  }, [response]);

  const handleAuthResponse: () => Promise<void | AccessTokenResponse> =
    async () => {
      if (response?.type === "success" && response.params.code) {
        try {
          const request = await fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            body: JSON.stringify({
              client_id: STRAVA_CLIENT_ID,
              client_secret: STRAVA_CLIENT_SECRET,
              code: response.params.code,
              grant_type: "authorization_code",
            }),
            headers: { "Content-Type": "application/json" },
          });

          const data: AccessTokenResponse | null = await request.json();

          if (data) {
            updateAccessToken(data.access_token);
            updateRefreshToken(data.refresh_token);
            updateUser(data.athlete);
            router.navigate("/activities");
          }
        } catch (error) {
          console.error("Error exchanging code for token:", error);
        }
      }
    };

  return { request, promptAsync };
}
