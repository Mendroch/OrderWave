export interface SendSmsOptions {
  phoneNumber: string;
  message: string;
  sender?: string;
}

export const sendSmsViaInfobip = async ({
  phoneNumber,
  message,
  sender = process.env.INFOBIP_SENDER_NUMBER || "48539585407",
}: SendSmsOptions): Promise<void> => {
  const apiKey = process.env.INFOBIP_API_KEY;
  const baseUrl = process.env.INFOBIP_BASE_URL || "x1kp13.api.infobip.com";

  if (!apiKey) {
    throw new Error("INFOBIP_API_KEY environment variable is not set");
  }

  const headers = new Headers();
  headers.append("Authorization", `App ${apiKey}`);
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  // Format phone number to ensure it starts with country code
  const formattedPhoneNumber = phoneNumber.replace(/[ -]/g, "");
  const destinationNumber = formattedPhoneNumber.startsWith("+")
    ? formattedPhoneNumber.substring(1)
    : formattedPhoneNumber;

  const requestBody = {
    messages: [
      {
        destinations: [
          {
            to: destinationNumber,
          },
        ],
        sender: sender,
        content: {
          text: message,
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://${baseUrl}/sms/3/messages`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
        redirect: "follow",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Infobip API error: ${response.status} - ${errorText}`
      );
    }

    const result = await response.json();
    console.log("SMS sent successfully:", result);
  } catch (error) {
    console.error("Error sending SMS via Infobip:", error);
    throw error;
  }
};
